import React from 'react';
import { SceneValue } from '../../shared/types';
import { CountingElements } from '../types';
import { useActions } from '../../shared/hooks';
import useParams from './use-params';
import useAnswerTimer from '../../shared/hooks/use-answer-timer';
type UseNumbersActionParams = {
    predefinedValues: ReturnType<typeof useParams>['predefinedValues'];
    mathOperand: ReturnType<typeof useParams>['mathOperand'];
    editMode?: boolean;
    values?: CountingElements<SceneValue>;
    handleClick?: ReturnType<typeof useActions>['handleClick'];
    handleComplete?: ReturnType<typeof useActions>['handleComplete'];
    handleSceneSolved?: ReturnType<typeof useActions>['handleSceneSolved'];
    getUserAnswerTime: ReturnType<typeof useAnswerTimer>['getUserAnswerTime'];
};
declare const useNumbersAction: ({ predefinedValues, editMode, values, handleClick, mathOperand, handleComplete, handleSceneSolved, getUserAnswerTime, }: UseNumbersActionParams) => {
    selectedNumber: number | null;
    answer: {
        leftNumber: number | null;
        rightNumber: number | null;
        resultNumber: number | null;
    };
    handleNumberClick: (numberIndex: number) => () => void;
    handleSetAnswer: (type: "leftNumber" | "rightNumber" | "resultNumber", value?: number | null) => (e?: React.MouseEvent<HTMLElement>) => void;
    isFullAnswer: boolean;
    correct: boolean;
    handleFullImageClick: () => void;
    fullScreen: {
        src: string;
        backgroundColor: string;
        text: string;
        textColor: string;
        soundKey: string;
    };
};
export default useNumbersAction;
