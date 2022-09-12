import React, { useCallback, useEffect, useState } from 'react';
import { ActiveElementData, Elements, Parameters, SceneProps } from '../types';
import { deleteElement } from '../utils';
import useActions, { OnClickData } from './use-actions';
import { SceneNames } from '../enums';

type Params = Pick<SceneProps, 'editMode' | 'previewMode' | 'onSet' | 'values'> & {
  onActiveElementClick?: SceneProps['onActiveElementClick'];
  getValue: (element: keyof Elements, parameter: keyof Parameters) => unknown;
  handleAdd: (e: React.MouseEvent<HTMLButtonElement>) => void;
  elements: string[];
  handleClick: ReturnType<typeof useActions>['handleClick'];
  defaultImages: string[];
  getUserAnswerTime: () => number;
  handleComplete?: (key: keyof Elements, { data }: OnClickData) => void;
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
  getUserAnswerTime,
  handleComplete,
}: Params) {
  const [fullImage, setFullImage] = useState(INITIAL_STATE);
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
      }
      return {
        ...(text ? { text } : {}),
        ...(fullScreenText ? { fullScreenText } : {}),
        ...(imageUrl ? { imageUrl } : {}),
        ...(fullScreenUrl ? { fullScreenUrl } : {}),
        ...(audioUrl ? { audioUrl } : {}),
        isCorrect: !!isCorrect,
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
    onActiveElementClick &&
      onActiveElementClick(fullImage.key, {
        imageUrl: fullImage.src,
      });
    handleClearFullImageSrc();
  }, [onActiveElementClick, handleClearFullImageSrc, fullImage]);

  const handleImageClick = useCallback(
    (k: string, index: number) => (e: React.MouseEvent<HTMLElement>) => {
      handleClick(k, { data: getElementData(k) })(e);
      const { isCorrect } = getElementData(k);
      handleComplete &&
        handleComplete('answer', {
          data: {
            isCorrect,
            answer: k,
            answerTime: getUserAnswerTime(),
          },
        });

      handleSetFullImageSrc({
        key: `full_image_${k}`,
        src: (getValue(k, 'full_screen_url') as string) || defaultImages[index] || defaultImages[0],
        background: `${getValue(k, 'background')}`,
        text: (getValue(k, 'full_screen_text') as string) || '',
      });
    },
    [handleClick, getElementData, handleComplete, getUserAnswerTime, handleSetFullImageSrc, getValue, defaultImages]
  );

  return {
    handleImageClick,
    handleFullImageClick,
    handleDelete,
    fullImage,
    getElementData,
  };
}
