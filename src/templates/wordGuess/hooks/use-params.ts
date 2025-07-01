import { useCallback, useMemo } from 'react';
import { SceneProps } from '../../shared/types';
import { getElementValue, getNumber } from '../../shared/utils';
import { useWindowSize } from '../../shared/hooks';
import SwiperClass from 'swiper/types/swiper-class';
import { GuessWordConfig } from '../types';

type Params = Pick<SceneProps, 'values' | 'previewMode' | 'editMode'> & {
  swiper?: SwiperClass | null;
};

const DEFAULTS = {
  textSize: 36,
  textPadding: 8,
  imageHoverScale: 1.35,
  imageHeight: 0.4, //in percents,
  maxTiles: 50,
};

export default function useParams({ values, previewMode, editMode, swiper }: Params) {
  const { isMd, isSm } = useWindowSize();
  const getValue = useMemo(() => getElementValue(values), [values]);
  const getConfigValue = useCallback(
    (parameter: keyof GuessWordConfig) => getElementValue(values)('config', parameter),
    [values]
  );
  const lettersArray = useMemo(
    () => `${getConfigValue('word')}${getConfigValue('additional_letters')}`.split(''),
    [getConfigValue]
  );
  const wordArray = useMemo(() => `${getConfigValue('word')}`.split(''), [getConfigValue]);

  // tiles limit if view is unlocked
  const generalTilesLimit = useMemo(
    () => getNumber(getValue('config', 'tiles_limit')) || DEFAULTS.maxTiles,
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
  // slides per column from configuration
  const slidesPerColumn = useMemo(() => getNumber(getValue('config', 'slides_per_column')), [getValue]);
  // tile text size depending on total number of slides and screen size,
  // 0.035 - modifier for slides per view, 0.075 - modifier for slides per column
  const textSize = useMemo(
    () =>
      Math.floor(
        DEFAULTS.textSize *
          (1 - slidesPerViewFromConfig * 0.035 * (isSm ? 0.5 : isMd ? 0.75 : 1) - slidesPerColumn * 0.075)
      ),
    [slidesPerViewFromConfig, isMd, isSm, slidesPerColumn]
  );
  // fullscreen text size depending on screen resolution
  const fullScreenTextSize = useMemo(() => DEFAULTS.textSize * (isSm ? 0.85 : 1.25), [isSm]);
  // tile text margin depends on image and slider height
  const textMargin = useMemo(
    () => ((swiper?.height || 0) / slidesPerColumn) * (DEFAULTS.imageHeight / 2) + textSize + DEFAULTS.textPadding / 2,
    [swiper, slidesPerColumn, textSize]
  );
  const slideHeight = useMemo(() => 100 / slidesPerColumn, [slidesPerColumn]);
  const textTranslateY = useMemo(
    () => `translateY(calc(-100% + ${slideHeight * DEFAULTS.imageHoverScale - slideHeight}px))`,
    [slideHeight]
  );
  const tilesLimit = useMemo(
    () => (sliderLocked ? slidesPerViewFromConfig * slidesPerColumn : generalTilesLimit),
    [slidesPerColumn, slidesPerViewFromConfig, generalTilesLimit, sliderLocked]
  );
  const tiles = useMemo(() => Object.keys(values || {}).filter(k => k.startsWith('tile')), [values]);

  const showSceneActionElements = useMemo(() => editMode && !previewMode, [editMode, previewMode]);

  const allowDeleteTile = useMemo(
    () => tiles?.length > 1 && showSceneActionElements && !sliderLocked,
    [tiles, showSceneActionElements, sliderLocked]
  );

  const allowAddTile = useMemo(
    () => showSceneActionElements && !sliderLocked && tiles.length < tilesLimit,
    [showSceneActionElements, sliderLocked, tiles, tilesLimit]
  );

  return {
    lettersArray,
    wordArray,
    DEFAULTS,
    slidesPerView,
    fullScreenTextSize,
    textMargin,
    textTranslateY,
    showSceneActionElements,
    textSize,
    tiles,
    slideHeight,
    slidesPerColumn,
    tilesLimit,
    sliderLocked,
    allowDeleteTile,
    allowAddTile,
    showNavigation: showNavigation && !editMode && !previewMode,
  };
}
