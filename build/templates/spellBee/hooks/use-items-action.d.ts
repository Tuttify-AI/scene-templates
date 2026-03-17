import React from 'react';
import { SceneValue } from '../../shared/types';
import { AnswerType, SpellBeeElements } from '../types';
import { useActions } from '../../shared/hooks';
import useParams from './use-params';
import useAnswerTimer from '../../shared/hooks/use-answer-timer';
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
declare const useItemsAction: ({ answerArray, editMode, useArray, totalItemsArray, itemsArray, values, lockCorrectSelection, handleClick, predefinedTotalItemIndexes, handleComplete, getUserAnswerTime, handleSceneSolved, }: UseItemsActionParams) => {
    checkIsLetterDisabled: (index: number) => boolean;
    selectedLetterIndex: AnswerType;
    answer: AnswerType[];
    handleLetterClick: (letterIndex: number) => () => void;
    handleSetAnswer: (index: number, selectedIndex?: number) => (e?: React.MouseEvent<HTMLElement>) => void;
    isFullAnswer: boolean;
    correct: boolean;
    handleFullImageClick: (e?: React.MouseEvent) => Promise<void>;
    fullScreen: {
        src: string;
        backgroundColor: string;
        text: string;
        textColor: string;
        soundKey: string;
    };
    checkIfCorrectLetter: (answerIndex: number | null) => boolean | null;
};
export default useItemsAction;
