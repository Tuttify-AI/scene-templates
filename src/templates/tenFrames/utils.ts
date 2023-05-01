import { getNumber, checkCorrectWord, checkArray, getOperandResult } from '../shared/utils';

export function checkMultiCorrectResult(
  numbers: number[],
  result: number | null,
  firstOperand: string,
  secondOperand: string,
  thirdOperand: string
) {
  const [number1, number2, number3, number4] = numbers.map(number => getNumber(number, 0) || 0);
  const first = getOperandResult(number1, number2, firstOperand);
  const second = getOperandResult(first, number3, secondOperand);
  const third = getOperandResult(second, number4, thirdOperand);
  return third === getNumber(result, 0);
}

export { checkArray, checkCorrectWord };
