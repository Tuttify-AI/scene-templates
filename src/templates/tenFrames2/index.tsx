import React, { forwardRef } from 'react';

import { SceneProps, SceneValue } from '../shared/types';
import TenFrames from '../tenFrames';
import { Classes, TenFramesElements } from '../tenFrames/types';

export type TenFrames2SceneProps = SceneProps & {
  values?: TenFramesElements<SceneValue>;
  classes?: Classes;
};

const TenFrames2 = forwardRef<HTMLDivElement, TenFrames2SceneProps>((props, ref) => {
  return <TenFrames {...props} ref={ref} />;
});

export default TenFrames2;
