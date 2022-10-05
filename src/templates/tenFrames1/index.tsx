import React, { forwardRef } from 'react';

import { SceneProps, SceneValue } from '../shared/types';
import TenFrames from '../tenFrames';
import { Classes, TenFramesElements } from '../tenFrames/types';

export type TenFrames1SceneProps = SceneProps & {
  values?: TenFramesElements<SceneValue>;
  classes?: Classes;
};

const TenFrames1 = forwardRef<HTMLDivElement, TenFrames1SceneProps>((props, ref) => {
  return <TenFrames {...props} ref={ref} showBubbles />;
});

export default TenFrames1;
