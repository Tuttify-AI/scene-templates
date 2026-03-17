import React from 'react';
import { SceneProps, SceneValue } from '../shared/types';
import { Classes, TenFramesElements } from '../tenFrames/types';
export type TenFrames1SceneProps = SceneProps & {
    values?: TenFramesElements<SceneValue>;
    classes?: Classes;
};
declare const TenFrames1: React.ForwardRefExoticComponent<Pick<TenFrames1SceneProps, "previewMode" | "editMode" | "activeKey" | "values" | "classes" | "onClick" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations"> & React.RefAttributes<HTMLDivElement>>;
export default TenFrames1;
