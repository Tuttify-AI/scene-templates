import { Parameters, Elements } from '../shared/types';

export type BaseSceneElements<T = string | number> = Elements<T> & {
  background?: Parameters<T>;
  image?: Parameters<T>;
  button?: Parameters<T>;
  title?:  Parameters<T>;
};

export type Classes = {
  root?: string;
  image?: string;
  button?: string;
  title?: string;
};
