import React from 'react';
import { SceneProps, SceneValue } from '../shared/types';
import { Classes, Quiz1SceneElements } from './types';
export type QuizOneProps = SceneProps & {
    values?: Quiz1SceneElements<SceneValue>;
    classes?: Classes;
};
declare const QuizOne: React.ForwardRefExoticComponent<Pick<QuizOneProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "onComplete" | "values" | "onAdd" | "onSet" | "onActiveElementClick" | "onSceneSolved" | "onDelete" | "translations"> & React.RefAttributes<HTMLDivElement>>;
export default QuizOne;
