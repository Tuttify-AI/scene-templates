import { useMemo, createRef } from 'react';
import { useWindowSize } from '../../shared/hooks';
import { SceneProps } from '../../shared/types';
import { getElementValue, getNumber } from '../../shared/utils';

type Params = Pick<SceneProps, 'values' | 'previewMode' | 'editMode'>;

const DEFAULTS = {
  textSize: 36,
  top: 20, //in percents,
  left: 20, //in percents,
  textPadding: 8,
  imageHoverScale: 1.35,
  blockHeight: 0.1, //in percents,
  blockWidth: 0.1, //in percents,
  maxBlocks: 50,
};

export default function useBlocksParams({ values, previewMode, editMode }: Params) {
  const { isSm } = useWindowSize();
  const getValue = useMemo(() => getElementValue(values), [values]);

  // tiles limit if view is unlocked
  const generalBlocksLimit = useMemo(
    () => getNumber(getValue('config', 'blocks_limit')) || DEFAULTS.maxBlocks,
    [getValue]
  );
  // is slider limited for one screen
  const showNavigation = useMemo(() => getNumber(getValue('config', 'navigation')) === 1, [getValue]);
  // is slider limited for one screen
  const sliderLocked = useMemo(() => getNumber(getValue('config', 'lock_view')) === 1, [getValue]);
  // total slides per view from configuration
  const slidesPerViewFromConfig = useMemo(() => getNumber(getValue('config', 'slides_per_view')), [getValue]);
  // slides per view depending on screen size
  const slidesPerView = useMemo(
    () =>
      previewMode ? slidesPerViewFromConfig : isSm ? (slidesPerViewFromConfig > 3 ? 2 : 1) : slidesPerViewFromConfig,
    [isSm, previewMode, slidesPerViewFromConfig]
  );

  const blocks = useMemo(
    () =>
      Object.keys(values || {})
        .filter(k => k.startsWith('block'))
        .map(id => ({
          id,
          ref: createRef(),
        })),
    [values]
  );

  const showSceneActionElements = useMemo(() => editMode && !previewMode, [editMode, previewMode]);

  const allowDeleteTile = useMemo(
    () => blocks?.length >= 1 && showSceneActionElements,
    [blocks, showSceneActionElements]
  );

  const allowAddBlock = useMemo(
    () => showSceneActionElements && blocks.length < generalBlocksLimit,
    [showSceneActionElements, blocks, generalBlocksLimit]
  );

  return {
    DEFAULTS,
    slidesPerView,
    showSceneActionElements,
    blocks,
    generalBlocksLimit,
    sliderLocked,
    allowDeleteTile,
    allowAddBlock,
    showNavigation: showNavigation && !editMode && !previewMode,
  };
}
