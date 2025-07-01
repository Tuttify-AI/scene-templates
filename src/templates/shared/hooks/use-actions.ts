import React, { useCallback } from 'react';
import { ActiveElementData, AudioElements, Elements, Parameters, SceneProps } from '../types';

type Params = {
  disabled?: boolean;
  onClick?: SceneProps['onClick'];
  onActiveElementClick?: SceneProps['onActiveElementClick'];
  getValue: (element: keyof Elements, parameter: keyof Parameters) => unknown;
  audios?: AudioElements;
};

export default function useActions({ disabled, getValue, onClick, audios, onActiveElementClick }: Params) {
  const handleClick = useCallback(
    (key: keyof Elements, data?: ActiveElementData) => async (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      // if data is passed - implementing onActiveElementClick
      onActiveElementClick && data && onActiveElementClick(`${key}`, data);
      onClick && onClick(`${key}`, e.currentTarget);
      if (getValue(key, 'sound') && !disabled) {
        if (audios) {
          await Promise.all(
            Object.keys(audios).map(async audio => {
              const currentAudio = audios?.[audio]?.current;
              if (currentAudio) {
                if (audio === key) {
                  currentAudio.currentTime = 0;
                  await currentAudio.play();
                } else {
                  currentAudio.currentTime = 0;
                  await currentAudio.pause();
                }
              }
            })
          );
        }
      }
    },
    [audios, disabled, getValue, onClick, onActiveElementClick]
  );

  return {
    handleClick,
  };
}
