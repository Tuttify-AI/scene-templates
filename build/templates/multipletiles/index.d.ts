import React from 'react';
import { SceneProps, SceneValue } from '../shared/types';
import { BaseSceneElements, Classes } from './types';
import 'swiper/css';
import 'swiper/css/navigation';
export type MultipleTilesSceneProps = SceneProps & {
    values?: BaseSceneElements<SceneValue>;
    classes?: Classes;
};
declare const MultipleTiles: React.ForwardRefExoticComponent<Pick<MultipleTilesSceneProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "values" | "onAdd" | "onSet" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onDelete" | "translations"> & React.RefAttributes<HTMLDivElement>>;
export default MultipleTiles;
