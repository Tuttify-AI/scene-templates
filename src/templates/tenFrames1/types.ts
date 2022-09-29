import { Parameters, Elements, SceneValue } from '../shared/types';

export type TenFramesBaseConfig<T = SceneValue> = {
  number_1: T;
  number_2: T;
  number_3: T;
  number_4: T;
  total_digits: T;
  math_operand: T;
  math_second_operand: T;
  math_third_operand: T;
  additional_items: T;
  show_question_mark: T;
};

export type CountingElements<T = string | number> = Elements<T> & {
  title?: Parameters<T>;
  config?: TenFramesBaseConfig<T>;
  image?: Parameters<T>;
  background?: Parameters<T>;
  selection_text?: Parameters<T>;
  answer_text?: Parameters<T>;
};

export type Classes = {
  root?: string;
};
