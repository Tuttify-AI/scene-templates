import React from 'react';
import { SceneProps, SceneValue } from '../shared/types';
import { Classes, SpellBeeElements } from './types';
export type SpellBeeSceneProps = SceneProps & {
    values?: SpellBeeElements<SceneValue>;
    classes?: Classes;
    useArray?: boolean;
};
declare const SpellBee: React.ForwardRefExoticComponent<Pick<SpellBeeSceneProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "values" | "onSet" | "onActiveElementClick" | "onComplete" | "useArray" | "onSceneSolved" | "onAdd" | "onDelete" | "translations"> & React.RefAttributes<HTMLDivElement>>;
export default SpellBee;
