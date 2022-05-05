import React, { CSSProperties, forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Navigation } from 'swiper';

import { useActions, useImage, useAudios, useTiles } from '../shared/hooks';
import { clsx, getElementId, getElementValue, range } from '../shared/utils';
import { IMAGES } from './constants';

import { Parameters, SceneProps, SceneValue } from '../shared/types';
import { AddButton, DeleteButton } from '../shared/components';
import { MultipleTilesElements, Classes } from './types';
import SwiperClass from 'swiper/types/swiper-class';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import styles from './styles.module.css';
import { createTile } from './utils';
import useTilesParams from './hooks/use-tiles-params';

export type MultipleTilesSceneProps = SceneProps & {
  values?: MultipleTilesElements<SceneValue>;
  classes?: Classes;
};

const MultipleTiles = forwardRef<HTMLDivElement, MultipleTilesSceneProps>(
  (
    { editMode, translations, previewMode, classes, activeKey, onClick, values, onAdd, onSet, onActiveElementClick },
    ref
  ) => {
    const [swiper, setSwiper] = useState<SwiperClass | null>(null);
    const { hiddenImageList, onImageError, onImageLoad } = useImage();
    const { renderAudios, handlePauseAll } = useAudios({ values });
    const getEditClass = useCallback(
      (type: 'edit' | 'editRoot' = 'edit') => editMode && styles[type as keyof typeof styles],
      [editMode]
    );

    const {
      showSceneActionElements,
      textMargin,
      textTranslateY,
      fullScreenTextSize,
      slidesPerView,
      DEFAULTS,
      tiles,
      textSize,
      slideHeight,
      slidesPerColumn,
      tilesLimit,
      sliderLocked,
      allowDeleteTile,
      allowAddTile,
      showNavigation,
    } = useTilesParams({ values, previewMode, editMode, swiper });

    const getValue = useMemo(() => getElementValue<MultipleTilesElements>(values), [values]);

    const { handleClick } = useActions({
      onClick,
      handlePauseAll,
      disabled: editMode || previewMode,
      onActiveElementClick,
    });
    const isActive = useCallback((key: keyof MultipleTilesElements) => activeKey === key && styles.active, [activeKey]);
    const isPreview = useMemo(() => previewMode && styles.preview, [previewMode]);
    const isImageHidden = useCallback(
      (key: keyof MultipleTilesElements, imageListKey?: string, parameter: keyof Parameters = 'url') => {
        const hiddenImageListKey = imageListKey || key;
        return (hiddenImageList[hiddenImageListKey] || !getValue(key, parameter)) && styles.hidden;
      },
      [hiddenImageList, getValue]
    );

    const handleAddTile = useCallback(
      async (e?: React.MouseEvent<HTMLButtonElement>) => {
        e?.stopPropagation();
        const lastTile = Number(tiles[tiles.length - 1]?.replace('tile', ''));
        const initialValues = values?.[tiles[0]];
        if (lastTile && onAdd && initialValues && allowAddTile) {
          onAdd(createTile(lastTile + 1, tiles.length + 1, initialValues));
        }
        if (swiper) {
          await swiper.update();
          await swiper.slideTo(tiles.length);
        }
      },
      [swiper, onAdd, allowAddTile, tiles, values]
    );

    const { handleFullImageClick, onSetFullTile, handleDeleteTile, fullTile, parsedFullImageKey, parsedFullTextKey } =
      useTiles({
        tiles,
        onSet,
        handleAddTile,
        values,
        handleClick,
        onActiveElementClick,
        previewMode,
        editMode,
        defaultImageKey: '',
        params: {
          imageBackground: 'fullscreen_background',
        },
      });

    const getImageSrc = useCallback(
      (k: string) => {
        const src = getValue(k, 'url') as string;
        return src !== '' && !Number.isNaN(Number(src)) ? IMAGES[Number(src)] : src;
      },
      [getValue]
    );

    useEffect(() => {
      // removing tiles if slider is locked and tiles limit is reached
      if (sliderLocked) {
        tiles.slice(tilesLimit).forEach(tile => {
          handleDeleteTile(tile);
        });
      }
    }, [sliderLocked, tiles, tilesLimit, handleDeleteTile]);

    useEffect(() => {
      // adding tiles if slider locked and tiles limit not reached
      const initialValues = values?.[tiles[0]];
      if (sliderLocked && tiles.length < tilesLimit && onAdd && initialValues) {
        range(tiles.length + 1, tilesLimit).forEach(num => {
          onAdd(createTile(num, num, initialValues));
        });
      }
    }, [tiles, tilesLimit, handleDeleteTile, sliderLocked, onAdd, values]);

    return (
      <div
        id={getElementId('background', previewMode)}
        onClick={handleClick('background')}
        className={clsx(styles.root, isActive('background'), getEditClass('editRoot'), isPreview, classes?.root)}
        style={{
          backgroundColor: `${getValue('background', 'background')}`,
        }}
        ref={ref}
      >
        {renderAudios()}
        {allowAddTile && <AddButton onClick={handleAddTile} />}
        <div
          className={clsx(
            styles.activeDiv,
            isPreview,
            getEditClass(),
            fullTile.image.value || fullTile.text.value ? styles.showActiveDiv : styles.hideActiveDiv,
            classes?.fullscreenImage
          )}
          onClick={handleFullImageClick(parsedFullImageKey, 'fullscreen_sound')}
          style={{ background: fullTile.image.background }}
        >
          {fullTile.image.value && (
            <div className={clsx(styles.activeImageWrap)}>
              <img
                id={getElementId(fullTile.image.key, previewMode)}
                alt=""
                src={fullTile.image.value}
                className={clsx(
                  styles.activeImage,
                  isImageHidden(parsedFullImageKey, fullTile.image.key, 'fullscreen_url')
                )}
                onLoad={() => onImageLoad(fullTile.image.key)}
                onError={() => onImageError(fullTile.image.key)}
              />
            </div>
          )}
          {fullTile.text.value && (
            <p
              id={getElementId(fullTile.text.key, previewMode)}
              className={clsx(styles.activeText, isPreview, classes?.fullscreenText)}
              style={
                {
                  fontSize: fullScreenTextSize,
                  lineHeight: `${fullScreenTextSize}px`,
                  '--fullscreen-text-color': getValue(parsedFullTextKey, 'fullscreen_text_color'),
                } as CSSProperties
              }
            >
              {fullTile.text.value}
            </p>
          )}
        </div>
        {showSceneActionElements && (
          <span className={clsx(styles.totalTiles)}>
            {translations?.totalTiles || `Total tiles`}
            {`: `}
            {`${tiles.length}/${tilesLimit}`}
          </span>
        )}
        <Swiper
          className={styles.swiper}
          spaceBetween={0}
          grid={{
            rows: slidesPerColumn,
          }}
          slidesPerView={slidesPerView}
          onSwiper={setSwiper}
          modules={[Grid, Navigation]}
          navigation={showNavigation}
        >
          {tiles.map((k, index) => (
            <SwiperSlide
              key={k}
              className={clsx(styles.slideItem, isActive(k), activeKey && getEditClass(), isPreview, classes?.slide)}
              onClick={onSetFullTile(k, index)}
              style={{
                height: `${slideHeight.toFixed(2)}%`,
              }}
            >
              <div
                id={getElementId(k, previewMode)}
                className={clsx(styles.tile, isPreview, classes?.tile)}
                style={
                  {
                    '--background-color': getValue(k, 'background'),
                    '--background-hover-color': getValue(k, 'background_hover'),
                  } as CSSProperties
                }
              >
                {allowDeleteTile && (
                  <DeleteButton className={clsx(styles.btnDeleteTile)} onClick={e => handleDeleteTile(k, e)} />
                )}
              </div>
              <div
                className={clsx(styles.tileImage, isImageHidden(k), isPreview, classes?.tileImage)}
                style={
                  {
                    '--image-height': `${DEFAULTS.imageHeight * 100}%`,
                    '--image-hover-scale': DEFAULTS.imageHoverScale,
                  } as CSSProperties
                }
              >
                <img
                  id={getElementId(`image_${k}`, previewMode)}
                  alt={`image_${k}`}
                  src={getImageSrc(k)}
                  onLoad={() => onImageLoad(k)}
                  onError={() => onImageError(k)}
                />
              </div>
              <p
                id={getElementId(`text_${k}`, previewMode)}
                className={clsx(styles.tileText, isPreview, classes?.tileText)}
                style={
                  {
                    marginTop: isImageHidden(k) ? textSize / 2 : textMargin,
                    fontSize: textSize,
                    lineHeight: `${textSize}px`,
                    '--text-color': getValue(k, 'text_color'),
                    '--text-hover-color': getValue(k, 'text_hover_color'),
                    '--text-hover-scale': getImageSrc(k) ? textTranslateY : 'translateY(-100%)',
                    padding: `0 ${DEFAULTS.textPadding}px`,
                  } as CSSProperties
                }
              >
                {getValue(k, 'text')}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
);

export default MultipleTiles;
