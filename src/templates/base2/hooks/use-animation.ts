import React, { useCallback, useState } from 'react';
import { to, useSpring } from 'react-spring';
import { BaseSceneElements } from '../types';
import { calc } from '../../shared/utils';
import { useScroll } from '../../shared/hooks';

type Params = {
  element: HTMLElement | null;
  disabled?: boolean;
};

export default function useAnimation({ element, disabled }: Params) {
  const { isVisible } = useScroll(element);
  const [hovered, setHovered] = useState<keyof BaseSceneElements | ''>('');

  const [{ x, y }, api] = useSpring(
    {
      x: 0,
      y: 0,
      config: { mass: 20, tension: 400, friction: 100 },
    },
    []
  );

  const [{ opacity, translateY }] = useSpring(
    {
      translateY: isVisible ? 0 : 25,
      opacity: isVisible ? 1 : 0,
      config: { mass: 1, tension: 1000, friction: 200 },
    },
    [isVisible, hovered]
  );

  const createScale = useCallback(
    (title: keyof BaseSceneElements) => ({
      from: {
        scale: 1,
      },
      to: {
        scale: !disabled && hovered === title ? 1.1 : 1,
      },
    }),
    [hovered, disabled]
  );

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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const getScale = (key: keyof BaseSceneElements) => useSpring(createScale(key));

  return {
    opacity: disabled ? undefined : opacity,
    translateY: disabled ? undefined : translateY,
    handleMouseMove,
    resetAnimatedProps,
    getAnimationsStyle,
    handleHover,
    clearHover,
    getScale,
  };
}
