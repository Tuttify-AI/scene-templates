import { SceneProps } from '../../shared/types';
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
    selectionNumbersWidth: number;
    answerNumbersWidth: number;
    answerArray: any[];
    wordPadding: number;
    fullScreenTextSize: number;
    itemsCountArray: number[];
    itemImageWidth: number;
    itemImageHeight: number;
};
export {};
