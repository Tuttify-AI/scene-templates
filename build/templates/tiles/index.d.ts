import React from 'react';
import { SceneProps, SceneValue } from '../shared/types';
import { MultipleTilesElements, Classes } from './types';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
export type MultipleTilesSceneProps = SceneProps & {
    values?: MultipleTilesElements<SceneValue>;
    classes?: Classes;
};
declare const MultipleTiles: React.ForwardRefExoticComponent<Pick<MultipleTilesSceneProps, "editMode" | "translations" | "previewMode" | "classes" | "activeKey" | "onClick" | "values" | "onAdd" | "onSet" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onDelete"> & React.RefAttributes<HTMLDivElement>>;
export default MultipleTiles;
