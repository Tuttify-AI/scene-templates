import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActiveElementData, SceneValue } from '../../shared/types';
import { getElementValue } from '../../shared/utils';
import { CountingElements } from '../types';
import { useActions } from '../../shared/hooks';
import useParams from './use-params';
import { checkMultiCorrectResult } from '../utils';
import useAnswerTimer from '../../shared/hooks/use-answer-timer';

const INITIAL_STATE = {
  src: '',
  backgroundColor: 'transparent',
  text: '',
  textColor: '#000',
  soundKey: '',
};

type UseNumbersActionParams = {
  predefinedValues: ReturnType<typeof useParams>['predefinedValues'];
  mathOperand: ReturnType<typeof useParams>['mathOperand'];
  mathSecondOperand: ReturnType<typeof useParams>['mathSecondOperand'];
  mathThirdOperand: ReturnType<typeof useParams>['mathThirdOperand'];
  editMode?: boolean;
  values?: CountingElements<SceneValue>;
  handleClick?: ReturnType<typeof useActions>['handleClick'];
  handleComplete?: ReturnType<typeof useActions>['handleComplete'];
  handleSceneSolved?: ReturnType<typeof useActions>['handleSceneSolved'];
  getUserAnswerTime: ReturnType<typeof useAnswerTimer>['getUserAnswerTime'];
};
const useNumbersAction = ({
  predefinedValues,
  editMode,
  values,
  handleClick,
  mathOperand,
  mathSecondOperand,
  mathThirdOperand,
  handleComplete,
  handleSceneSolved,
  getUserAnswerTime,
}: UseNumbersActionParams) => {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [answer, setAnswer] = useState(predefinedValues);
  const getValue = useMemo(() => getElementValue<CountingElements>(values), [values]);
  const [fullScreen, setFullScreen] = useState(INITIAL_STATE);

  const onClearAnswer = useCallback(() => setAnswer(predefinedValues), [predefinedValues]);

  useEffect(() => {
    editMode && setSelectedNumber(null);
    onClearAnswer();
  }, [editMode, onClearAnswer]);

  const handleNumberClick = useCallback(
    (numberIndex: number) => () => {
      if (!editMode) {
        if (numberIndex === selectedNumber) {
          setSelectedNumber(null);
        } else {
          setSelectedNumber(numberIndex);
        }
      }
    },
    [selectedNumber, editMode, setSelectedNumber]
  );

  const isCorrect = useMemo(() => {
    return checkMultiCorrectResult(
      answer.number,
      answer.resultNumber,
      mathOperand,
      mathSecondOperand,
      mathThirdOperand
    );
  }, [answer.number, answer.resultNumber, mathOperand, mathSecondOperand, mathThirdOperand]);

  const isFullAnswer = useMemo(() => {
    const result = Object.values(answer).every(val => val !== null);
    if (result) {
      setFullScreen({
        src: isCorrect ? `${getValue('image', 'success_image')}` : `${getValue('image', 'error_image')}`,
        backgroundColor: isCorrect
          ? `${getValue('image', 'success_background')}`
          : `${getValue('image', 'error_background')}`,
        textColor: isCorrect
          ? `${getValue('image', 'success_text_color')}`
          : `${getValue('image', 'error_text_color')}`,
        text: isCorrect ? `${getValue('image', 'success_text')}` : `${getValue('image', 'error_text')}`,
        soundKey: isCorrect ? 'success_sound' : `error_sound`,
      });
    }
    return result;
  }, [answer, isCorrect, getValue]);

  const getAnswerData = useCallback(
    (type: keyof typeof answer, number?: number | null) => {
      const result = Object.values(answer).every(val => val !== null);
      return {
        ...(result ? { isCorrect } : {}),
        ...(type ? { type } : {}),
        ...(number ? { number } : {}),
      } as ActiveElementData;
    },
    [isCorrect, answer]
  );
  const handleSetAnswer = useCallback(
    (type: keyof typeof answer, value?: number | null) => (e?: React.MouseEvent<HTMLElement>) => {
      e?.preventDefault();
      const selectedValue = value ?? selectedNumber;
      if (!editMode && selectedValue !== null) {
        if ((answer[type] && !predefinedValues[type]) || !answer[type]) {
          handleClick && handleClick(type, { data: getAnswerData(type, selectedValue) })(e);
          const newAnswer = { ...answer, [type]: selectedValue };
          const result = Object.values(newAnswer).every(val => val !== null);
          const isCorrect = checkMultiCorrectResult(
            newAnswer.number,
            newAnswer.resultNumber,
            mathOperand,
            mathSecondOperand,
            mathThirdOperand
          );
          setAnswer(newAnswer);
          result &&
            handleSceneSolved &&
            handleSceneSolved(
              'answers',
              {
                data: {
                  isCorrect,
                  answer: selectedValue,
                  number: newAnswer.number,
                  answerTime: getUserAnswerTime().time,
                  sceneTime: getUserAnswerTime().total,
                },
              },
              {
                key: 'image',
                parameter: isCorrect ? 'success_sound' : 'error_sound',
              }
            );
          setSelectedNumber(null);
        }
      }
    },
    [
      mathOperand,
      selectedNumber,
      editMode,
      answer,
      predefinedValues,
      handleClick,
      getAnswerData,
      handleSceneSolved,
      getUserAnswerTime,
      mathSecondOperand,
      mathThirdOperand,
    ]
  );

  const handleFullImageClick = useCallback(() => {
    onClearAnswer();
    setFullScreen(INITIAL_STATE);
    handleComplete &&
      handleComplete('answer', {
        data: {
          isCorrect,
          answer: selectedNumber as number,
          number: answer.number,
          answerTime: getUserAnswerTime().time,
          sceneTime: getUserAnswerTime().total,
        },
      });
  }, [onClearAnswer, handleComplete, isCorrect, answer, getUserAnswerTime, selectedNumber]);

  return {
    selectedNumber,
    answer,
    handleNumberClick,
    handleSetAnswer,
    isFullAnswer,
    correct: isCorrect,
    handleFullImageClick,
    fullScreen,
  };
};

export default useNumbersAction;
