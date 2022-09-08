import { Image, Animation } from '../shared/types';

import cloudImage from './assets/cloud';
import previewImage1 from './assets/access-pic-2';
import previewImage2 from './assets/access-pic-1';
import previewImage3 from './assets/main-pic';

export const IMAGES: Image[] = [
  {
    name: 'previewImage1',
    defaultImage: previewImage1,
    isPreviewImage: true,
    mods: { modX: 15, modY: 15 },
    transform: { translateX: '-33%', translateY: '-40%' },
  },
  {
    name: 'previewImage2',
    defaultImage: previewImage2,
    isPreviewImage: true,
    mods: { modX: 15, modY: 15 },
    transform: { translateX: '25%', translateY: '-100%' },
  },
  {
    name: 'previewImage3',
    defaultImage: previewImage3,
    isPreviewImage: true,
    mods: { modX: 15, modY: 15 },
    transform: { translateX: '-120%', translateY: '-20%' },
  },
  {
    name: 'cloudImage1',
    defaultImage: cloudImage,
    isPreviewImage: false,
    mods: { modX: 10, modY: 10 },
    transform: { translateX: '-242%', translateY: '-164%' },
  },
  {
    name: 'cloudImage2',
    defaultImage: cloudImage,
    isPreviewImage: false,
    mods: { modX: 10, modY: 10 },
    transform: { translateX: '258%', translateY: '108%' },
  },
];

export const SHAPES: Animation[] = [
  {
    name: 'circle1',
    mods: { modX: 10, modY: 10 },
  },
  {
    name: 'circle2',
    mods: { modX: 10, modY: 10 },
  },
  {
    name: 'circle3',
    mods: { modX: 10, modY: 10 },
  },
  {
    name: 'ball1',
    mods: { modX: 8, modY: 8 },
  },
  {
    name: 'ball2',
    mods: { modX: 7, modY: 8 },
  },
  {
    name: 'ball3',
    mods: { modX: 15, modY: 15 },
  },
  {
    name: 'ball4',
    mods: { modX: 20, modY: 20 },
  },
  {
    name: 'ball5',
    mods: { modX: 7, modY: 8 },
  },
  {
    name: 'ball6',
    mods: { modX: 12, modY: 12 },
  },
  {
    name: 'ball7',
    mods: { modX: 10, modY: 10 },
  },
];
