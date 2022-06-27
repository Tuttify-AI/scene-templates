import React, { useCallback, useEffect, useState } from 'react';

type UseLetterActionParams = {
  totalLettersArray: string[];
  answerArray: (null | number)[];
  editMode?: boolean;
};
const useLetterAction = ({ answerArray, editMode }: UseLetterActionParams) => {
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

  return {
    checkIsLetterDisabled,
    selectedLetterIndex,
    answer,
    handleLetterClick,
    handleSetAnswer,
  };
};

export default useLetterAction;
