import * as Types from './templates/shared/types';
import Base, { BaseSceneProps } from './templates/base';
import Base2, { Base2SceneProps } from './templates/base2';
import QuizOne, { QuizOneProps } from './templates/quiz1';
import FullImage, { FullImageSceneProps } from './templates/fullImage';
import FullImageWithButton, { FullImageWithButtonProps } from './templates/scene15';
import SpellBee, { SpellBeeSceneProps } from './templates/spellBee';
import FullVideo, { FullVideoSceneProps } from './templates/fullVideo';
import MultipleTiles, { MultipleTilesSceneProps } from './templates/multipletiles';
import Tiles from './templates/tiles';
import MultipleTiles4, { MultipleTiles4SceneProps } from './templates/multipletiles4';
import MultipleTiles4FullImage, { MultipleTiles4FullImageProps } from './templates/multipletiles4FullImg';
import MultipleTiles6FullImage, { MultipleTiles6FullImageProps } from './templates/multipletiles6Fullimg';
import MultipleTiles8FullImage, { MultipleTiles8FullImageProps } from './templates/multipletiles8Fullimg';
import MultipleTiles6, { MultipleTiles6SceneProps } from './templates/multipletiles6';
import MultipleTiles8, { MultipleTiles8SceneProps } from './templates/multipletiles8';
import Parallax1, { Parallax1SceneProps } from './templates/parallax1';
import AtomiHalloween from './templates/atomiHalloween';

import base from './templates/base/assets/preview';
import base2 from './templates/base2/assets/preview';
import quiz1 from './templates/quiz1/assets/preview';
import fullImage from './templates/fullImage/assets/preview';
import fullImageWithButton from './templates/fullImage/assets/preview';
import multipleTiles from './templates/multipletiles/assets/preview';
import tiles from './templates/tiles/assets/preview';
import multipleTiles4 from './templates/multipletiles4/assets/preview';
import multipleTiles4FullImage from './templates/multipletiles4FullImg/assets/preview';
import multipleTiles6FullImage from './templates/multipletiles6Fullimg/assets/preview';
import multipleTiles8FullImage from './templates/multipletiles8Fullimg/assets/preview';
import multipleTiles6 from './templates/multipletiles6/assets/preview';
import multipleTiles8 from './templates/multipletiles8/assets/preview';
import spellbee from './templates/spellBee/assets/preview';
import atomiHalloween from './templates/atomiHalloween/assets/preview';
import parallax1 from './templates/parallax1/assets/preview';

export enum SceneNames {
  Base = 'base',
  Base2 = 'base2',
  Quiz1 = 'quiz1',
  FullImage = 'fullImage',
  FullVideo = 'fullVideo',
  MultipleTiles = 'multipletiles',
  MultipleTiles4 = 'multipletiles4',
  MultipleTiles4FullImage = 'multipletiles4FullImg',
  MultipleTiles6FullImage = 'multipletiles6FullImg',
  MultipleTiles8FullImage = 'multipletiles8FullImg',
  MultipleTiles6 = 'multipletiles6',
  MultipleTiles8 = 'multipletiles8',
  FullImageWithButton = 'fullImageWithButton',
  Tiles = 'tiles',
  Spellbee = 'spellbee',
  Parallax1 = 'parallax1',
  Scene15 = 'scene15',
  Atomi = 'atomi',
}

const previews = {
  base,
  base2,
  quiz1,
  fullImage,
  multipleTiles,
  multipleTiles4,
  multipleTiles4FullImage,
  multipleTiles6FullImage,
  multipleTiles8FullImage,
  multipleTiles6,
  multipleTiles8,
  atomiHalloween,
  fullImageWithButton,
  tiles,
  spellbee,
  parallax1,
};

export {
  Base,
  Base2,
  QuizOne,
  FullImage,
  FullVideo,
  MultipleTiles,
  MultipleTiles4,
  MultipleTiles4FullImage,
  MultipleTiles6,
  MultipleTiles6FullImage,
  MultipleTiles8,
  MultipleTiles8FullImage,
  AtomiHalloween,
  FullImageWithButton,
  Parallax1,
  Tiles,
  Types,
  previews,
};
export type {
  BaseSceneProps,
  Base2SceneProps,
  QuizOneProps,
  FullImageSceneProps,
  MultipleTilesSceneProps,
  MultipleTiles4SceneProps,
  MultipleTiles4FullImageProps,
  MultipleTiles6SceneProps,
  MultipleTiles6FullImageProps,
  MultipleTiles8SceneProps,
  MultipleTiles8FullImageProps,
  FullVideoSceneProps,
  FullImageWithButtonProps,
  SpellBeeSceneProps,
  Parallax1SceneProps,
};

export const AVAILABLE_SCENES = {
  [SceneNames.Base]: {
    component: Base,
    previewImage: previews.base,
  },
  [SceneNames.Base2]: {
    component: Base2,
    previewImage: previews.base2,
  },
  [SceneNames.Atomi]: {
    component: AtomiHalloween,
    previewImage: previews.atomiHalloween,
  },
  [SceneNames.Quiz1]: {
    component: QuizOne,
    previewImage: previews.quiz1,
  },
  [SceneNames.FullImage]: {
    component: FullImage,
    previewImage: previews.fullImage,
  },
  [SceneNames.FullVideo]: {
    component: FullVideo,
    previewImage: previews.fullImage,
  },
  [SceneNames.MultipleTiles]: {
    component: MultipleTiles,
    previewImage: previews.multipleTiles,
  },
  [SceneNames.MultipleTiles4]: {
    component: MultipleTiles4,
    previewImage: previews.multipleTiles4,
  },
  [SceneNames.MultipleTiles4FullImage]: {
    component: MultipleTiles4FullImage,
    previewImage: previews.multipleTiles4FullImage,
  },
  [SceneNames.MultipleTiles6]: {
    component: MultipleTiles6,
    previewImage: previews.multipleTiles6,
  },
  [SceneNames.MultipleTiles6FullImage]: {
    component: MultipleTiles6FullImage,
    previewImage: previews.multipleTiles6FullImage,
  },
  [SceneNames.MultipleTiles8]: {
    component: MultipleTiles8,
    previewImage: previews.multipleTiles8,
  },
  [SceneNames.MultipleTiles4FullImage]: {
    component: MultipleTiles8FullImage,
    previewImage: previews.multipleTiles8FullImage,
  },
  [SceneNames.Scene15]: {
    component: FullImageWithButton,
    previewImage: previews.fullImageWithButton,
  },
  [SceneNames.Tiles]: {
    component: Tiles,
    previewImage: previews.tiles,
  },
  [SceneNames.Spellbee]: {
    component: SpellBee,
    previewImage: previews.tiles,
  },
  [SceneNames.Parallax1]: {
    component: Parallax1,
    previewImage: previews.parallax1,
  },
};
