import { Parameters, Elements, SceneValue } from '../shared/types';

export type GuessWordConfig<T = SceneValue> = {
  word: T;
  additional_letters: T;
  letters_total: T;
};

export type GuessWordElements<T = string | number> = Elements<T> & {
  title?: Parameters<T>;
  config?: GuessWordConfig<T>;
  background?: Parameters<T>;
  selection_text?: Parameters<T>;
  answer_text?: Parameters<T>;
};

export type Classes = {
  root?: string;
};
