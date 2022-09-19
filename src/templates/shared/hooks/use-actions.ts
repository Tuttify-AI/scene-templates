import React, { useCallback } from 'react';
import { ActiveElementData, Elements, Parameters, SceneProps } from '../types';
import { useAudios } from './';
import useAnswerTimer from './use-answer-timer';

type Params = {
  disabled?: boolean;
  onClick?: SceneProps['onClick'];
  onActiveElementClick?: SceneProps['onActiveElementClick'];
  clearTimer?: ReturnType<typeof useAnswerTimer>['clearTimer'];
  onComplete?: SceneProps['onComplete'];
  onSceneSolved?: SceneProps['onSceneSolved'];
  pauseAudios?: ReturnType<typeof useAudios>['pauseAudios'];
  handleElementAudio?: ReturnType<typeof useAudios>['handleElementAudio'];
};

export type OnClickData = {
  data?: ActiveElementData;
  parameter?: keyof Parameters;
};

export type SoundData = {
  key?: keyof Elements;
  parameter?: keyof Parameters;
};

const DEFAULT_DATA = {};

export default function useActions({
  disabled,
  onClick,
  onActiveElementClick,
  onComplete,
  onSceneSolved,
  clearTimer,
  pauseAudios,
  handleElementAudio,
}: Params) {
  const handleClick = useCallback(
    (key: keyof Elements, { data, parameter = 'sound' }: OnClickData = DEFAULT_DATA) =>
      async (e?: React.MouseEvent<HTMLElement>) => {
        e?.stopPropagation();
        // if data is passed - implementing onActiveElementClick
        onActiveElementClick && data && onActiveElementClick(`${key}`, data);
        onClick && e?.currentTarget && onClick(`${key}`, e?.currentTarget);
        if (!disabled && handleElementAudio) {
          await handleElementAudio(key, parameter);
        }
      },
    [disabled, onClick, onActiveElementClick, handleElementAudio]
  );

  const handleComplete = useCallback(
    async (key: keyof Elements, { data }: OnClickData = DEFAULT_DATA) => {
      onComplete && data && onComplete(`${key}`, data);
      clearTimer && clearTimer();
      pauseAudios && (await pauseAudios());
    },
    [onComplete, clearTimer, pauseAudios]
  );

  const handleSceneSolved = useCallback(
    async (key: keyof Elements, { data }: OnClickData = DEFAULT_DATA, soundData: SoundData = DEFAULT_DATA) => {
      onSceneSolved && data && onSceneSolved(`${key}`, data);
      handleElementAudio && soundData?.key && (await handleElementAudio(soundData.key, soundData.parameter));
    },
    [onSceneSolved, handleElementAudio]
  );

  return {
    handleClick,
    handleComplete,
    handleSceneSolved,
  };
}
