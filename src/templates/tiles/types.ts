import { Parameters, Elements } from '../shared/types';

export type MultipleTilesElements<T = string | number> = Elements<T> & {
  title?: Parameters<T>;
  config?: Parameters<T>;
  background?: Parameters<T>;
};

export type Classes = {
  root?: string;
  tile?: string;
  slide?: string;
  tileImage?: string;
  tileText?: string;
  fullscreenImage?: string;
  fullscreenText?: string;
};
