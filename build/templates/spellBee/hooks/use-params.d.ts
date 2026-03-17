import React from 'react';
import { SceneProps } from '../../shared/types';
import { AnswerType } from '../types';
type Params = Pick<SceneProps, 'values' | 'previewMode' | 'editMode' | 'onSet'> & {
    useArray?: boolean;
};
export default function useParams({ values, previewMode, editMode, onSet, useArray }: Params): {
    highlightIncorrectSelection: boolean;
    highlightCorrectSelection: boolean;
    lockCorrectSelection: boolean;
    selectionFontSize: number;
    selectionContainerHeight: number;
    wordContainerHeight: number;
    wordFontSize: number;
    totalItemsArray: string[];
    itemsArray: string[];
    DEFAULTS: {
        selectionTextSize: number;
        selectionWordSize: number;
        wordTextSize: number;
        wordSize: number;
        fullScreenTextSize: number;
        textPadding: number;
    };
    showSceneActionElements: boolean | undefined;
    selectionItemsWidth: number;
    answerLettersWidth: number;
    answerArray: any[];
    wordPadding: number;
    fullScreenTextSize: number;
    predefinedTotalItemIndexes: AnswerType[];
    isPredefinedIndex: (answerIndex: AnswerType) => boolean;
    allowPredefine: (itemsIndex: AnswerType) => boolean;
    handlePredefinedTotalItemIndexes: (answerIndex: number | null) => (e: React.MouseEvent) => void;
};
export {};
