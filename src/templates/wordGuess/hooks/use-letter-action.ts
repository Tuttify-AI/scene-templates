import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SceneValue } from '../../shared/types';
import { getElementValue } from '../../shared/utils';
import { GuessWordElements } from '../types';
import { checkArray, checkCorrectWord } from '../utils';

const INITIAL_STATE = {
  src: '',
  backgroundColor: 'transparent',
  text: '',
};

type UseLetterActionParams = {
  totalLettersArray: string[];
  wordArray: string[];
  answerArray: (null | number)[];
  editMode?: boolean;
  values?: GuessWordElements<SceneValue>;
};
const useLetterAction = ({ answerArray, editMode, totalLettersArray, wordArray, values }: UseLetterActionParams) => {
  const [selectedLetterIndex, setSelectedLetterIndex] = useState<number | null>(null);
  const [answer, setAnswer] = useState(answerArray);
  const getValue = useMemo(() => getElementValue<GuessWordElements>(values), [values]);
  const [fullScreen, setFullScreen] = useState(INITIAL_STATE);

  useEffect(() => {
    editMode && setSelectedLetterIndex(null);
  }, [editMode]);

  useEffect(() => {
    if (answerArray.length !== answer.length) {
      setAnswer(answerArray);
    }
  }, [answerArray, answer]);

  const checkIsLetterDisabled = useCallback(
    (index: number) => typeof answer.find(a => a === index) === 'number',
    [answer]
  );

  const handleLetterClick = useCallback(
    (letterIndex: number) => () => {
      if (!editMode && !checkIsLetterDisabled(letterIndex)) {
        if (letterIndex === selectedLetterIndex) {
          setSelectedLetterIndex(null);
        } else {
          setSelectedLetterIndex(letterIndex);
        }
      }
    },
    [selectedLetterIndex, editMode, checkIsLetterDisabled]
  );
  const correct = useMemo(() => {
    return checkCorrectWord(answer, totalLettersArray, wordArray.join());
  }, [answer, totalLettersArray, wordArray]);

  const isFullAnswer = useMemo(() => {
    const result = checkArray(answer);
    if (result) {
      setFullScreen({
        src: correct ? `${getValue('image', 'success_image')}` : `${getValue('image', 'error_image')}`,
        backgroundColor: correct
          ? `${getValue('image', 'success_background')}`
          : `${getValue('image', 'error_background')}`,
        text: correct ? `${getValue('image', 'success_text')}` : `${getValue('image', 'error_text')}`,
      });
    }
    return result;
  }, [answer, correct, getValue]);

  const handleSetAnswer = useCallback(
    (index: number) => (e?: React.MouseEvent<HTMLElement>) => {
      e?.preventDefault();
      if (!editMode) {
        selectedLetterIndex !== null &&
          setAnswer(prevAnswer => prevAnswer.map((a, i) => (i === index ? selectedLetterIndex : a)));
        setSelectedLetterIndex(null);
      }
    },
    [selectedLetterIndex, editMode]
  );

  const handleClearFullImageSrc = useCallback(() => setAnswer(answer.map(() => null)), [answer, setAnswer]);

  const handleFullImageClick = useCallback(() => {
    handleClearFullImageSrc();
    setFullScreen(INITIAL_STATE);
  }, [handleClearFullImageSrc]);

  return {
    checkIsLetterDisabled,
    selectedLetterIndex,
    answer,
    handleLetterClick,
    handleSetAnswer,
    isFullAnswer,
    correct,
    handleFullImageClick,
    fullScreen,
  };
};

export default useLetterAction;
