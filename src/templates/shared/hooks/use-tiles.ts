import React, { useCallback, useEffect, useState } from 'react';
import { ActiveElementData, Elements, Parameters, SceneProps } from '../types';
import { deleteElement } from '../utils';
import { useActions } from './index';

type Params = Pick<SceneProps, 'editMode' | 'previewMode' | 'onSet' | 'values'> & {
  onActiveElementClick?: SceneProps['onActiveElementClick'];
  getValue: (element: keyof Elements, parameter: keyof Parameters) => unknown;
  handleAddTile: (e: React.MouseEvent<HTMLButtonElement>) => void;
  tiles: string[];
  handleClick: ReturnType<typeof useActions>['handleClick'];
  defaultImages: string[]
};

const INITIAL_STATE = {
  key: '',
  src: '',
  background: 'transparent',
};

export default function useTiles({ editMode, previewMode , getValue, onActiveElementClick, onSet, values, tiles, handleClick, defaultImages }: Params) {
  const [fullImage, setFullImage] = useState(INITIAL_STATE);
  useEffect(() => {
    if (editMode || previewMode) {
      setFullImage(INITIAL_STATE);
    }
  }, [editMode, previewMode, setFullImage]);

  const handleDeleteTile = useCallback((e: React.MouseEvent<HTMLButtonElement>, k: string) => {
    e.stopPropagation();
    onSet &&
    onSet(deleteElement(values, tiles, k));
  }, [onSet, tiles, values]);

  const getTileData = useCallback((k) => {
    const text = getValue(`text_${k}`, 'text');
    const imageUrl = getValue(`image_${k}`, 'url');
    const audioUrl = getValue(`sound_${k}`, 'sound');
    return {
      ...(text ? {text} : {}),
      ...(imageUrl ? {imageUrl} : {}),
      ...(audioUrl ? {audioUrl} : {}),
    } as ActiveElementData
  }, [getValue]);

  const handleSetFullImageSrc = useCallback((data: typeof fullImage) => {
    if (!(editMode || previewMode)) {
      setFullImage(data);
    }
  }, [editMode, previewMode, setFullImage]);

  const handleClearFullImageSrc = useCallback(() => setFullImage(INITIAL_STATE), [setFullImage]);

  const handleFullImageClick = useCallback(() => {
    onActiveElementClick && onActiveElementClick(fullImage.key, {
      imageUrl: fullImage.src,
    })
    handleClearFullImageSrc()
  }, [onActiveElementClick, handleClearFullImageSrc, fullImage]);

  const handleImageClick = useCallback((k: string, index: number) => (e: React.MouseEvent<HTMLElement>) => {
    handleClick(`image_${k}`, getTileData(k) as ActiveElementData)(e);
    handleSetFullImageSrc({
      key: `full_image_${k}`,
      src: (getValue(`image_${k}`, 'fullScreenUrl') as string) || defaultImages[index] || defaultImages[0],
      background: `${getValue(k, 'background_hover')}`,
    });
  }, [getTileData, handleClick, getValue, handleSetFullImageSrc, defaultImages]);


  return {
    handleImageClick,
    handleFullImageClick,
    handleDeleteTile,
    fullImage,
    getTileData,
  };
}
