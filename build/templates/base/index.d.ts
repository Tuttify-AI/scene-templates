import React from 'react';
import { BaseSceneElements, Classes } from './types';
import { TemplateParameter, SceneProps, SceneValue } from '../shared/types';
export type BaseSceneProps = SceneProps & {
    parameters?: BaseSceneElements<TemplateParameter>;
    values?: BaseSceneElements<SceneValue>;
    classes?: Classes;
};
declare const Base: React.ForwardRefExoticComponent<Pick<BaseSceneProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "parameters" | "values" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations"> & React.RefAttributes<HTMLDivElement>>;
export default Base;
