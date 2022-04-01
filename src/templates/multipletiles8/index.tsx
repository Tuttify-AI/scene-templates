import React, { CSSProperties, forwardRef, useCallback, useMemo, useState, Fragment } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useActions, useWindowSize, useImage, useAudios, useTiles } from '../shared/hooks';
import { clsx, getElementId } from '../shared/utils';
import { IMAGES } from './constants';

import { Parameters, SceneProps, SceneValue, TemplateParameterType } from '../shared/types';
import { BaseSceneElements, Classes } from './types';
import SwiperClass from 'swiper/types/swiper-class';

import iconPlus from './assets/icon-plus.svg';
import iconCross from './assets/icon-cross.svg';

import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import styles from './styles.module.css';

export type MultipleTiles8SceneProps = SceneProps & {
  values?: BaseSceneElements<SceneValue>;
  classes?: Classes;
};

const MultipleTiles8 = forwardRef<HTMLDivElement, MultipleTiles8SceneProps>(
  ({ editMode, previewMode, classes, activeKey, onClick, values, onAdd, onSet, onActiveElementClick }, ref) => {
    const [swiper, setSwiper] = useState<SwiperClass | null>(null);
    const { isMd, isSm } = useWindowSize();
    const { hiddenImageList, onImageError, onImageLoad } = useImage();
    const { audios } = useAudios({ values });
    const getEditClass = useCallback(
      (type: 'edit' | 'editText' | 'editRoot' = 'edit') => editMode && styles[type as keyof typeof styles],
      [editMode]
    );

    const getValue = useCallback(
      (element: keyof BaseSceneElements, parameter: keyof Parameters) =>
        (values?.[element]?.[parameter] as SceneValue)?.value,
      [values]
    );
    const { handleClick } = useActions({
      onClick,
      getValue,
      disabled: editMode || previewMode,
      audios,
      onActiveElementClick,
    });

    const isActive = useCallback((key: keyof BaseSceneElements) => activeKey === key && styles.active, [activeKey]);
    const isPreview = useMemo(() => previewMode && styles.preview, [previewMode]);
    const tiles = useMemo(() => Object.keys(values || {}).filter(k => k.startsWith('tile')), [values]);
    const isImageHidden = useCallback(
      (key: keyof BaseSceneElements) => hiddenImageList[key] && styles.hidden,
      [hiddenImageList]
    );

    const handleAddTile = (e: React.MouseEvent<HTMLButtonElement>) => {
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
            sound: {
              value: '',
              title: 'On click sound link',
              type: TemplateParameterType.sound,
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
          },
        });
      }

      if (swiper) {
        swiper.update();
        setTimeout(() => swiper.slideTo(tiles.length), 0);
      }
    };

    const { handleDeleteTile, getTileData } = useTiles({
      tiles,
      onSet,
      handleAddTile,
      values,
      handleClick,
      getValue,
      defaultImages: IMAGES,
      onActiveElementClick,
      previewMode,
      editMode,
    });

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
        {audios && (
          <Fragment>
            {Object.keys(audios).map(audio => (
              <audio
                key={`${audio}_sound`}
                id={`${audio}_sound`}
                ref={audios?.[audio]}
                src={getValue(audio, 'sound') as string}
              />
            ))}
          </Fragment>
        )}
        <button className={clsx(styles.btn, styles.btnAddTile, getEditClass('edit'))} onClick={handleAddTile}>
          <img className={styles.addTileIcon} src={iconPlus} alt="" />
        </button>
        <span className={clsx(styles.totalTiles, getEditClass('edit'))}>Total tiles: {tiles.length}</span>
        <Swiper
          className={styles.swiper}
          spaceBetween={0}
          slidesPerView={previewMode ? 4 : isSm ? 1 : isMd ? 2 : 4}
          slidesPerColumn={2}
          onSwiper={setSwiper}
        >
          {tiles.map((k, index) => (
            <SwiperSlide key={k} className={clsx(styles.slideItem, isPreview)}>
              <div
                id={getElementId(k, previewMode)}
                onClick={handleClick(k, getTileData(k))}
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
                    onClick={e => handleDeleteTile(e, k)}
                  >
                    <img className={styles.deleteTileIcon} src={iconCross} alt="" />
                  </button>
                )}
              </div>
              <img
                id={getElementId(`image_${k}`, previewMode)}
                alt={`image_${k}`}
                src={(getValue(`image_${k}`, 'url') as string) || IMAGES[index] || IMAGES[0]}
                onClick={handleClick(`image_${k}`, getTileData(k))}
                onLoad={() => onImageLoad(`image_${k}`)}
                onError={() => onImageError(`image_${k}`)}
                className={clsx(
                  styles.tileImage,
                  isActive(`image_${k}`),
                  isImageHidden(`image_${k}`),
                  getEditClass(),
                  isPreview,
                  classes?.tileImage
                )}
              />
              <p
                id={getElementId(`text_${k}`, previewMode)}
                onClick={handleClick(`text_${k}`, getTileData(k))}
                className={clsx(
                  styles.tileText,
                  isActive(`text_${k}`),
                  getEditClass('editText'),
                  isPreview,
                  classes?.tileText
                )}
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

export default MultipleTiles8;
