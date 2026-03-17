import { Parameters, Elements } from '../shared/types';
export type Quiz1SceneElements<T = string | number> = Elements<T> & {
    title?: Parameters<T>;
    background?: Parameters<T>;
    question?: Parameters<T>;
    answer1?: Parameters<T>;
    answer2?: Parameters<T>;
    answer3?: Parameters<T>;
    answer4?: Parameters<T>;
    answer5?: Parameters<T>;
    answer6?: Parameters<T>;
};
export type Classes = {
    root?: string;
    questionRoot?: string;
    questionImageContainer?: string;
    questionText?: string;
    questionImage?: string;
    answersRoot?: string;
    answerRoot?: string;
    answer?: string;
    answerImageContainer?: string;
    answerText?: string;
    answerImage?: string;
    fullScreenText?: string;
    fullScreenImage?: string;
};
