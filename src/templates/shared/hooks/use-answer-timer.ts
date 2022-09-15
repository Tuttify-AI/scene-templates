import { useCallback, useEffect, useState } from 'react';

export default function useAnswerTimer(disable = false) {
  const [userAnswerTime, setUserAnswerTime] = useState(0);
  const [totalSceneTime, setTotalSceneTime] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timer>();

  const startTimer = useCallback(() => {
    const timer = setInterval(() => {
      setUserAnswerTime(prevState => ++prevState);
      setTotalSceneTime(prevState => ++prevState);
    }, 1000);
    setTimer(timer);
    return timer;
  }, []);

  useEffect(() => {
    if (!disable) {
      startTimer();
    }
  }, [startTimer, disable]);

  const clearTimer = useCallback(() => {
    setUserAnswerTime(0);
    setTotalSceneTime(0);
    timer && clearInterval(timer);
    startTimer();
  }, [timer, startTimer]);

  const getUserAnswerTime = useCallback(() => {
    const time = userAnswerTime;
    setUserAnswerTime(0);
    return {
      time,
      total: totalSceneTime,
    };
  }, [userAnswerTime, totalSceneTime]);

  return { userAnswerTime, clearTimer, getUserAnswerTime };
}
