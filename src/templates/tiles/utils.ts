import { IMAGES } from './constants';
import { Elements, Parameters } from '../shared/types';
export const createTile = (index: number, tileNumber: number, values: Parameters): Elements => ({
  [`tile${index}`]: {
    title: {
      ...values.title,
      title: `Tile No.${tileNumber}`,
      value: `Tile No.${tileNumber}`,
    },
    background: {
      ...values.background,
      value: '',
    },
    background_hover: {
      ...values.background_hover,
      value: '#5468E7',
    },
    url: {
      ...values.url,
      value: Math.floor(Math.random() * IMAGES.length).toString(),
    },
    sound: {
      ...values.sound,
      value: '',
    },
    text: {
      ...values.text,
      value: `Text`,
    },
    text_color: {
      ...values.text_color,
      value: '#455a64',
    },
    text_hover_color: {
      ...values.text_hover_color,
      value: '#fff',
    },
    fullscreen_url: {
      ...values.fullscreen_url,
      value: '',
    },
    fullscreen_background: {
      ...values.fullscreen_background,
      value: '#5468E7',
    },
    fullscreen_text: {
      ...values.fullscreen_text,
      value: '',
    },
    fullscreen_text_color: {
      ...values.fullscreen_text_color,
      value: '#fff',
    },
    fullscreen_sound: {
      ...values.fullscreen_sound,
      value: '',
    },
  },
});
