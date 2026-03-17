import React from 'react';
import { SceneProps, SceneValue } from '../shared/types';
import { Classes, TenFramesElements } from './types';
export type TenFrames1SceneProps = SceneProps & {
    values?: TenFramesElements<SceneValue>;
    classes?: Classes;
    showBubbles?: boolean;
};
declare const TenFrames: React.ForwardRefExoticComponent<Pick<TenFrames1SceneProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "onComplete" | "values" | "onActiveElementClick" | "onSceneSolved" | "onSet" | "showBubbles" | "onAdd" | "onDelete" | "translations"> & React.RefAttributes<HTMLDivElement>>;
export default TenFrames;
