import { useCallback, useEffect, useMemo } from 'react';
import { useWindowSize } from '../../shared/hooks';
import { SceneProps, SceneValue } from '../../shared/types';
import { getElementValue, getNumber, randomizeString } from '../../shared/utils';
import { GuessWordConfig } from '../types';

type Params = Pick<SceneProps, 'values' | 'previewMode' | 'editMode' | 'onSet'>;

const DEFAULTS = {
  selectionTextSize: 72,
  wordTextSize: 90,
  textPadding: 8,
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
  const lockCorrectSelection = useMemo(
    () => getNumber(getConfigValue('lock_correct_selection')) === 1,
    [getConfigValue]
  );
  const highlightCorrectSelection = useMemo(
    () => getNumber(getConfigValue('highlight_correct_selection')) === 1,
    [getConfigValue]
  );
  const highlightIncorrectSelection = useMemo(
    () => getNumber(getConfigValue('highlight_incorrect_selection')) === 1,
    [getConfigValue]
  );
  const lettersArray = useMemo(() => `${getConfigValue('letters_total')}`.toUpperCase().split(''), [getConfigValue]);
  const additionalLettersArray = useMemo(
    () => `${getConfigValue('additional_letters')}`.toUpperCase().split(''),
    [getConfigValue]
  );
  const wordArray = useMemo(() => `${getConfigValue('word')}`.toUpperCase().split(''), [getConfigValue]);
  const answerArray = useMemo(() => Array.from(Array(wordArray.length).fill(null)), [wordArray]);

  useEffect(() => {
    if (lettersArray.slice().sort().join('') !== [...wordArray, ...additionalLettersArray].slice().sort().join('')) {
      onSetConfig('letters_total', randomizeString([...wordArray, ...additionalLettersArray].join('')));
    }
  }, [lettersArray, onSetConfig, wordArray, additionalLettersArray]);
  const selectionLettersWidth = useMemo(
    () => 100 / (isMd && lettersArray.length > 8 ? Math.round(lettersArray.length / 2) : lettersArray.length || 1),
    [lettersArray, isMd]
  );
  const answerLettersWidth = useMemo(() => 100 / (wordArray.length || 1), [wordArray]);
  const selectionFontSize = useMemo(
    () => Math.floor(isSm ? DEFAULTS.selectionTextSize * 0.75 : DEFAULTS.selectionTextSize),
    [isSm]
  );
  const wordFontSize = useMemo(() => Math.floor(isSm ? DEFAULTS.wordTextSize * 0.55 : DEFAULTS.wordTextSize), [isSm]);
  const wordPadding = useMemo(() => (isSm ? DEFAULTS.textPadding * 0.5 : DEFAULTS.textPadding), [isSm]);
  const selectionContainerHeight = useMemo(() => selectionFontSize + wordPadding * 2, [selectionFontSize, wordPadding]);
  const wordContainerHeight = useMemo(() => wordFontSize + DEFAULTS.textPadding * 2, [wordFontSize]);

  // fullscreen text size depending on screen resolution
  //const fullScreenTextSize = useMemo(() => DEFAULTS.textSize * (isSm ? 0.85 : 1.25), [isSm]);
  // tile text margin depends on image and slider height

  const showSceneActionElements = useMemo(() => editMode && !previewMode, [editMode, previewMode]);

  return {
    highlightIncorrectSelection,
    highlightCorrectSelection,
    lockCorrectSelection,
    selectionFontSize,
    selectionContainerHeight,
    wordContainerHeight,
    wordFontSize,
    lettersArray,
    wordArray,
    DEFAULTS,
    showSceneActionElements,
    selectionLettersWidth,
    answerLettersWidth,
    answerArray,
    wordPadding,
  };
}
