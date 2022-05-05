import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActiveElementData, Parameters, SceneProps } from '../types';
import { deleteElement, getElementValue } from '../utils';
import { useActions } from './index';

type Params = Pick<SceneProps, 'editMode' | 'previewMode' | 'onSet' | 'values'> & {
  onActiveElementClick?: SceneProps['onActiveElementClick'];
  handleAddTile: (e: React.MouseEvent<HTMLButtonElement>) => void;
  tiles: string[];
  handleClick: ReturnType<typeof useActions>['handleClick'];
  defaultImages?: string[];
  defaultImageKey?: string;
  params?: Partial<FullTileParams>;
};

type FullTileParams = {
  imageBackground: string;
  imageUrl: string;
  text: string;
  textColor: string;
};

type FullElementState = {
  key: string;
  value: string;
  background?: string;
  color?: string;
};

const INITIAL_STATE = {
  image: {
    key: '',
    value: '',
    background: 'transparent',
  } as FullElementState,
  text: {
    key: '',
    value: '',
    color: '',
  } as FullElementState,
};

const DEFAULT_PARAMS: FullTileParams = {
  imageBackground: 'background_hover',
  imageUrl: 'fullscreen_url',
  text: 'fullscreen_text',
  textColor: 'fullscreen_text_color',
};

export default function useTiles({
  editMode,
  previewMode,
  onActiveElementClick,
  onSet,
  values,
  tiles,
  handleClick,
  defaultImages,
  defaultImageKey = 'image_',
  params = DEFAULT_PARAMS,
}: Params) {
  const [fullTile, setFullTile] = useState(INITIAL_STATE);
  const fullTileParams = useMemo(() => ({ ...DEFAULT_PARAMS, ...params }), [params]);
  useEffect(() => {
    if (editMode || previewMode) {
      setFullTile(INITIAL_STATE);
    }
  }, [editMode, previewMode, setFullTile]);

  const handleFullTile = useCallback(
    (value: Partial<typeof fullTile>) => setFullTile(prev => ({ ...prev, ...value })),
    []
  );

  const getValue = useMemo(() => getElementValue(values), [values]);

  const handleDeleteTile = useCallback(
    (k: string | string[], e?: React.MouseEvent<HTMLButtonElement>) => {
      e?.stopPropagation();
      onSet && onSet(deleteElement(values, tiles, k));
    },
    [onSet, tiles, values]
  );

  const getTileData = useCallback(
    k => {
      const text = getValue(`text_${k}`, 'text') || getValue(k, 'text');
      const imageUrl = getValue(`image_${k}`, 'url') || getValue(k, 'url');
      const audioUrl = getValue(`sound_${k}`, 'sound') || getValue(k, 'sound');
      return {
        ...(text ? { text } : {}),
        ...(imageUrl ? { imageUrl } : {}),
        ...(audioUrl ? { audioUrl } : {}),
      } as ActiveElementData;
    },
    [getValue]
  );

  const handleSetFullTile = useCallback(
    (data: Partial<typeof fullTile>) => {
      if (!(editMode || previewMode)) {
        handleFullTile(data);
      }
    },
    [editMode, previewMode, handleFullTile]
  );

  const handleClearFullTile = useCallback(() => setFullTile(INITIAL_STATE), [setFullTile]);

  const handleFullImageClick = useCallback(
    (k?: string, parameter?: keyof Parameters) => (e: React.MouseEvent<HTMLElement>) => {
      onActiveElementClick &&
        onActiveElementClick(fullTile.image.key, {
          imageUrl: fullTile.image.value,
          text: fullTile.text.value,
        });
      k && handleClick(`${defaultImageKey}${k}`, { parameter })(e);
      handleClearFullTile();
    },
    [onActiveElementClick, handleClearFullTile, fullTile, handleClick, defaultImageKey]
  );

  const onSetFullTile = useCallback(
    (k: string, index: number, parameter?: keyof Parameters) => (e: React.MouseEvent<HTMLElement>) => {
      const defaultValue = defaultImages ? defaultImages[index] || defaultImages[0] : '';
      // latest scenes now uses fullscreen_url parameter, fullScreenUrl is left for older scenes
      const value =
        (getValue(`${defaultImageKey}${k}`, 'fullScreenUrl') as string) ||
        (getValue(`${defaultImageKey}${k}`, fullTileParams.imageUrl) as string);
      handleClick(`${defaultImageKey}${k}`, { data: getTileData(k) as ActiveElementData, parameter })(e);
      handleSetFullTile({
        image: {
          key: `full_image_${k}`,
          value: value || defaultValue,
          background: `${getValue(k, fullTileParams.imageBackground)}`,
        },
        text: {
          key: `full_text_${k}`,
          value: `${getValue(k, fullTileParams.text)}`,
          color: `${getValue(k, fullTileParams.textColor)}`,
        },
      });
    },
    [getTileData, handleClick, getValue, handleSetFullTile, defaultImages, defaultImageKey, fullTileParams]
  );
  const parsedFullImageKey = useMemo(() => fullTile.image.key?.replace('full_image_', ''), [fullTile.image.key]);
  const parsedFullTextKey = useMemo(() => fullTile.text.key?.replace('full_text_', ''), [fullTile.text.key]);
  return {
    onSetFullTile,
    handleFullImageClick,
    handleDeleteTile,
    fullTile,
    getTileData,
    parsedFullImageKey,
    parsedFullTextKey,
  };
}
