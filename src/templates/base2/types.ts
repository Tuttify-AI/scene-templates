import { Parameters, Elements } from '../shared/types';

export type BaseSceneElements<T = string | number> = Elements<T> & {
  background?: Parameters<T>;
  previewImage1?: Parameters<T>;
  previewImage2?: Parameters<T>;
  previewImage3?: Parameters<T>;
  circle1?: Parameters<T>;
  circle2?: Parameters<T>;
  circle3?: Parameters<T>;
  cloudImage1?: Parameters<T>;
  cloudImage2?: Parameters<T>;
  ball1?: Parameters<T>;
  ball2?: Parameters<T>;
  ball3?: Parameters<T>;
  ball4?: Parameters<T>;
  ball5?: Parameters<T>;
  ball6?: Parameters<T>;
  ball7?: Parameters<T>;
};

export type Classes = {
  root?: string;
  previewImage1?: string;
  previewImage2?: string;
  previewImage3?: string;
  circle1?: string;
  circle2?: string;
  circle3?: string;
  cloudImage1?: string;
  cloudImage2?: string;
  ball1?: string;
  ball2?: string;
  ball3?: string;
  ball4?: string;
  ball5?: string;
  ball6?: string;
  ball7?: string;
};
