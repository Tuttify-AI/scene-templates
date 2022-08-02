import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActiveElementData, SceneValue } from '../../shared/types';
import { arrayIsEqual, getElementValue } from '../../shared/utils';
import { SpellBeeElements } from '../types';
import { checkArray, checkCorrectWord } from '../utils';
import { useActions } from '../../shared/hooks';
import useParams from './use-params';

const INITIAL_STATE = {
  src: '',
  backgroundColor: 'transparent',
  text: '',
  textColor: '#000',
  soundKey: '',
};

const EMPTY_ARRAY: number[] = [];

type UseLetterActionParams = {
  totalItemsArray: ReturnType<typeof useParams>['totalItemsArray'];
  predefinedTotalItemIndexes?: ReturnType<typeof useParams>['predefinedTotalItemIndexes'];
  itemsArray: ReturnType<typeof useParams>['itemsArray'];
  isPredefinedIndex: ReturnType<typeof useParams>['isPredefinedIndex'];
  answerArray: (null | number)[];
  editMode?: boolean;
  lockCorrectSelection?: boolean;
  values?: SpellBeeElements<SceneValue>;
  handleClick?: ReturnType<typeof useActions>['handleClick'];
};
const useLetterAction = ({
  answerArray,
  editMode,
  totalItemsArray,
  itemsArray,
  values,
  lockCorrectSelection,
  handleClick,
  predefinedTotalItemIndexes = EMPTY_ARRAY,
  isPredefinedIndex,
}: UseLetterActionParams) => {
  const [selectedLetterIndex, setSelectedLetterIndex] = useState<number | null>(null);
  const [answer, setAnswer] = useState(answerArray);
  const getValue = useMemo(() => getElementValue<SpellBeeElements>(values), [values]);
  const [fullScreen, setFullScreen] = useState(INITIAL_STATE);

  const answerBasedOnPredefinedValues = useMemo(() => {
    const newAnswer = [...answer];
    predefinedTotalItemIndexes.forEach(predefinedIndex => {
      newAnswer[predefinedIndex] = predefinedIndex;
    });
    return newAnswer;
  }, [predefinedTotalItemIndexes, answer]);

  useEffect(() => {
    editMode && setSelectedLetterIndex(null);
    !arrayIsEqual(answerBasedOnPredefinedValues, answer) && setAnswer(answerBasedOnPredefinedValues);
  }, [editMode, answerBasedOnPredefinedValues, answer]);

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
      const letter = totalLetterIndex !== null && totalItemsArray[totalLetterIndex];
      const word = itemsArray.join('');
      return {
        ...(isCorrect !== null ? { isCorrect } : {}),
        ...(letter ? { letter } : {}),
        ...(word ? { word } : {}),
        ...(index !== null ? { index } : {}),
      } as ActiveElementData;
    },
    [itemsArray, totalItemsArray]
  );

  const handleSetAnswer = useCallback(
    (index: number, selectedIndex?: number) => (e?: React.MouseEvent<HTMLElement>) => {
      e?.preventDefault();
      const letterIndex = selectedIndex ?? selectedLetterIndex;
      const changeLocked = lockCorrectSelection && checkIfCorrectLetter(index);
      if (!editMode && !changeLocked && !isPredefinedIndex(index)) {
        if (letterIndex === null) {
          setAnswer(prevAnswer => prevAnswer.map((a, i) => (i === index ? null : a)));
        } else {
          handleClick && handleClick('answer', { data: getAnswerData(index, letterIndex) })(e);
          setAnswer(prevAnswer => prevAnswer.map((a, i) => (i === index ? letterIndex : a)));
          setSelectedLetterIndex(null);
        }
      }
    },
    [
      selectedLetterIndex,
      editMode,
      lockCorrectSelection,
      checkIfCorrectLetter,
      handleClick,
      getAnswerData,
      isPredefinedIndex,
    ]
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
