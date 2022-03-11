import { Parameters, Elements } from '../shared/types';

export type Quiz1SceneElements<T = string | number> = Elements<T> & {
  title?: Parameters<T>;
  background?: Parameters<T>;
  question?: Parameters<T>;
  answer1?: Parameters<T>;
  answer2?: Parameters<T>;
  answer3?: Parameters<T>;
  answer4?: Parameters<T>;
};

export type Classes = {
  root?: string;
  questionRoot?: string;
  questionImageContainer?: string;
  questionText?: string;
  questionImage?: string;
};
