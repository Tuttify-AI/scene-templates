import React from 'react';
import { BaseSceneElements, Classes } from './types';
import { TemplateParameter, SceneProps, SceneValue } from '../shared/types';
export type Base2SceneProps = SceneProps & {
    parameters?: BaseSceneElements<TemplateParameter>;
    values?: BaseSceneElements<SceneValue>;
    classes?: Classes;
};
declare const Base2: React.ForwardRefExoticComponent<Pick<Base2SceneProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "parameters" | "values" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations"> & React.RefAttributes<HTMLDivElement>>;
export default Base2;
