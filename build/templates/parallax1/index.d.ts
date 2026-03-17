import React from 'react';
import { SceneProps, SceneValue, TemplateParameter } from '../shared/types';
import { ParallaxSceneElements, Classes } from './types';
export type Parallax1SceneProps = SceneProps & {
    parameters?: ParallaxSceneElements<TemplateParameter>;
    values?: ParallaxSceneElements<SceneValue>;
    classes?: Classes;
};
declare const Parallax1: React.ForwardRefExoticComponent<Pick<Parallax1SceneProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "parameters" | "values" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations"> & React.RefAttributes<HTMLDivElement>>;
export default Parallax1;
