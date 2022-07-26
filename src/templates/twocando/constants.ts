import { Image } from './types';
import image1 from './assets/image1';
import image2 from './assets/image2';
import image3 from './assets/image3';
import image4 from './assets/image4';
import background from './assets/background';

export const ANIMATIONS: Image[] = [
  {
    name: 'background',
    mods: { modX: -40, modY: 40 },
    defaultImage: background,
  },
  {
    name: 'image4',
    defaultImage: image4,
    isStatic: false,
    mods: { modX: 10, modY: 150 },
  },
];

export const IMAGES: Image[] = [
  {
    name: 'image1',
    defaultImage: image1,
    isStatic: false,
    mods: { modX: 15, modY: 15 },
  },
  {
    name: 'image2',
    defaultImage: image2,
    isStatic: false,
    mods: { modX: -2, modY: 15 },
  },
  {
    name: 'image3',
    defaultImage: image3,
    isStatic: false,
    mods: { modX: 3, modY: 15 },
  },
];
