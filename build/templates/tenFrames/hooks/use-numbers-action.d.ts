import React from 'react';
import { SceneValue } from '../../shared/types';
import { TenFramesElements } from '../types';
import { useActions } from '../../shared/hooks';
import useParams from './use-params';
import useAnswerTimer from '../../shared/hooks/use-answer-timer';
type UseNumbersActionParams = {
    predefinedValues: ReturnType<typeof useParams>['predefinedValues'];
    mathOperand: ReturnType<typeof useParams>['mathOperand'];
    mathSecondOperand: ReturnType<typeof useParams>['mathSecondOperand'];
    mathThirdOperand: ReturnType<typeof useParams>['mathThirdOperand'];
    editMode?: boolean;
    values?: TenFramesElements<SceneValue>;
    handleClick?: ReturnType<typeof useActions>['handleClick'];
    handleComplete?: ReturnType<typeof useActions>['handleComplete'];
    handleSceneSolved?: ReturnType<typeof useActions>['handleSceneSolved'];
    getUserAnswerTime: ReturnType<typeof useAnswerTimer>['getUserAnswerTime'];
};
declare const useNumbersAction: ({ predefinedValues, editMode, values, handleClick, mathOperand, mathSecondOperand, mathThirdOperand, handleComplete, handleSceneSolved, getUserAnswerTime, }: UseNumbersActionParams) => {
    selectedNumber: number | null;
    answer: {
        numbers: import("../../shared/types").DefaultType[];
        resultNumber: null;
    };
    handleNumberClick: (numberIndex: number) => () => void;
    handleSetAnswer: (type: "numbers" | "resultNumber", value?: number | null) => (e?: React.MouseEvent<HTMLElement>) => void;
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
