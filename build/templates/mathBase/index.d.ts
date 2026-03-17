import React from 'react';
import { SceneProps, SceneValue } from '../shared/types';
import { Classes, CountingElements } from './types';
export type MathBaseSceneProps = SceneProps & {
    values?: CountingElements<SceneValue>;
    classes?: Classes;
    useArray?: boolean;
};
declare const MathBase: React.ForwardRefExoticComponent<Pick<MathBaseSceneProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "onComplete" | "values" | "onActiveElementClick" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations" | "useArray"> & React.RefAttributes<HTMLDivElement>>;
export default MathBase;
