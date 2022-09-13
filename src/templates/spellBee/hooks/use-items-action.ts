import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActiveElementData, Elements, SceneValue } from '../../shared/types';
import { getElementValue } from '../../shared/utils';
import { AnswerType, SpellBeeElements } from '../types';
import { checkArray, checkCorrectWord, getAnswer } from '../utils';
import { useActions } from '../../shared/hooks';
import useParams from './use-params';
import { OnClickData } from '../../shared/hooks/use-actions';

const INITIAL_STATE = {
  src: '',
  backgroundColor: 'transparent',
  text: '',
  textColor: '#000',
  soundKey: '',
};

const EMPTY_ARRAY: AnswerType[] = [];

type UseItemsActionParams = {
  totalItemsArray: ReturnType<typeof useParams>['totalItemsArray'];
  predefinedTotalItemIndexes?: ReturnType<typeof useParams>['predefinedTotalItemIndexes'];
  itemsArray: ReturnType<typeof useParams>['itemsArray'];
  answerArray: (null | number)[];
  editMode?: boolean;
  useArray?: boolean;
  lockCorrectSelection?: boolean;
  values?: SpellBeeElements<SceneValue>;
  handleClick?: ReturnType<typeof useActions>['handleClick'];
  handleComplete?: (key: keyof Elements, { data }: OnClickData) => void;
  getUserAnswerTime: () => number;
};
const useItemsAction = ({
  answerArray,
  editMode,
  useArray,
  totalItemsArray,
  itemsArray,
  values,
  lockCorrectSelection,
  handleClick,
  predefinedTotalItemIndexes = EMPTY_ARRAY,
  handleComplete,
  getUserAnswerTime,
}: UseItemsActionParams) => {
  const [selectedLetterIndex, setSelectedLetterIndex] = useState<AnswerType>(null);
  const [answer, setAnswer] = useState(predefinedTotalItemIndexes);
  const getValue = useMemo(() => getElementValue<SpellBeeElements>(values), [values]);
  const [fullScreen, setFullScreen] = useState(INITIAL_STATE);

  useEffect(() => {
    editMode && setSelectedLetterIndex(null);
    setAnswer(predefinedTotalItemIndexes);
  }, [editMode, predefinedTotalItemIndexes]);

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
    return checkCorrectWord(answer, totalItemsArray, itemsArray.join());
  }, [answer, totalItemsArray, itemsArray]);

  const onComplete = useCallback(
    (answer: AnswerType[]) =>
      checkArray(answer) &&
      handleComplete &&
      handleComplete('answers', {
        data: {
          isCorrect: checkCorrectWord(answer, totalItemsArray, itemsArray.join()),
          value: itemsArray.join(useArray ? ' ' : ''),
          answer: getAnswer(answer, totalItemsArray, useArray),
          answerTime: getUserAnswerTime(),
        },
      }),
    [itemsArray, totalItemsArray, getUserAnswerTime, handleComplete, useArray]
  );

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
      return answerIndex !== null && itemsArray[answerIndex] !== null && wordIndexInAnswer !== null
        ? itemsArray[answerIndex].toUpperCase() === totalItemsArray[wordIndexInAnswer].toUpperCase()
        : null;
    },
    [itemsArray, totalItemsArray, answer]
  );

  const getAnswerData = useCallback(
    (index: number, totalLetterIndex: number | null) => {
      const isCorrect = totalLetterIndex !== null && totalItemsArray[totalLetterIndex] === itemsArray[index];
      const value = totalLetterIndex !== null && totalItemsArray[totalLetterIndex];
      const answer = itemsArray.join(useArray ? ' ' : '');
      return {
        ...(isCorrect !== null ? { isCorrect } : {}),
        ...(answer ? { answer } : {}),
        ...(value ? { value } : {}),
        ...(index !== null ? { index } : {}),
      } as ActiveElementData;
    },
    [itemsArray, totalItemsArray, useArray]
  );

  const handleSetAnswer = useCallback(
    (index: number, selectedIndex?: number) => (e?: React.MouseEvent<HTMLElement>) => {
      e?.preventDefault();
      const letterIndex = selectedIndex ?? selectedLetterIndex;
      const changeLocked = lockCorrectSelection && checkIfCorrectLetter(index);
      if (!editMode && !changeLocked) {
        if (letterIndex === null) {
          setAnswer(prevAnswer => prevAnswer.map((a, i) => (i === index ? null : a)));
        } else {
          const newAnswer = answer.map((a, i) => (i === index ? letterIndex : a));
          handleClick && handleClick('answer', { data: getAnswerData(index, letterIndex) })(e);
          onComplete(newAnswer);
          setAnswer(newAnswer);
          setSelectedLetterIndex(null);
        }
      }
    },
    [
      selectedLetterIndex,
      lockCorrectSelection,
      checkIfCorrectLetter,
      editMode,
      handleClick,
      getAnswerData,
      answer,
      onComplete,
    ]
  );

  const handleClearFullImageSrc = useCallback(
    () => setAnswer(predefinedTotalItemIndexes),
    [setAnswer, predefinedTotalItemIndexes]
  );

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

export default useItemsAction;
