import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { checkArray, checkCorrectWord } from '../../shared/types';

type UseLetterActionParams = {
  totalLettersArray: string[];
  wordArray: string[];
  answerArray: (null | number)[];
  editMode?: boolean;
};
const useLetterAction = ({ answerArray, editMode, totalLettersArray, wordArray }: UseLetterActionParams) => {
  const [selectedLetterIndex, setSelectedLetterIndex] = useState<number | null>(null);
  const [answer, setAnswer] = useState(answerArray);

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

  const isFullAnswer = useMemo(() => {
    return checkArray(answer);
  }, [answer]);

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

  const correct = useMemo(() => {
    return checkCorrectWord(answer, totalLettersArray, wordArray.join());
  }, [answer, totalLettersArray, wordArray]);

  const handleClearFullImageSrc = useCallback(() => setAnswer(answer.map(() => null)), [answer, setAnswer]);

  const handleFullImageClick = useCallback(() => {
    handleClearFullImageSrc();
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
  };
};

export default useLetterAction;
