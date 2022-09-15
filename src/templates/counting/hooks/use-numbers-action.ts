import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActiveElementData, SceneValue } from '../../shared/types';
import { getElementValue } from '../../shared/utils';
import { CountingElements } from '../types';
import { checkArray, checkCorrectWord } from '../utils';
import { useActions } from '../../shared/hooks';
import useAnswerTimer from '../../shared/hooks/use-answer-timer';

const INITIAL_STATE = {
  src: '',
  backgroundColor: 'transparent',
  text: '',
  textColor: '#000',
  soundKey: '',
};

type UseNumbersActionParams = {
  totalItemsArray: string[];
  itemsArray: string[];
  answerArray: (null | number)[];
  editMode?: boolean;
  lockCorrectSelection?: boolean;
  values?: CountingElements<SceneValue>;
  handleClick?: ReturnType<typeof useActions>['handleClick'];
  handleComplete?: ReturnType<typeof useActions>['handleComplete'];
  handleSceneSolved?: ReturnType<typeof useActions>['handleSceneSolved'];
  getUserAnswerTime: ReturnType<typeof useAnswerTimer>['getUserAnswerTime'];
};
const useNumbersAction = ({
  answerArray,
  editMode,
  totalItemsArray,
  itemsArray,
  values,
  lockCorrectSelection,
  handleClick,
  handleComplete,
  getUserAnswerTime,
  handleSceneSolved,
}: UseNumbersActionParams) => {
  const [selectedNumberIndex, setSelectedNumberIndex] = useState<number | null>(null);
  const [answer, setAnswer] = useState(answerArray);
  const getValue = useMemo(() => getElementValue<CountingElements>(values), [values]);
  const [fullScreen, setFullScreen] = useState(INITIAL_STATE);

  useEffect(() => {
    editMode && setSelectedNumberIndex(null);
    setAnswer([]);
  }, [editMode]);

  useEffect(() => {
    if (answerArray.length !== answer.length) {
      setAnswer(answerArray);
    }
  }, [answerArray, answer]);

  const checkIsNumberDisabled = useCallback(
    (index: number) => typeof answer.find(a => a === index) === 'number',
    [answer]
  );

  const handleNumberClick = useCallback(
    (numberIndex: number) => () => {
      if (!editMode && !checkIsNumberDisabled(numberIndex)) {
        if (numberIndex === selectedNumberIndex) {
          setSelectedNumberIndex(null);
        } else {
          setSelectedNumberIndex(numberIndex);
        }
      }
    },
    [selectedNumberIndex, editMode, checkIsNumberDisabled]
  );
  const correct = useMemo(() => {
    return checkCorrectWord(answer, totalItemsArray, itemsArray.join());
  }, [answer, totalItemsArray, itemsArray]);

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

  const checkIfCorrectNumber = useCallback(
    (answerIndex: number | null) => {
      const wordIndexInAnswer = answerIndex !== null ? answer[answerIndex] : null;
      return answerIndex !== null && itemsArray[answerIndex] !== null && wordIndexInAnswer !== null
        ? itemsArray[answerIndex].toUpperCase() === totalItemsArray[wordIndexInAnswer].toUpperCase()
        : null;
    },
    [itemsArray, totalItemsArray, answer]
  );

  const getAnswerData = useCallback(
    (index: number, totalNumberIndex: number | null) => {
      const isCorrect = totalNumberIndex !== null && totalItemsArray[totalNumberIndex] === itemsArray[index];
      const number = totalNumberIndex !== null && totalItemsArray[totalNumberIndex];
      const correctAnswer = itemsArray.join('');
      return {
        ...(isCorrect !== null ? { isCorrect } : {}),
        ...(number ? { number } : {}),
        ...(correctAnswer ? { correctAnswer } : {}),
        ...(index !== null ? { index } : {}),
      } as ActiveElementData;
    },
    [itemsArray, totalItemsArray]
  );

  const handleSetAnswer = useCallback(
    (index: number, selectedIndex?: number) => (e?: React.MouseEvent<HTMLElement>) => {
      e?.preventDefault();
      const numberIndex = selectedIndex ?? selectedNumberIndex;
      const changeLocked = lockCorrectSelection && checkIfCorrectNumber(index);
      if (!editMode && !changeLocked) {
        if (numberIndex === null) {
          setAnswer(prevAnswer => prevAnswer.map((a, i) => (i === index ? null : a)));
        } else {
          handleClick && handleClick('answer', { data: getAnswerData(index, numberIndex) })(e);
          handleSceneSolved &&
            handleSceneSolved('answer', {
              data: {
                isCorrect: correct,
                number: itemsArray.join(''),
                answer: totalItemsArray[numberIndex],
                answerTime: getUserAnswerTime().time,
                sceneTime: getUserAnswerTime().total,
              },
            });
          setAnswer(prevAnswer => prevAnswer.map((a, i) => (i === index ? numberIndex : a)));
          setSelectedNumberIndex(null);
        }
      }
    },
    [
      selectedNumberIndex,
      lockCorrectSelection,
      checkIfCorrectNumber,
      editMode,
      handleClick,
      getAnswerData,
      handleSceneSolved,
      correct,
      itemsArray,
      totalItemsArray,
      getUserAnswerTime,
    ]
  );

  const handleClearFullImageSrc = useCallback(() => setAnswer(answer.map(() => null)), [answer, setAnswer]);

  const handleFullImageClick = useCallback(() => {
    handleClearFullImageSrc();
    setFullScreen(INITIAL_STATE);
    handleComplete && handleComplete('answer');
  }, [handleClearFullImageSrc, handleComplete]);

  return {
    checkIsNumberDisabled,
    selectedNumberIndex,
    answer,
    handleNumberClick,
    handleSetAnswer,
    isFullAnswer,
    correct,
    handleFullImageClick,
    fullScreen,
    checkIfCorrectNumber,
  };
};

export default useNumbersAction;
