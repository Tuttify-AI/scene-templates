import React from 'react';
import { Parameters, Elements, SceneProps } from '../types';

type Params = {
  disabled?: boolean;
  onClick: SceneProps['onClick'];
  getValue: (element: keyof Elements, parameter: keyof Parameters) => unknown;
};

export default function useActions({ disabled, getValue, onClick }: Params) {
  const handleAudio = async (url: string) => {
    try {
      const audio = new Audio(url);
      return await audio?.play();
    } catch (e) {
      return null;
    }
  };

  const handleClick = (key: keyof Elements) => async (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClick && onClick(`${key}`, e.currentTarget);
    if (getValue(key, 'sound') && !disabled) {
      await handleAudio(`${getValue(key, 'sound')}`);
    }
  };

  return {
    handleClick,
  };
}
