import React from 'react';
import { SceneProps, SceneValue } from '../shared/types';
import { Classes, SpellBeeElements } from '../spellBee/types';
export type WordGuessSceneProps = SceneProps & {
    values?: SpellBeeElements<SceneValue>;
    classes?: Classes;
};
declare const WordGuess: React.ForwardRefExoticComponent<Pick<WordGuessSceneProps, "previewMode" | "editMode" | "activeKey" | "values" | "classes" | "onClick" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations"> & React.RefAttributes<HTMLDivElement>>;
export default WordGuess;
