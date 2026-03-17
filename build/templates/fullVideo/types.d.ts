import { Parameters, Elements } from '../shared/types';
export type BaseSceneElements<T = string | number> = Elements<T> & {
    background?: Parameters<T>;
    video?: Parameters<T>;
};
export type Classes = {
    root?: string;
    image?: string;
};
