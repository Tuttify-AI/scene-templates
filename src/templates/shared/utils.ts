import { Elements, GetValue, Mods, Parameters, TemplateParameter } from './types';

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

export const deleteElement = (values: Elements | undefined, elements: string[], key: string | string[]) =>
  Object.keys(values || {})
    .filter(item => (Array.isArray(key) ? !key.some(k => item.includes(k)) : !item.includes(key)))
    .reduce((res, parameter) => {
      if (values) {
        const newIndex =
          elements
            .filter(el => (Array.isArray(key) ? !key.includes(el) : el !== key))
            .findIndex(el => parameter.endsWith(el)) + 1;
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

export const getElementId = (id: string, previewMode?: boolean) => `${id}${previewMode ? '-preview' : ''}`;

export const getNumber = (value: unknown, defaultValue = 1) =>
  !Number.isNaN(Number(value)) ? Number(value) : defaultValue;

export const getElementValue =
  <T>(values?: Elements, parameters?: Elements<TemplateParameter>): GetValue<T> =>
  (element: keyof Elements<T>, parameter: keyof Parameters<T>) =>
    values?.[element]?.[parameter]?.value ?? parameters?.[element]?.[parameter]?.default_value;

export function range(start: number, end: number) {
  return Array(end - start + 1)
    .fill('')
    .map((_, idx) => start + idx);
}

export const randomizeString = (str: unknown) =>
  `${str}`
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');

export const randomizeArray = (arr: string[]) => arr.sort(() => Math.random() - 0.7);

export const arrayIsEqual = (arr1?: unknown[], arr2?: unknown[]) =>
  arr1?.slice().sort().join('') === arr2?.slice().sort().join('');
