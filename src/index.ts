import * as Types from './templates/shared/types';
import Base, { BaseSceneProps } from './templates/base';
import Base2, { Base2SceneProps } from './templates/base2';
import QuizOne, { QuizOneProps } from './templates/quiz1';
import FullImage, { FullImageSceneProps } from './templates/fullImage';
import FullImageWithButton, { FullImageWithButtonProps } from './templates/scene15';
import GuessWord, { GuessWordSceneProps } from './templates/wordGuess';
import FullVideo, { FullVideoSceneProps } from './templates/fullVideo';
import MultipleTiles, { MultipleTilesSceneProps } from './templates/multipletiles';
import Tiles from './templates/tiles';
import MultipleTiles4, { MultipleTiles4SceneProps } from './templates/multipletiles4';
import MultipleTiles4FullImage, { MultipleTiles4FullImageProps } from './templates/multipletiles4FullImg';
import MultipleTiles6FullImage, { MultipleTiles6FullImageProps } from './templates/multipletiles6Fullimg';
import MultipleTiles8FullImage, { MultipleTiles8FullImageProps } from './templates/multipletiles8Fullimg';
import MultipleTiles6, { MultipleTiles6SceneProps } from './templates/multipletiles6';
import MultipleTiles8, { MultipleTiles8SceneProps } from './templates/multipletiles8';
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
import atomiHalloween from './templates/atomiHalloween/assets/preview';

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
  GuessWordSceneProps,
};

export const AVAILABLE_SCENES = {
  base: {
    component: Base,
    previewImage: previews.base,
  },
  base2: {
    component: Base2,
    previewImage: previews.base2,
  },
  atomi: {
    component: AtomiHalloween,
    previewImage: previews.atomiHalloween,
  },
  quiz1: {
    component: QuizOne,
    previewImage: previews.quiz1,
  },
  fullImage: {
    component: FullImage,
    previewImage: previews.fullImage,
  },
  fullVideo: {
    component: FullVideo,
    previewImage: previews.fullImage,
  },
  multipletiles: {
    component: MultipleTiles,
    previewImage: previews.multipleTiles,
  },
  multipletiles4: {
    component: MultipleTiles4,
    previewImage: previews.multipleTiles4,
  },
  multipletiles4FullImg: {
    component: MultipleTiles4FullImage,
    previewImage: previews.multipleTiles4FullImage,
  },
  multipletiles6: {
    component: MultipleTiles6,
    previewImage: previews.multipleTiles6,
  },
  multipletiles6FullImg: {
    component: MultipleTiles6FullImage,
    previewImage: previews.multipleTiles6FullImage,
  },
  multipletiles8: {
    component: MultipleTiles8,
    previewImage: previews.multipleTiles8,
  },
  multipletiles8FullImg: {
    component: MultipleTiles8FullImage,
    previewImage: previews.multipleTiles8FullImage,
  },
  scene15: {
    component: FullImageWithButton,
    previewImage: previews.fullImageWithButton,
  },
  tiles: {
    component: Tiles,
    previewImage: previews.tiles,
  },
  wordGuess: {
    component: GuessWord,
    previewImage: previews.tiles,
  },
};
