import React from 'react';
import { SceneValue } from '../../shared/types';
import { CountingElements } from '../types';
import { useActions } from '../../shared/hooks';
import useAnswerTimer from '../../shared/hooks/use-answer-timer';
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
declare const useNumbersAction: ({ answerArray, editMode, totalItemsArray, itemsArray, values, lockCorrectSelection, handleClick, handleComplete, getUserAnswerTime, handleSceneSolved, }: UseNumbersActionParams) => {
    checkIsNumberDisabled: (index: number) => boolean;
    selectedNumberIndex: number | null;
    answer: (number | null)[];
    handleNumberClick: (numberIndex: number) => () => void;
    handleSetAnswer: (index: number, selectedIndex?: number) => (e?: React.MouseEvent<HTMLElement>) => void;
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
    checkIfCorrectNumber: (answerIndex: number | null) => boolean | null;
};
export default useNumbersAction;
