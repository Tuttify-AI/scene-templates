import { useMemo } from 'react';
import { SceneProps } from '../../shared/types';
import { getElementValue, getNumber } from '../../shared/utils';
import { useWindowSize } from '../../shared/hooks';
import SwiperClass from 'swiper/types/swiper-class';

type Params = Pick<SceneProps, 'values' | 'previewMode' | 'editMode'> & {
  swiper?: SwiperClass | null;
};

const DEFAULTS = {
  textSize: 36,
  textPadding: 8,
  imageHoverScale: 1.35,
  imageHeight: 0.4, //in percents
};

export default function useTilesParams({ values, previewMode, editMode, swiper }: Params) {
  const { isMd, isSm } = useWindowSize();
  const getValue = useMemo(() => getElementValue(values), [values]);

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
  // 0.025 - coefficient for slides per view, 0.075 - coefficient for slides per column
  const textSize = useMemo(
    () =>
      Math.floor(
        DEFAULTS.textSize *
          (1 - slidesPerViewFromConfig * 0.025 * (isSm ? 0.5 : isMd ? 0.75 : 1) - slidesPerColumn * 0.075)
      ),
    [slidesPerViewFromConfig, isMd, isSm, slidesPerColumn]
  );
  // fullscreen text size depending on screen resolution
  const fullScreenTextSize = useMemo(() => DEFAULTS.textSize * (isSm ? 1 : 1.25), [isSm]);
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
    () => slidesPerViewFromConfig * slidesPerColumn,
    [slidesPerColumn, slidesPerViewFromConfig]
  );
  const tiles = useMemo(() => Object.keys(values || {}).filter(k => k.startsWith('tile')), [values]);

  const showSceneActionElements = useMemo(() => editMode && !previewMode, [editMode, previewMode]);

  const allowDeleteTile = useMemo(
    () => tiles?.length > 1 && showSceneActionElements && !sliderLocked,
    [tiles, showSceneActionElements, sliderLocked]
  );

  const allowAddTile = useMemo(() => showSceneActionElements && !sliderLocked, [showSceneActionElements, sliderLocked]);

  return {
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
