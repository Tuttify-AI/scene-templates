import { Parameters, Elements } from '../shared/types';
export type BaseSceneElements<T = string | number> = Elements<T> & {
    title?: Parameters<T>;
    description?: Parameters<T>;
    background?: Parameters<T>;
    shape1?: Parameters<T>;
    shape2?: Parameters<T>;
    shape3?: Parameters<T>;
    shape4?: Parameters<T>;
    shape5?: Parameters<T>;
    image?: Parameters<T>;
};
export type Classes = {
    root?: string;
    title?: string;
    description?: string;
    shape1?: string;
    shape2?: string;
    shape3?: string;
    shape4?: string;
    shape5?: string;
    image?: string;
};
