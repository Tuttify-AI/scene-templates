import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActiveElementData, SceneValue } from '../../shared/types';
import { getElementValue } from '../../shared/utils';
import { AnswerType, SpellBeeElements } from '../types';
import { checkArray, checkCorrectWord, getAnswer } from '../utils';
import { useActions } from '../../shared/hooks';
import useParams from './use-params';
import useAnswerTimer from '../../shared/hooks/use-answer-timer';

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
  handleComplete?: ReturnType<typeof useActions>['handleComplete'];
  handleSceneSolved?: ReturnType<typeof useActions>['handleSceneSolved'];
  getUserAnswerTime: ReturnType<typeof useAnswerTimer>['getUserAnswerTime'];
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
  handleSceneSolved,
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

  const getSceneData = useCallback(
    (answer: AnswerType[], extraData: ActiveElementData = {}) => {
      const value = itemsArray.join(useArray ? ' ' : '');
      const isCorrect = checkCorrectWord(answer, totalItemsArray, itemsArray.join());
      return {
        isCorrect,
        value,
        valueLength: itemsArray?.length,
        answer: getAnswer(answer, totalItemsArray, useArray),
        answerTime: getUserAnswerTime().time,
        sceneTime: getUserAnswerTime().total,
        ...extraData,
      } as ActiveElementData;
    },
    [itemsArray, totalItemsArray, getUserAnswerTime, useArray]
  );

  const onSceneSolved = useCallback(
    (answer: AnswerType[]) => {
      const data = getSceneData(answer);
      if (checkArray(answer)) {
        handleSceneSolved &&
          handleSceneSolved(
            'answer',
            { data },
            {
              key: 'image',
              parameter: data?.isCorrect ? 'success_sound' : `error_sound`,
            }
          );
      }
    },
    [getSceneData, handleSceneSolved]
  );

  const onComplete = useCallback(
    async (answer: AnswerType[]) => {
      if (checkArray(answer)) {
        handleComplete &&
          handleComplete('answer', {
            data: getSceneData(answer),
          });
      }
    },
    [getSceneData, handleComplete]
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
    (answer: AnswerType[], index: number, totalLetterIndex: number | null) => {
      const isCorrect = totalLetterIndex !== null && totalItemsArray[totalLetterIndex] === itemsArray[index];
      const value = totalLetterIndex !== null ? totalItemsArray[totalLetterIndex] : undefined;
      return getSceneData(answer, { isCorrect, value });
    },
    [itemsArray, totalItemsArray, getSceneData]
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
          handleClick && handleClick('answer', { data: getAnswerData(newAnswer, index, letterIndex) })(e);
          onSceneSolved(newAnswer);
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
      onSceneSolved,
    ]
  );

  const handleClearFullImageSrc = useCallback(
    () => setAnswer(predefinedTotalItemIndexes),
    [setAnswer, predefinedTotalItemIndexes]
  );

  const handleFullImageClick = useCallback(
    async (e?: React.MouseEvent) => {
      e?.stopPropagation();
      onComplete(answer);
      handleClearFullImageSrc();
      setFullScreen(INITIAL_STATE);
    },
    [handleClearFullImageSrc, answer, onComplete]
  );

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
