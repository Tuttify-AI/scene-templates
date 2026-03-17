import React from 'react';
import { ActiveElementData, Parameters, SceneProps } from '../types';
import { useActions } from './index';
import SwiperClass from 'swiper/types/swiper-class';
type Params = Pick<SceneProps, 'editMode' | 'previewMode' | 'onSet' | 'values'> & {
    onActiveElementClick?: SceneProps['onActiveElementClick'];
    handleAddTile: (e: React.MouseEvent<HTMLButtonElement>) => void;
    tiles: string[];
    handleClick: ReturnType<typeof useActions>['handleClick'];
    defaultImages?: string[];
    defaultImageKey?: string;
    params?: Partial<FullTileParams>;
    swiper?: SwiperClass | null;
    slidesPerViewFromConfig?: number;
    slidesPerColumn?: number;
};
type FullTileParams = {
    imageBackground: string;
    imageUrl: string;
    text: string;
    textColor: string;
    imageHoverScale: number;
    imageHeight: number;
    slidesPerColumn: number;
    textSize: number;
    slidesPerViewFromConfig: number;
    textPadding: number;
};
type FullElementState = {
    key: string;
    value: string;
    background?: string;
    color?: string;
};
export default function useTiles({ editMode, previewMode, onActiveElementClick, onSet, values, tiles, handleClick, defaultImages, defaultImageKey, params, swiper, }: Params): {
    onSetFullTile: (k: string, index: number, parameter?: keyof Parameters) => (e: React.MouseEvent<HTMLElement>) => void;
    handleFullImageClick: (k?: string, parameter?: keyof Parameters) => (e: React.MouseEvent<HTMLElement>) => void;
    handleDeleteTile: (k: string | string[], e?: React.MouseEvent<HTMLButtonElement>) => void;
    fullTile: {
        image: FullElementState;
        text: FullElementState;
    };
    getTileData: (k: any) => ActiveElementData;
    parsedFullImageKey: string;
    parsedFullTextKey: string;
    DEFAULT_PARAMS: FullTileParams;
    slideHeight: number;
    textSize: number;
    textMargin: number;
    textTranslateY: string;
};
export {};
