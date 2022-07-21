import { Image } from './types';
import image1 from './assets/image1';
import image2 from './assets/image2';
import image3 from './assets/image3';
import image4 from './assets/image4';
import image5 from './assets/image5';
import image6 from './assets/image6';
import image7 from './assets/image7';
import image8 from './assets/image8';
import background from './assets/background';

export const ANIMATIONS: Image[] = [
  {
    name: 'background1',
    mods: { modX: -40, modY: 40 },
    defaultImage: background,
  },
  {
    name: 'image4',
    isStatic: false,
    defaultImage: image4,
    mods: { modX: 20, modY: 20 },
  },
];

export const IMAGES: Image[] = [
  {
    name: 'image1',
    defaultImage: image1,
    isStatic: true,
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
    isStatic: true,
  },
  {
    name: 'image5',
    defaultImage: image5,
    isStatic: false,
    mods: { modX: 2, modY: 15 },
  },
  {
    name: 'image6',
    defaultImage: image6,
    isStatic: true,
  },
  {
    name: 'image7',
    defaultImage: image7,
    isStatic: false,
    mods: { modX: -30, modY: 30 },
  },
  {
    name: 'image8',
    defaultImage: image8,
    isStatic: false,
    mods: { modX: 35, modY: 40 },
  },
  {
    name: 'image9',
    defaultImage: image7,
    isStatic: false,
    mods: { modX: 36, modY: -36 },
  },
  {
    name: 'image10',
    defaultImage: image8,
    isStatic: false,
    mods: { modX: -32, modY: 36 },
  },
];
