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
    if (!index && typeof index != 'number') {
      return false;
    } else if (typeof index === 'number') answer[i] = all_arr[index];
  }
  return answer.join() === word;
}

export function checkCorrectResult(answer_arr: (number | null)[], answerValueArray: (number | string | null)[]) {
  const first = answer_arr[0] && answerValueArray[answer_arr[0]];
  const second = answer_arr[2] && answerValueArray[answer_arr[2]];
  const result = answer_arr[4] && answerValueArray[answer_arr[4]];
  if (first && second && result && answer_arr[1] && answerValueArray[answer_arr[1]] === '+') {
    return +first + +second === result;
  } else if (first && second) {
    return +first - +second === result;
  } else return false;
}
