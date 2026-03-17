import React from 'react';
import { SceneProps, SceneValue } from '../shared/types';
import { Classes, TenFramesElements } from '../tenFrames/types';
export type TenFrames2SceneProps = SceneProps & {
    values?: TenFramesElements<SceneValue>;
    classes?: Classes;
};
declare const TenFrames2: React.ForwardRefExoticComponent<Pick<TenFrames2SceneProps, "previewMode" | "editMode" | "activeKey" | "values" | "classes" | "onClick" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations"> & React.RefAttributes<HTMLDivElement>>;
export default TenFrames2;
