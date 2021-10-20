import React from 'react';
import { Parameters, Elements, SceneProps, AudioElements } from '../types';

type Params = {
  disabled?: boolean;
  onClick: SceneProps['onClick'];
  getValue: (element: keyof Elements, parameter: keyof Parameters) => unknown;
  audios?: AudioElements
};

export default function useActions({ disabled, getValue, onClick, audios }: Params) {

  const handleClick = (key: keyof Elements) => async (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClick && onClick(`${key}`, e.currentTarget);
    if (getValue(key, 'sound') && !disabled) {
      if (audios) {
        await Promise.all(Object.keys(audios).map( async (audio) => {
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
        }));
      }
    }
  };

  return {
    handleClick,
  };
}
