import React, { useCallback } from 'react';
import { ActiveElementData, Elements, Parameters, SceneProps } from '../types';
import { useAudios } from './';

type Params = {
  disabled?: boolean;
  onClick?: SceneProps['onClick'];
  onActiveElementClick?: SceneProps['onActiveElementClick'];
  handlePauseAll?: ReturnType<typeof useAudios>['handlePauseAll'];
  onComplete?: SceneProps['onComplete'];
};

type OnClickData = {
  data?: ActiveElementData;
  parameter?: keyof Parameters;
};

const DEFAULT_DATA = {};

export default function useActions({ disabled, onClick, onActiveElementClick, handlePauseAll, onComplete }: Params) {
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
    },
    [onComplete]
  );

  return {
    handleClick,
    handleComplete,
  };
}
