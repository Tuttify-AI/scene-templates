import { useCallback, useEffect, useMemo } from 'react';
import { SceneProps, SceneValue } from '../../shared/types';
import { getElementValue, randomizeString } from '../../shared/utils';
import { useWindowSize } from '../../shared/hooks';
import { GuessWordConfig } from '../types';

type Params = Pick<SceneProps, 'values' | 'previewMode' | 'editMode' | 'onSet'>;

const DEFAULTS = {
  textSize: 36,
  textPadding: 8,
  imageHeight: 0.4, //in percents,
};

export default function useParams({ values, previewMode, editMode, onSet }: Params) {
  const { isMd, isSm } = useWindowSize();
  const getConfigValue = useCallback(
    (parameter: keyof GuessWordConfig) => getElementValue(values)('config', parameter),
    [values]
  );
  const onSetConfig = useCallback(
    (key: keyof GuessWordConfig, value: SceneValue['value']) => {
      onSet && values && onSet({ ...values, config: { ...values.config, [key]: { ...values.config[key], value } } });
    },
    [onSet, values]
  );
  const lettersArray = useMemo(() => `${getConfigValue('letters_total')}`.toUpperCase().split(''), [getConfigValue]);
  const additionalLettersArray = useMemo(
    () => `${getConfigValue('additional_letters')}`.toUpperCase().split(''),
    [getConfigValue]
  );
  const wordArray = useMemo(() => `${getConfigValue('word')}`.toUpperCase().split(''), [getConfigValue]);
  const answerArray = useMemo(() => Array.from(Array(wordArray.length).fill('')), [wordArray]);

  useEffect(() => {
    if (lettersArray.slice().sort().join('') !== [...wordArray, ...additionalLettersArray].slice().sort().join('')) {
      onSetConfig('letters_total', randomizeString([...wordArray, ...additionalLettersArray].join('')));
    }
  }, [lettersArray, onSetConfig, wordArray, additionalLettersArray]);
  const selectionLettersWidth = useMemo(() => 100 / (lettersArray.length || 1), [lettersArray]);
  const answerLettersWidth = useMemo(() => 100 / (wordArray.length || 1), [wordArray]);

  // fullscreen text size depending on screen resolution
  //const fullScreenTextSize = useMemo(() => DEFAULTS.textSize * (isSm ? 0.85 : 1.25), [isSm]);
  // tile text margin depends on image and slider height

  const showSceneActionElements = useMemo(() => editMode && !previewMode, [editMode, previewMode]);

  return {
    lettersArray,
    wordArray,
    DEFAULTS,
    showSceneActionElements,
    selectionLettersWidth,
    answerLettersWidth,
    answerArray,
  };
}
