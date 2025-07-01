import React, { useCallback, useEffect, useState } from 'react';
import { ActiveElementData, Elements, Parameters, SceneProps } from '../types';
import { deleteElement } from '../utils';
import { useActions } from './index';

type Params = Pick<SceneProps, 'editMode' | 'previewMode' | 'onSet' | 'values'> & {
  onActiveElementClick?: SceneProps['onActiveElementClick'];
  getValue: (element: keyof Elements, parameter: keyof Parameters) => unknown;
  handleAdd: (e: React.MouseEvent<HTMLButtonElement>) => void;
  elements: string[];
  handleClick: ReturnType<typeof useActions>['handleClick'];
  defaultImages: string[]
};

const INITIAL_STATE = {
  key: '',
  src: '',
  background: 'transparent',
};

export default function useQuizAnswers({ editMode, previewMode , getValue, onActiveElementClick, onSet, values, elements, handleClick, defaultImages }: Params) {
  const [fullImage, setFullImage] = useState(INITIAL_STATE);
  useEffect(() => {
    if (editMode || previewMode) {
      setFullImage(INITIAL_STATE);
    }
  }, [editMode, previewMode, setFullImage]);

  const handleDelete = useCallback((e: React.MouseEvent<HTMLButtonElement>, k: string) => {
    e.stopPropagation();
    onSet &&
    onSet(deleteElement(values, elements, k));
  }, [onSet, elements, values]);

  const getElementData = useCallback((k) => {
    const text = getValue(k, 'text');
    const imageUrl = getValue(k, 'url');
    const audioUrl = getValue(k, 'sound');
    const isCorrect = getValue(k, 'is_correct');
    return {
      ...(text ? {text} : {}),
      ...(imageUrl ? {imageUrl} : {}),
      ...(audioUrl ? {audioUrl} : {}),
      ...(isCorrect ? {isCorrect} : {}),
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
    handleClick(k, getElementData(k))(e);
    handleSetFullImageSrc({
      key: `full_image_${k}`,
      src: (getValue(k, 'full_screen_url') as string) || defaultImages[index] || defaultImages[0],
      background: `${getValue(k, 'background_hover')}`,
    });
  }, [getValue, handleSetFullImageSrc, defaultImages, handleClick, getElementData]);


  return {
    handleImageClick,
    handleFullImageClick,
    handleDelete,
    fullImage,
    getElementData,
  };
}
