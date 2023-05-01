import { DefaultType } from '../shared/types';
import { checkArray, checkCorrectWord } from '../shared/utils';

export function getAnswer(answerArr: DefaultType[], allArr: string[], useArray = false) {
  const answer = [] as string[];
  for (let i = 0; i < answerArr.length; i++) {
    const index = answerArr[i];
    if (typeof index === 'number') answer[i] = allArr[index];
  }
  return answer.join(useArray ? ' ' : '');
}

export { checkArray, checkCorrectWord };
