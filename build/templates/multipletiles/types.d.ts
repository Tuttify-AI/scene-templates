import { Parameters, Elements } from '../shared/types';
export type BaseSceneElements<T = string | number> = Elements<T> & {
    title?: Parameters<T>;
};
export type Classes = {
    root?: string;
    tile?: string;
    tileImage?: string;
    tileText?: string;
};
