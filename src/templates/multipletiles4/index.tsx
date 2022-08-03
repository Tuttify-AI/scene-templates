import React, { CSSProperties, forwardRef, useCallback, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid } from 'swiper';
import { useActions, useWindowSize, useImage, useAudios } from '../shared/hooks';
import useTiles from '../shared/hooks/use-tiles';
import { clsx, getElementId, getElementValue } from '../shared/utils';
import { IMAGES } from './constants';

import { SceneProps, SceneValue, TemplateParameterType } from '../shared/types';
import { BaseSceneElements, Classes } from './types';
import SwiperClass from 'swiper/types/swiper-class';

import iconPlus from './assets/icon-plus.svg';
import iconCross from './assets/icon-cross.svg';

import 'swiper/css';
import 'swiper/css/grid';
import styles from './styles.module.css';

export type MultipleTiles4SceneProps = SceneProps & {
  values?: BaseSceneElements<SceneValue>;
  classes?: Classes;
};

const MultipleTiles4 = forwardRef<HTMLDivElement, MultipleTiles4SceneProps>(
  ({ editMode, previewMode, classes, activeKey, onClick, values, onAdd, onSet, onActiveElementClick }, ref) => {
    const [swiper, setSwiper] = useState<SwiperClass | null>(null);
    const { isSm } = useWindowSize();
    const { handlePauseAll, renderAudios } = useAudios({ values });
    const { hiddenImageList, onImageError, onImageLoad } = useImage();

    const getEditClass = useCallback(
      (type: 'edit' | 'editText' | 'editRoot' = 'edit') => editMode && styles[type as keyof typeof styles],
      [editMode]
    );

    const getValue = useMemo(() => getElementValue(values), [values]);

    const { handleClick } = useActions({
      onClick,
      handlePauseAll,
      disabled: editMode || previewMode,
      onActiveElementClick,
    });

    const isActive = useCallback((key: keyof BaseSceneElements) => activeKey === key && styles.active, [activeKey]);
    const isPreview = useMemo(() => previewMode && styles.preview, [previewMode]);
    const tiles = useMemo(() => Object.keys(values || {}).filter(k => k.startsWith('tile')), [values]);
    const isImageHidden = useCallback(
      (key: keyof BaseSceneElements) => hiddenImageList[key] && styles.hidden,
      [hiddenImageList]
    );

    const handleAddTile = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      const lastTile = Number(tiles[tiles.length - 1]?.replace('tile', ''));
      if (lastTile && onAdd) {
        onAdd({
          [`tile${lastTile + 1}`]: {
            background_hover: {
              value: '#5468E7',
              title: 'Background hover color',
              type: TemplateParameterType.color,
            },
            title: {
              value: `Tile No.${tiles.length + 1}`,
              title: `Tile No.${tiles.length + 1}`,
              type: TemplateParameterType.title,
            },
          },
          [`text_tile${lastTile + 1}`]: {
            text: {
              value: 'Text',
              title: 'Tile text',
              type: TemplateParameterType.text,
            },
            title: {
              value: `Tile No.${tiles.length + 1} text`,
              title: `Tile No.${tiles.length + 1} text`,
              type: TemplateParameterType.title,
            },
          },
          [`image_tile${lastTile + 1}`]: {
            url: {
              value: '',
              title: 'Image',
              type: TemplateParameterType.image,
            },
            title: {
              value: `Tile No.${tiles.length + 1} image`,
              title: `Tile No.${tiles.length + 1} image`,
              type: TemplateParameterType.title,
            },
            sound: {
              value: '',
              title: 'On click sound link',
              type: TemplateParameterType.sound,
            },
          },
        });
      }

      if (swiper) {
        await swiper.update();
        await swiper.slideTo(tiles.length);
      }
    };

    const { handleDeleteTile, getTileData, DEFAULT_PARAMS, slideHeight, textSize, textMargin, textTranslateY } =
      useTiles({
        tiles,
        onSet,
        handleAddTile,
        values,
        handleClick,
        defaultImages: IMAGES,
        onActiveElementClick,
        previewMode,
        editMode,
        swiper,
        params: {
          slidesPerViewFromConfig: 4,
          slidesPerColumn: 2,
        },
      });

    const getImageSrc = useCallback(
      (k: string) => {
        const src = getValue(k, 'url') as string;
        return src !== '' && !Number.isNaN(Number(src)) ? IMAGES[Number(src)] : src;
      },
      [getValue]
    );

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
        <button className={clsx(styles.btn, styles.btnAddTile, getEditClass('edit'))} onClick={handleAddTile}>
          <img className={styles.addTileIcon} src={iconPlus} alt="" />
        </button>
        <span className={clsx(styles.totalTiles, getEditClass('edit'))}>Total tiles: {tiles.length}</span>
        <Swiper
          className={styles.swiper}
          spaceBetween={0}
          slidesPerView={previewMode ? 2 : isSm ? 1 : 2}
          grid={{
            rows: 2,
          }}
          modules={[Grid]}
          onSwiper={setSwiper}
        >
          {tiles.map((k, index) => (
            <SwiperSlide
              key={k}
              className={clsx(styles.slideItem, isPreview)}
              style={{
                height: `${slideHeight.toFixed(2)}%`,
              }}
            >
              <div
                id={getElementId(k, previewMode)}
                onClick={handleClick(k, { data: getTileData(k) })}
                className={clsx(styles.tile, isActive(k), getEditClass(), isPreview, classes?.tile)}
                style={
                  {
                    '--custom_color': getValue(k, 'background_hover'),
                  } as CSSProperties
                }
              >
                {index > IMAGES.length - 1 && (
                  <button
                    className={clsx(styles.btn, styles.btnDeleteTile, getEditClass('edit'))}
                    onClick={e => handleDeleteTile(k, e)}
                  >
                    <img className={styles.deleteTileIcon} src={iconCross} alt="" />
                  </button>
                )}
              </div>
              <div
                className={clsx(
                  styles.tileImage,
                  isActive(`image_${k}`),
                  isImageHidden(`image_${k}`),
                  getEditClass(),
                  isPreview,
                  classes?.tileImage
                )}
                style={
                  {
                    '--image-height': `${DEFAULT_PARAMS.imageHeight * 100}%`,
                    '--image-hover-scale': DEFAULT_PARAMS.imageHoverScale,
                  } as CSSProperties
                }
              >
                <img
                  id={getElementId(`image_${k}`, previewMode)}
                  alt={`image_${k}`}
                  src={(getValue(`image_${k}`, 'url') as string) || IMAGES[index] || IMAGES[0]}
                  onClick={handleClick(`image_${k}`, { data: getTileData(k) })}
                  onLoad={() => onImageLoad(`image_${k}`)}
                  onError={() => onImageError(`image_${k}`)}
                />
              </div>
              <p
                id={getElementId(`text_${k}`, previewMode)}
                onClick={handleClick(`text_${k}`, { data: getTileData(k) })}
                className={clsx(
                  styles.tileText,
                  isActive(`text_${k}`),
                  getEditClass('editText'),
                  isPreview,
                  classes?.tileText
                )}
                style={
                  {
                    marginTop: isImageHidden(k) ? textSize / 2 : textMargin,
                    fontSize: textSize,
                    lineHeight: `${textSize}px`,
                    '--text-color': getValue(k, 'text_color'),
                    '--text-hover-color': getValue(k, 'text_hover_color'),
                    '--text-hover-scale': getImageSrc(k) ? textTranslateY : 'translateY(-100%)',
                    padding: `0 ${DEFAULT_PARAMS.textPadding}px`,
                  } as CSSProperties
                }
              >
                {getValue(`text_${k}`, 'text')}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
);

export default MultipleTiles4;
