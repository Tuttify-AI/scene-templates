import { useCallback, useEffect, useMemo } from 'react';
import { useWindowSize } from '../../shared/hooks';
import { SceneProps, SceneValue } from '../../shared/types';
import { getElementValue, getNumber, randomizeArray, randomizeString } from '../../shared/utils';
import { SpellBeeConfig } from '../types';

type Params = Pick<SceneProps, 'values' | 'previewMode' | 'editMode' | 'onSet'> & {
  useWords?: boolean;
};

const DEFAULTS = {
  selectionTextSize: 72,
  selectionWordSize: 38,
  wordTextSize: 90,
  wordSize: 42,
  fullScreenTextSize: 40,
  textPadding: 8,
};

export default function useParams({ values, previewMode, editMode, onSet, useWords }: Params) {
  const { isMd, isSm } = useWindowSize();

  const getConfigValue = useCallback(
    (parameter: keyof SpellBeeConfig) => getElementValue(values)('config', parameter),
    [values]
  );
  const onSetConfig = useCallback(
    (key: keyof SpellBeeConfig, value: SceneValue['value']) => {
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
  const lettersArray = useMemo(
    () =>
      useWords && typeof getConfigValue('words_total') === 'object'
        ? (getConfigValue('words_total') as string[])?.map(w => w.toUpperCase())
        : `${getConfigValue('letters_total')}`.toUpperCase().split(''),
    [getConfigValue, useWords]
  );
  const additionalLettersArray = useMemo(
    () =>
      useWords && typeof getConfigValue('additional_words') === 'object'
        ? (getConfigValue('additional_words') as string[])?.map(w => w.toUpperCase())
        : `${getConfigValue('additional_letters')}`.toUpperCase().split(''),
    [getConfigValue, useWords]
  );
  const wordArray = useMemo(
    () =>
      useWords && typeof getConfigValue('words') === 'object'
        ? (getConfigValue('words') as string[])?.map(w => w.toUpperCase())
        : `${getConfigValue('word')}`.toUpperCase().split(''),
    [getConfigValue, useWords]
  );

  const answerArray = useMemo(() => Array.from(Array(wordArray.length).fill(null)), [wordArray]);

  useEffect(() => {
    if (
      useWords &&
      lettersArray.slice().sort().join('') !== [...wordArray, ...additionalLettersArray].slice().sort().join('')
    ) {
      onSetConfig('words_total', randomizeArray([...wordArray, ...additionalLettersArray]));
    } else if (
      !useWords &&
      lettersArray.slice().sort().join('') !== [...wordArray, ...additionalLettersArray].slice().sort().join('')
    ) {
      onSetConfig('letters_total', randomizeString([...wordArray, ...additionalLettersArray].join('')));
    }
  }, [lettersArray, onSetConfig, wordArray, additionalLettersArray, useWords]);
  const selectionLettersWidth = useMemo(
    () =>
      100 /
      (isMd && lettersArray.length > (useWords ? 4 : 8)
        ? Math.round(lettersArray.length / (useWords ? 1.2 : 2))
        : lettersArray.length || 1),
    [isMd, lettersArray.length, useWords]
  );

  const answerLettersWidth = useMemo(() => 100 / (wordArray.length || 1), [wordArray]);

  const selectionFontSize = useMemo(
    () =>
      Math.floor(
        isSm && useWords
          ? DEFAULTS.selectionWordSize * 0.4
          : !isSm && useWords
          ? DEFAULTS.selectionWordSize
          : isSm
          ? DEFAULTS.selectionTextSize * 0.75
          : DEFAULTS.selectionTextSize
      ),
    [isSm, useWords]
  );
  const wordFontSize = useMemo(
    () =>
      Math.floor(
        isSm && useWords
          ? DEFAULTS.wordSize * 0.4
          : !isSm && useWords
          ? DEFAULTS.wordSize
          : isSm && !useWords
          ? DEFAULTS.wordTextSize * 0.55
          : DEFAULTS.wordTextSize
      ),
    [isSm, useWords]
  );

  const wordPadding = useMemo(
    () => (isSm ? DEFAULTS.textPadding * (useWords ? 0.4 : 0.5) : DEFAULTS.textPadding * (useWords ? 0.8 : 1)),
    [isSm, useWords]
  );
  const selectionContainerHeight = useMemo(() => selectionFontSize + wordPadding * 2, [selectionFontSize, wordPadding]);
  const wordContainerHeight = useMemo(() => wordFontSize + DEFAULTS.textPadding * 2, [wordFontSize]);

  // fullscreen text size depending on screen resolution
  const fullScreenTextSize = useMemo(() => Math.floor(DEFAULTS.fullScreenTextSize * (isSm ? 0.85 : 1)), [isSm]);

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
    fullScreenTextSize,
  };
}
