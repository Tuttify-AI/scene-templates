import Base, {BaseSceneProps} from './templates/base';
import Base2, {Base2SceneProps} from './templates/base2';
import MultipleTiles, {MultipleTilesSceneProps} from './templates/multipletiles';
import AtomiHalloween from './templates/atomiHalloween';
import * as Types from './templates/shared/types';
import base from './templates/base/assets/preview';
import base2 from './templates/base2/assets/preview';
import multipleTiles from './templates/multipletiles/assets/preview';
import atomiHalloween from './templates/atomiHalloween/assets/preview';

const previews = {
  base,
  base2,
  multipleTiles,
  atomiHalloween,
}

export {
  Base,
  BaseSceneProps,
  Base2,
  Base2SceneProps,
  MultipleTiles,
  MultipleTilesSceneProps,
  AtomiHalloween,
  Types,
  previews
};
