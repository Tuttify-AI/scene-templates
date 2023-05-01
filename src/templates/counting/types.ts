import { Parameters, Elements, SceneValue } from '../shared/types';

export type CountingConfig<T = SceneValue> = {
  items: T;
  additional_items: T;
  items_total: T;
  lock_correct_selection: T;
  highlight_correct_selection: T;
  highlight_incorrect_selection: T;
};

export type CountingElements<T = string | number> = Elements<T> & {
  title?: Parameters<T>;
  config?: CountingConfig<T>;
  image?: Parameters<T>;
  background?: Parameters<T>;
  selection_text?: Parameters<T>;
  answer_text?: Parameters<T>;
};

export type Classes = {
  root?: string;
};
