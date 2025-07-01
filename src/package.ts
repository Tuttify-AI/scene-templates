import * as Types from './templates/shared/types';
import Base, { BaseSceneProps } from './templates/base';
import Base2, { Base2SceneProps } from './templates/base2';
import MultipleTiles6, { MultipleTiles6SceneProps } from './templates/multipletiles6';
import MultipleTiles8, { MultipleTiles8SceneProps } from './templates/multipletiles8';
import AtomiHalloween from './templates/atomiHalloween';

import base from './templates/base/assets/preview';
import base2 from './templates/base2/assets/preview';
import multipleTiles6 from './templates/multipletiles6/assets/preview';
import multipleTiles8 from './templates/multipletiles8/assets/preview';
import atomiHalloween from './templates/atomiHalloween/assets/preview';

const previews = {
  base,
  base2,
  multipleTiles6,
  multipleTiles8,
  atomiHalloween,
};

export {
  Base,
  BaseSceneProps,
  Base2,
  Base2SceneProps,
  MultipleTiles6,
  MultipleTiles6SceneProps,
  MultipleTiles8,
  MultipleTiles8SceneProps,
  AtomiHalloween,
  Types,
  previews
}
