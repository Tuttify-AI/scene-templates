import React from 'react';
import { ActiveElementData, Elements, Parameters, SceneProps } from '../types';
import useActions from './use-actions';
import useAnswerTimer from './use-answer-timer';
type Params = Pick<SceneProps, 'editMode' | 'previewMode' | 'onSet' | 'values'> & {
    onActiveElementClick?: SceneProps['onActiveElementClick'];
    getValue: (element: keyof Elements, parameter: keyof Parameters) => unknown;
    handleAdd: (e: React.MouseEvent<HTMLButtonElement>) => void;
    elements: string[];
    handleClick: ReturnType<typeof useActions>['handleClick'];
    defaultImages: string[];
    getUserAnswerTime: ReturnType<typeof useAnswerTimer>['getUserAnswerTime'];
    handleSceneSolved?: ReturnType<typeof useActions>['handleSceneSolved'];
    handleComplete?: ReturnType<typeof useActions>['handleComplete'];
};
export default function useQuizAnswers({ editMode, previewMode, getValue, onActiveElementClick, onSet, values, elements, handleClick, defaultImages, getUserAnswerTime, handleSceneSolved, handleComplete, }: Params): {
    handleImageClick: (k: string, index: number) => (e: React.MouseEvent<HTMLElement>) => void;
    handleFullImageClick: () => void;
    handleDelete: (e: React.MouseEvent<HTMLButtonElement>, k: string) => void;
    fullImage: {
        key: string;
        src: string;
        background: string;
        text: string;
    };
    getElementData: (k: any) => ActiveElementData;
};
export {};
