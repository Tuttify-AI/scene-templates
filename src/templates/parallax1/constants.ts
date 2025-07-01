import { Animation } from '../shared/types';
import { Image } from './types';
import image1 from './assets/image1';
import image2 from './assets/image2';
import image3 from './assets/image3';
import image4 from './assets/image4';

export const ANIMATIONS: Animation[] = [
  {
    name: 'background1',
    mods: { modX: 20, modY: 20 },
  },
];

export const IMAGES: Image[] = [
  {
    name: 'image1',
    defaultImage: image1,
    isStatic: true,
    mods: { modX: 15, modY: 15 },
  },
  {
    name: 'image2',
    defaultImage: image2,
    isStatic: false,
    mods: { modX: 15, modY: 15 },
  },
  {
    name: 'image3',
    defaultImage: image3,
    isStatic: true,
    mods: { modX: 15, modY: 15 },
  },
  {
    name: 'image4',
    defaultImage: image4,
    isStatic: false,
    mods: { modX: 15, modY: 15 },
    scale: 1.03,
  },
];
