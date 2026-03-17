import React from 'react';
import { SceneProps, SceneValue } from '../shared/types';
import { Classes, CountingElements } from './types';
export type CountingSceneProps = SceneProps & {
    values?: CountingElements<SceneValue>;
    classes?: Classes;
};
declare const Counting: React.ForwardRefExoticComponent<Pick<CountingSceneProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "values" | "onSet" | "onActiveElementClick" | "onSceneSolved" | "onComplete" | "onAdd" | "onDelete" | "translations"> & React.RefAttributes<HTMLDivElement>>;
export default Counting;
