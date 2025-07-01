import { Mods } from './types';

export const isInViewport = (el: HTMLElement | null) => {
  const rect = el?.getBoundingClientRect();
  return (
    !!rect &&
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

export const calc = (x: number, y: number) => ({ x: x - window.innerWidth / 2, y: y - window.innerHeight / 2 });

export const transition =
  ({ modY, modX }: Mods = { modX: 10, modY: 10 }) =>
  (x: number, y: number) =>
    `translate3d(${x / modX}px,${y / modY}px,0)`;

export const clsx = (...args: unknown[]) => args.filter(a => typeof a === 'string').join(' ');
