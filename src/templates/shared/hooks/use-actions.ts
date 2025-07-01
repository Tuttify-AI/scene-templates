import React, { useCallback } from 'react';
import { ActiveElementData, Elements, Parameters, SceneProps } from '../types';
import { useAudios } from './';
import useAnswerTimer from './use-answer-timer';

type Params = {
  disabled?: boolean;
  onClick?: SceneProps['onClick'];
  onActiveElementClick?: SceneProps['onActiveElementClick'];
  handlePauseAll?: ReturnType<typeof useAudios>['handleElementAudio'];
  clearTimer?: ReturnType<typeof useAnswerTimer>['clearTimer'];
  onComplete?: SceneProps['onComplete'];
  onSceneSolved?: SceneProps['onSceneSolved'];
};

export type OnClickData = {
  data?: ActiveElementData;
  parameter?: keyof Parameters;
};

const DEFAULT_DATA = {};

export default function useActions({
  disabled,
  onClick,
  onActiveElementClick,
  handlePauseAll,
  onComplete,
  onSceneSolved,
  clearTimer,
}: Params) {
  const handleClick = useCallback(
    (key: keyof Elements, { data, parameter = 'sound' }: OnClickData = DEFAULT_DATA) =>
      async (e?: React.MouseEvent<HTMLElement>) => {
        e?.stopPropagation();
        // if data is passed - implementing onActiveElementClick
        onActiveElementClick && data && onActiveElementClick(`${key}`, data);
        onClick && e?.currentTarget && onClick(`${key}`, e?.currentTarget);
        if (!disabled && handlePauseAll) {
          await handlePauseAll(key, parameter);
        }
      },
    [disabled, onClick, onActiveElementClick, handlePauseAll]
  );

  const handleComplete = useCallback(
    (key: keyof Elements, { data }: OnClickData = DEFAULT_DATA) => {
      onComplete && data && onComplete(`${key}`, data);
      clearTimer && clearTimer();
    },
    [onComplete, clearTimer]
  );

  const handleSceneSolved = useCallback(
    (key: keyof Elements, { data }: OnClickData = DEFAULT_DATA) => {
      onSceneSolved && data && onSceneSolved(`${key}`, data);
    },
    [onSceneSolved]
  );

  return {
    handleClick,
    handleComplete,
    handleSceneSolved,
  };
}
