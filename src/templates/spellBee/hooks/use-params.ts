import { useCallback, useEffect, useMemo } from 'react';
import { useWindowSize } from '../../shared/hooks';
import { SceneProps, SceneValue } from '../../shared/types';
import { getElementValue, getNumber, randomizeArray, randomizeString } from '../../shared/utils';
import { SpellBeeConfig } from '../types';

type Params = Pick<SceneProps, 'values' | 'previewMode' | 'editMode' | 'onSet'> & {
  useArray?: boolean;
};

const DEFAULTS = {
  selectionTextSize: 72,
  selectionWordSize: 50,
  wordTextSize: 90,
  wordSize: 42,
  fullScreenTextSize: 40,
  textPadding: 8,
};

export default function useParams({ values, previewMode, editMode, onSet, useArray }: Params) {
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
  const totalItemsArray = useMemo(
    () =>
      useArray && Array.isArray(getConfigValue('items_total'))
        ? (getConfigValue('items_total') as string[])?.map(w => w.toUpperCase())
        : `${getConfigValue('items_total')}`.toUpperCase().split(''),
    [getConfigValue, useArray]
  );
  const additionalLettersArray = useMemo(
    () =>
      useArray && Array.isArray(getConfigValue('additional_items'))
        ? (getConfigValue('additional_items') as string[])?.map(w => w.toUpperCase())
        : `${getConfigValue('additional_items')}`.toUpperCase().split(''),
    [getConfigValue, useArray]
  );
  const itemsArray = useMemo(
    () =>
      useArray && Array.isArray(getConfigValue('items'))
        ? (getConfigValue('items') as string[])?.map(w => w.toUpperCase())
        : `${getConfigValue('items')}`.toUpperCase().split(''),
    [getConfigValue, useArray]
  );

  const answerArray = useMemo(() => Array.from(Array(itemsArray.length).fill(null)), [itemsArray]);

  useEffect(() => {
    if (
      totalItemsArray.slice().sort().join('') !== [...itemsArray, ...additionalLettersArray].slice().sort().join('')
    ) {
      if (useArray) {
        onSetConfig('items_total', randomizeArray([...itemsArray, ...additionalLettersArray]));
      } else {
        onSetConfig('items_total', randomizeString([...itemsArray, ...additionalLettersArray].join('')));
      }
    }
  }, [totalItemsArray, onSetConfig, itemsArray, additionalLettersArray, useArray]);
  const selectionItemsWidth = useMemo(
    () =>
      100 / (isMd && totalItemsArray.length > 8 ? Math.round(totalItemsArray.length / 2) : totalItemsArray.length || 1),
    [isMd, totalItemsArray.length]
  );

  const answerLettersWidth = useMemo(() => (useArray ? 25 : 100 / (itemsArray.length || 1)), [itemsArray, useArray]);

  const selectionFontSize = useMemo(
    () =>
      Math.floor(
        isSm && useArray
          ? DEFAULTS.selectionWordSize * 0.4
          : !isSm && useArray
          ? DEFAULTS.selectionWordSize
          : isSm
          ? DEFAULTS.selectionTextSize * 0.75
          : DEFAULTS.selectionTextSize
      ),
    [isSm, useArray]
  );
  const wordFontSize = useMemo(
    () =>
      Math.floor(
        isSm && useArray
          ? DEFAULTS.wordSize * 0.4
          : !isSm && useArray
          ? DEFAULTS.wordSize
          : isSm && !useArray
          ? DEFAULTS.wordTextSize * 0.55
          : DEFAULTS.wordTextSize
      ),
    [isSm, useArray]
  );

  const wordPadding = useMemo(
    () => (isSm ? DEFAULTS.textPadding * (useArray ? 0.4 : 0.5) : DEFAULTS.textPadding * (useArray ? 0.8 : 1)),
    [isSm, useArray]
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
    totalItemsArray,
    itemsArray,
    DEFAULTS,
    showSceneActionElements,
    selectionItemsWidth,
    answerLettersWidth,
    answerArray,
    wordPadding,
    fullScreenTextSize,
  };
}
