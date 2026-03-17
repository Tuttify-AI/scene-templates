import React from 'react';
import { SceneProps, SceneValue, TemplateParameter } from '../shared/types';
import { ParallaxSceneElements, Classes } from './types';
export type TwocandoSceneProps = SceneProps & {
    parameters?: ParallaxSceneElements<TemplateParameter>;
    values?: ParallaxSceneElements<SceneValue>;
    classes?: Classes;
};
declare const Twocando: React.ForwardRefExoticComponent<Pick<TwocandoSceneProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "parameters" | "values" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations"> & React.RefAttributes<HTMLDivElement>>;
export default Twocando;
