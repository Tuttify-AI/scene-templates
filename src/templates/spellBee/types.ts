import { Parameters, Elements, SceneValue } from '../shared/types';

export type SpellBeeConfig<T = SceneValue> = {
  word: T;
  additional_letters: T;
  letters_total: T;
  lock_correct_selection: T;
  highlight_correct_selection: T;
  highlight_incorrect_selection: T;
};

export type SpellBeeElements<T = string | number> = Elements<T> & {
  title?: Parameters<T>;
  config?: SpellBeeConfig<T>;
  image?: Parameters<T>;
  background?: Parameters<T>;
  selection_text?: Parameters<T>;
  answer_text?: Parameters<T>;
};

export type Classes = {
  root?: string;
};
