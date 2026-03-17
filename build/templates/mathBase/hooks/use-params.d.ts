import { DefaultType, SceneProps } from '../../shared/types';
type Params = Pick<SceneProps, 'values' | 'previewMode' | 'editMode'>;
export default function useParams({ values, previewMode, editMode }: Params): {
    selectionFontSize: number;
    selectionContainerHeight: number;
    wordContainerHeight: number;
    wordFontSize: number;
    getFontSize: (originalFontSize: number, value?: DefaultType) => number;
    rightNumber: number | null;
    leftNumber: number | null;
    resultNumber: number | null;
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
        leftNumber: number | null;
        rightNumber: number | null;
        resultNumber: number | null;
    };
    wordPadding: number;
    fullScreenTextSize: number;
    mathOperand: string;
    additionalNumbersArray: number[];
    showQuestionMark: boolean;
};
export {};
