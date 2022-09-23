import { DefaultType } from '../shared/types';

export function checkArray(answerArr: DefaultType[]) {
  if (!answerArr?.length) {
    return false;
  }
  for (let i = 0; i < answerArr.length; i++) {
    const index = answerArr[i];
    if (!index && typeof index != 'number') {
      return false;
    }
  }
  return true;
}

export function checkCorrectWord(answerArr: DefaultType[], allArr: string[], word: string) {
  const answer = [] as string[];
  for (let i = 0; i < answerArr.length; i++) {
    const index = answerArr[i];
    if (!index && typeof index != 'number') {
      return false;
    } else if (typeof index === 'number') answer[i] = allArr[index];
  }
  return answer.join() === word;
}

export function getAnswer(answerArr: DefaultType[], allArr: string[], useArray = false) {
  const answer = [] as string[];
  for (let i = 0; i < answerArr.length; i++) {
    const index = answerArr[i];
    if (typeof index === 'number') answer[i] = allArr[index];
  }
  return answer.join(useArray ? ' ' : '');
}
