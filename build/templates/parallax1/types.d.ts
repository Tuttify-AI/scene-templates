import { Elements, Mods, Parameters } from '../shared/types';
export type ParallaxSceneElements<T = string | number> = Elements<T> & {
    background1?: Parameters<T>;
    background2?: Parameters<T>;
    image1?: Parameters<T>;
    image2?: Parameters<T>;
    image3?: Parameters<T>;
    image4?: Parameters<T>;
};
export type Classes = {
    background1?: string;
    background2?: string;
    image1?: string;
    image2?: string;
    image3?: string;
    image4?: string;
};
export type Image = {
    name: string;
    defaultImage?: string;
    isStatic?: boolean;
    mods?: Mods;
    scale?: number;
};
