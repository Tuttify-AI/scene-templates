import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActiveElementData, SceneValue } from '../../shared/types';
import { getElementValue } from '../../shared/utils';
import { GuessWordElements } from '../types';
import { checkArray, checkCorrectWord } from '../utils';
import { useActions } from '../../shared/hooks';

const INITIAL_STATE = {
  src: '',
  backgroundColor: 'transparent',
  text: '',
  textColor: '#000',
  soundKey: '',
};

type UseLetterActionParams = {
  totalLettersArray: string[];
  wordArray: string[];
  answerArray: (null | number)[];
  editMode?: boolean;
  lockCorrectSelection?: boolean;
  values?: GuessWordElements<SceneValue>;
  handleClick?: ReturnType<typeof useActions>['handleClick'];
};
const useLetterAction = ({
  answerArray,
  editMode,
  totalLettersArray,
  wordArray,
  values,
  lockCorrectSelection,
  handleClick,
}: UseLetterActionParams) => {
  const [selectedLetterIndex, setSelectedLetterIndex] = useState<number | null>(null);
  const [answer, setAnswer] = useState(answerArray);
  const getValue = useMemo(() => getElementValue<GuessWordElements>(values), [values]);
  const [fullScreen, setFullScreen] = useState(INITIAL_STATE);

  useEffect(() => {
    editMode && setSelectedLetterIndex(null);
    setAnswer([]);
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
        textColor: correct ? `${getValue('image', 'success_text_color')}` : `${getValue('image', 'error_text_color')}`,
        text: correct ? `${getValue('image', 'success_text')}` : `${getValue('image', 'error_text')}`,
        soundKey: correct ? 'success_sound' : `error_sound`,
      });
    }
    return result;
  }, [answer, correct, getValue]);

  const checkIfCorrectLetter = useCallback(
    (answerIndex: number | null) => {
      const wordIndexInAnswer = answerIndex !== null ? answer[answerIndex] : null;
      return answerIndex !== null && wordArray[answerIndex] !== null && wordIndexInAnswer !== null
        ? wordArray[answerIndex].toUpperCase() === totalLettersArray[wordIndexInAnswer].toUpperCase()
        : null;
    },
    [wordArray, totalLettersArray, answer]
  );

  const getAnswerData = useCallback(
    (index: number, totalLetterIndex: number | null) => {
      const isCorrect = totalLetterIndex !== null && totalLettersArray[totalLetterIndex] === wordArray[index];
      const letter = totalLetterIndex !== null && totalLettersArray[totalLetterIndex];
      const word = wordArray.join('');
      return {
        ...(isCorrect !== null ? { isCorrect } : {}),
        ...(letter ? { letter } : {}),
        ...(word ? { word } : {}),
        ...(index !== null ? { index } : {}),
      } as ActiveElementData;
    },
    [wordArray, totalLettersArray]
  );

  const handleSetAnswer = useCallback(
    (index: number) => (e?: React.MouseEvent<HTMLElement>) => {
      e?.preventDefault();
      const changeLocked = lockCorrectSelection && checkIfCorrectLetter(index);
      if (!editMode && !changeLocked) {
        if (selectedLetterIndex === null) {
          setAnswer(prevAnswer => prevAnswer.map((a, i) => (i === index ? null : a)));
        } else {
          handleClick && handleClick('answer', { data: getAnswerData(index, selectedLetterIndex) })(e);
          setAnswer(prevAnswer => prevAnswer.map((a, i) => (i === index ? selectedLetterIndex : a)));
          setSelectedLetterIndex(null);
        }
      }
    },
    [selectedLetterIndex, editMode, lockCorrectSelection, checkIfCorrectLetter, handleClick, getAnswerData]
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
    checkIfCorrectLetter,
  };
};

export default useLetterAction;
