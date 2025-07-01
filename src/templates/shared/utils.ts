import { Elements, Mods } from './types';

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

export const deleteElement = (values: Elements, elements: string[], key: string) => Object.keys(values || {})
  .filter(item => !item.includes(key))
  .reduce((res, parameter) => {
    if (values) {
      const newIndex = elements.filter(el => el !== key).findIndex(el => parameter.endsWith(el)) + 1;
      if (newIndex) {
        const parameterStr = parameter.replace(/\d+/gi, '');
        res[`${parameterStr}${newIndex}`] = {
          ...values[parameter],
          title: {
            ...values[parameter].title,
            title: values[parameter].title.title.replace(/\d+/g, `${newIndex}`),
          },
        };
      } else {
        res[parameter] = values[parameter];
      }
    }
    return res;
  }, {} as Elements);
