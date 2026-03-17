import { DefaultType, SceneProps } from '../../shared/types';
type Params = Pick<SceneProps, 'values' | 'previewMode' | 'editMode' | 'onSet'>;
export default function useParams({ values, previewMode, editMode, onSet }: Params): {
    selectionFontSize: number;
    selectionContainerHeight: number;
    wordContainerHeight: number;
    wordFontSize: number;
    resultNumber: null;
    DEFAULTS: {
        selectionTextSize: number;
        selectionWordSize: number;
        wordTextSize: number;
        wordSize: number;
        fullScreenTextSize: number;
        textPadding: number;
    };
    showSceneActionElements: boolean | undefined;
    predefinedValues: {
        numbers: DefaultType[];
        resultNumber: null;
    };
    wordPadding: number;
    fullScreenTextSize: number;
    mathOperand: string;
    additionalNumbersArray: number[];
    showQuestionMark: boolean;
    mathSecondOperand: string;
    mathThirdOperand: string;
    operationNumbersArray: DefaultType[];
};
export {};
