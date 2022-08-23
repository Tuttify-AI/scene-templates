import { Parameters, Elements, SceneValue } from '../shared/types';

export type MathBaseConfig<T = SceneValue> = {
  right_number: T;
  left_number: T;
  result: T;
  math_operand: T;
  additional_items: T;
  show_question_mark: T;
};

export type CountingElements<T = string | number> = Elements<T> & {
  title?: Parameters<T>;
  config?: MathBaseConfig<T>;
  image?: Parameters<T>;
  background?: Parameters<T>;
  selection_text?: Parameters<T>;
  answer_text?: Parameters<T>;
};

export type Classes = {
  root?: string;
};
