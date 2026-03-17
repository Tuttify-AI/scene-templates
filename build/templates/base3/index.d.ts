import React from 'react';
import { SceneProps, SceneValue, TemplateParameter } from '../shared/types';
import { BaseSceneElements, Classes } from './types';
export type Base3SceneProps = SceneProps & {
    parameters?: BaseSceneElements<TemplateParameter>;
    values?: BaseSceneElements<SceneValue>;
    classes?: Classes;
};
declare const Base3: React.ForwardRefExoticComponent<Pick<Base3SceneProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "parameters" | "values" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations"> & React.RefAttributes<HTMLDivElement>>;
export default Base3;
