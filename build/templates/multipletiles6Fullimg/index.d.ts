import React from 'react';
import { SceneProps, SceneValue } from '../shared/types';
import { BaseSceneElements, Classes } from './types';
import 'swiper/css';
import 'swiper/css/grid';
export type MultipleTiles6FullImageProps = SceneProps & {
    values?: BaseSceneElements<SceneValue>;
    classes?: Classes;
};
declare const MultipleTiles6Fullimg: React.ForwardRefExoticComponent<Pick<MultipleTiles6FullImageProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "values" | "onAdd" | "onSet" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onDelete" | "translations"> & React.RefAttributes<HTMLDivElement>>;
export default MultipleTiles6Fullimg;
