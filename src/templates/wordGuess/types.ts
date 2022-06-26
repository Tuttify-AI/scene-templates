import { Parameters, Elements, SceneValue } from '../shared/types';

export type GuessWordConfig<T = SceneValue> = {
  word: T;
  additional_letters: T;
  letters_array: T;
};

export type GuessWordElements<T = string | number> = Elements<T> & {
  title?: Parameters<T>;
  config?: GuessWordConfig<T>;
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
