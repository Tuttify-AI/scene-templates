import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActiveElementData, Elements, Parameters, SceneProps } from '../types';
import { deleteElement } from '../utils';
import useActions from './use-actions';
import { SceneNames } from '../../../index';

type Params = Pick<SceneProps, 'editMode' | 'previewMode' | 'onSet' | 'values'> & {
  onActiveElementClick?: SceneProps['onActiveElementClick'];
  getValue: (element: keyof Elements, parameter: keyof Parameters) => unknown;
  handleAdd: (e: React.MouseEvent<HTMLButtonElement>) => void;
  elements: string[];
  handleClick: ReturnType<typeof useActions>['handleClick'];
  defaultImages: string[];
};

const INITIAL_STATE = {
  key: '',
  src: '',
  background: 'transparent',
  text: '',
};

export default function useQuizAnswers({
  editMode,
  previewMode,
  getValue,
  onActiveElementClick,
  onSet,
  values,
  elements,
  handleClick,
  defaultImages,
}: Params) {
  const [fullImage, setFullImage] = useState(INITIAL_STATE);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState();
  useEffect(() => {
    if (editMode || previewMode) {
      setFullImage(INITIAL_STATE);
    }
  }, [editMode, previewMode, setFullImage]);

  const handleDelete = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, k: string) => {
      e.stopPropagation();
      onSet && onSet(deleteElement(values, elements, k));
    },
    [onSet, elements, values]
  );

  const getElementData = useCallback(
    k => {
      const text = getValue(k, 'text');
      const fullScreenText = getValue(k, 'full_screen_text');
      const fullScreenUrl = getValue(k, 'full_screen_url');
      const imageUrl = getValue(k, 'url');
      const audioUrl = getValue(k, 'sound');
      let isCorrect = getValue(k, 'is_correct');
      if (isCorrect && typeof isCorrect === 'string') {
        isCorrect = isCorrect === 'true';
        setIsCorrect(isCorrect as boolean);
      }
      setSelectedAnswer(k);
      return {
        ...(text ? { text } : {}),
        ...(fullScreenText ? { fullScreenText } : {}),
        ...(imageUrl ? { imageUrl } : {}),
        ...(fullScreenUrl ? { fullScreenUrl } : {}),
        ...(audioUrl ? { audioUrl } : {}),
        ...(isCorrect ? { isCorrect } : {}),
        templateName: SceneNames.Quiz1,
      } as ActiveElementData;
    },
    [getValue]
  );

  const handleSetFullImageSrc = useCallback(
    (data: typeof fullImage) => {
      if (!(editMode || previewMode)) {
        setFullImage(data);
      }
    },
    [editMode, previewMode, setFullImage]
  );

  const handleClearFullImageSrc = useCallback(() => setFullImage(INITIAL_STATE), [setFullImage]);

  const handleFullImageClick = useCallback(() => {
    setSelectedAnswer(null);
    onActiveElementClick &&
      onActiveElementClick(fullImage.key, {
        imageUrl: fullImage.src,
      });
    handleClearFullImageSrc();
  }, [onActiveElementClick, handleClearFullImageSrc, fullImage]);

  const handleImageClick = useCallback(
    (k: string, index: number) => (e: React.MouseEvent<HTMLElement>) => {
      handleClick(k, { data: getElementData(k) })(e);
      handleSetFullImageSrc({
        key: `full_image_${k}`,
        src: (getValue(k, 'full_screen_url') as string) || defaultImages[index] || defaultImages[0],
        background: `${getValue(k, 'background')}`,
        text: (getValue(k, 'full_screen_text') as string) || '',
      });
    },
    [getValue, handleSetFullImageSrc, defaultImages, handleClick, getElementData]
  );

  return {
    handleImageClick,
    handleFullImageClick,
    handleDelete,
    fullImage,
    getElementData,
    correct: isCorrect,
    selectedAnswer,
  };
}
