import { useCallback, useEffect, useState } from 'react';

export default function useAnswerTimer() {
  const [userAnswerTime, setUserAnswerTime] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timer>();

  const startTimer = () => {
    const timer = setInterval(() => {
      setUserAnswerTime(prevState => ++prevState);
    }, 1000);
    setTimer(timer);
    return timer;
  };

  useEffect(() => {
    startTimer();
  }, []);

  const clearTimer = useCallback(() => {
    setUserAnswerTime(0);
    timer && clearInterval(timer);
    startTimer();
  }, [timer]);

  const getUserAnswerTime = useCallback(() => {
    const time = userAnswerTime;
    clearTimer();
    return time;
  }, [clearTimer, userAnswerTime]);

  return { userAnswerTime, clearTimer, getUserAnswerTime };
}
