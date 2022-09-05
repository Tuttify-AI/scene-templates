import { DefaultType } from '../shared/types';

export function checkArray(answer_arr: DefaultType[]) {
  if (!answer_arr?.length) {
    return false;
  }
  for (let i = 0; i < answer_arr.length; i++) {
    const index = answer_arr[i];
    if (!index && typeof index != 'number') {
      return false;
    }
  }
  return true;
}

export function checkCorrectWord(answer_arr: DefaultType[], all_arr: string[], word: string) {
  const answer = [];
  for (let i = 0; i < answer_arr.length; i++) {
    const index = answer_arr[i];
    if (!index && typeof index != 'number') {
      return false;
    } else if (typeof index === 'number') answer[i] = all_arr[index];
  }
  return answer.join() === word;
}

export function getAnswer(answer_arr: DefaultType[], all_arr: string[]) {
  const answer = [];
  for (let i = 0; i < answer_arr.length; i++) {
    const index = answer_arr[i];
    if (typeof index === 'number') answer[i] = all_arr[index];
  }
  return answer.join('');
}
