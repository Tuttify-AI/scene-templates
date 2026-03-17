import { SceneProps } from '../../shared/types';
import SwiperClass from 'swiper/types/swiper-class';
type Params = Pick<SceneProps, 'values' | 'previewMode' | 'editMode'> & {
    swiper?: SwiperClass | null;
};
export default function useTilesParams({ values, previewMode, editMode, swiper }: Params): {
    DEFAULTS: {
        textSize: number;
        textPadding: number;
        imageHoverScale: number;
        imageHeight: number;
        maxTiles: number;
    };
    slidesPerView: number;
    fullScreenTextSize: number;
    textMargin: number;
    textTranslateY: string;
    showSceneActionElements: boolean | undefined;
    textSize: number;
    tiles: string[];
    slideHeight: number;
    slidesPerColumn: number;
    tilesLimit: number;
    sliderLocked: boolean;
    allowDeleteTile: boolean | undefined;
    allowAddTile: boolean | undefined;
    showNavigation: boolean;
};
export {};
