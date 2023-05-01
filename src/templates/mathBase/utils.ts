import { getNumber, getOperandResult } from '../shared/utils';

export function checkArray(answer_arr: (number | null)[]) {
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

export function checkCorrectWord(answer_arr: (number | null)[], all_arr: string[], word: string) {
  const answer = [] as string[];
  for (let i = 0; i < answer_arr.length; i++) {
    const index = answer_arr[i];
    if (!index && typeof index !== 'number') {
      return false;
    } else if (typeof (index as number | null) === 'number') answer[i] = all_arr[index];
  }
  return answer.join() === word;
}

export function checkCorrectResult(
  first: number | null,
  second: number | null,
  result: number | null,
  operand: string
) {
  if (first !== null && second !== null && result !== null) {
    return getOperandResult(getNumber(first), getNumber(second), operand) === getNumber(result);
  } else return false;
}
