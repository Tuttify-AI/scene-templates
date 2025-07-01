import { getNumber } from '../shared/utils';

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
  const answer = [];
  for (let i = 0; i < answer_arr.length; i++) {
    const index = answer_arr[i];
    if (!index && typeof index !== 'number') {
      return false;
    } else if (typeof index === 'number') answer[i] = all_arr[index];
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
    return operand === '+'
      ? getNumber(first) + getNumber(second) === getNumber(result)
      : getNumber(first) - getNumber(second) === getNumber(result);
  } else return false;
}
export function checkMultiCorrectResult(
  numbers: number[],
  result: number | null,
  operand: string,
  secondOperand: string,
  thirdOperand: string
) {
  let first;
  let second;
  let third;
  if (numbers.length >= 2 && result) {
    first =
      operand === '+' ? getNumber(numbers[0]) + getNumber(numbers[1]) : getNumber(numbers[0]) - getNumber(numbers[1]);
  }
  if (numbers.length >= 3 && result && first) {
    second = secondOperand === '+' ? first + getNumber(numbers[2]) : first - getNumber(numbers[2]);
  }
  if (numbers.length === 4 && result && second) {
    third = thirdOperand === '+' ? second + getNumber(numbers[3]) : second - getNumber(numbers[3]);
  }
  return third
    ? third === getNumber(result)
    : second
    ? second === getNumber(result)
    : first
    ? first === getNumber(result)
    : false;
}
