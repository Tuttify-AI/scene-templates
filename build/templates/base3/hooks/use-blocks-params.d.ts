/// <reference types="react" />
import { SceneProps } from '../../shared/types';
type Params = Pick<SceneProps, 'values' | 'previewMode' | 'editMode'>;
export default function useBlocksParams({ values, previewMode, editMode }: Params): {
    DEFAULTS: {
        textSize: number;
        top: number;
        left: number;
        textPadding: number;
        imageHoverScale: number;
        blockHeight: number;
        blockWidth: number;
        maxBlocks: number;
    };
    slidesPerView: number;
    showSceneActionElements: boolean | undefined;
    blocks: {
        id: string;
        ref: import("react").RefObject<unknown>;
    }[];
    generalBlocksLimit: number;
    sliderLocked: boolean;
    allowDeleteTile: boolean | undefined;
    allowAddBlock: boolean | undefined;
    showNavigation: boolean;
};
export {};
