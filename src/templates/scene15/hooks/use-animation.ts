import React, { useCallback, useState } from 'react';
import { to, useSpring } from 'react-spring';
import { BaseSceneElements } from '../types';
import { calc } from '../../shared/utils';

type Params = {
  disabled?: boolean;
};

export default function useAnimation({ disabled }: Params) {
  const [hovered, setHovered] = useState<keyof BaseSceneElements | ''>('');
  const [{ x, y }, api] = useSpring(
    {
      x: 0,
      y: 0,
      config: { mass: 20, tension: 400, friction: 100 },
    },
    []
  );
  const scale = useSpring({
    from: {
      scale: 1,
    },
    to: {
      scale: !disabled && ['image', 'title'].includes(hovered as string) ? 1.1 : 1,
    },
  });

  const handleMouseMove = ({ clientX, clientY }: React.MouseEvent<HTMLDivElement>) => {
    if (!disabled) {
      api.start(calc(clientX, clientY));
    }
  };

  const resetAnimatedProps = () => api.start({ x: 0, y: 0 });

  const getAnimationsStyle = useCallback(
    (func: (x: number, y: number) => string) => ({
      transform: disabled ? '' : to([x, y], func),
    }),
    [disabled, x, y]
  );

  const handleHover = (key: keyof BaseSceneElements) => () => setHovered(key);

  const clearHover = () => setHovered('');

  return {
    scale,
    handleMouseMove,
    resetAnimatedProps,
    getAnimationsStyle,
    handleHover,
    clearHover,
  };
}
