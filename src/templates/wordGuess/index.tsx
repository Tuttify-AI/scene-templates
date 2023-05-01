import React, { forwardRef } from 'react';

import { SceneProps, SceneValue } from '../shared/types';
import SpellBee from '../spellBee';
import { Classes, SpellBeeElements } from '../spellBee/types';

export type WordGuessSceneProps = SceneProps & {
  values?: SpellBeeElements<SceneValue>;
  classes?: Classes;
};

const WordGuess = forwardRef<HTMLDivElement, WordGuessSceneProps>((props, ref) => {
  return <SpellBee {...props} ref={ref} useArray />;
});

export default WordGuess;
