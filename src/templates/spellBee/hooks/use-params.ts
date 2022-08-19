import React, { useCallback, useEffect, useMemo } from 'react';
import { usePrevious, useWindowSize } from '../../shared/hooks';
import { SceneProps, SceneValue } from '../../shared/types';
import { arrayIsEqual, getElementValue, getNumber, randomizeArray, randomizeString } from '../../shared/utils';
import { AnswerType, SpellBeeConfig } from '../types';

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

  const totalItemsArray = useMemo(() => {
    const totalItems = getConfigValue('items_total') || getConfigValue('letters_total');
    return useArray && Array.isArray(totalItems)
      ? (totalItems as string[])?.map(w => w.toUpperCase())
      : `${totalItems}`.toUpperCase().split('');
  }, [getConfigValue, useArray]);

  const additionalLettersArray = useMemo(() => {
    const additionalItems = getConfigValue('additional_items') || getConfigValue('additional_letters');
    return useArray && Array.isArray(additionalItems)
      ? (additionalItems as string[])?.map(w => w.toUpperCase())
      : `${additionalItems}`.toUpperCase().split('');
  }, [getConfigValue, useArray]);

  const itemsArray = useMemo(() => {
    const items = getConfigValue('items') || getConfigValue('word');
    return useArray && Array.isArray(items)
      ? (items as string[])?.map(w => w.toUpperCase())
      : `${items}`.toUpperCase().split('');
  }, [getConfigValue, useArray]);

  const answerArray = useMemo(() => Array.from(Array(itemsArray.length).fill(null)), [itemsArray]);

  const predefinedTotalItemIndexes = useMemo(
    () => (getConfigValue('predefined_total_item_indexes') || []) as AnswerType[],
    [getConfigValue]
  );

  const setPredefinedTotalItemIndexes = useCallback(
    (values: AnswerType[]) => onSetConfig('predefined_total_item_indexes', values),
    [onSetConfig]
  );

  const isPredefinedIndex = useCallback(
    (answerIndex: AnswerType) => answerIndex !== null && predefinedTotalItemIndexes?.includes(answerIndex),
    [predefinedTotalItemIndexes]
  );

  const allowPredefine = useCallback(
    (itemsIndex: AnswerType) => {
      return !(!isPredefinedIndex(itemsIndex) && predefinedTotalItemIndexes.filter(v => v === null).length <= 1);
    },
    [predefinedTotalItemIndexes, isPredefinedIndex]
  );

  const handlePredefinedTotalItemIndexes = useCallback(
    (answerIndex: number | null) => (e: React.MouseEvent) => {
      e?.preventDefault();
      e?.stopPropagation();
      const totalItemsIndexes = totalItemsArray.reduce(
        (acc, item, i) =>
          answerIndex !== null && item?.toUpperCase() === itemsArray?.[answerIndex]?.toUpperCase() ? [...acc, i] : acc,
        [] as number[]
      );
      setPredefinedTotalItemIndexes(
        predefinedTotalItemIndexes.map((item, index, array) => {
          if (index === answerIndex && totalItemsIndexes.length) {
            const filteredIndexes = totalItemsIndexes.filter(i => !array.includes(i));
            const checkIndex = filteredIndexes.length ? filteredIndexes[0] : totalItemsIndexes[0];
            return item !== null ? null : checkIndex;
          }
          return item;
        })
      );
    },
    [totalItemsArray, itemsArray, setPredefinedTotalItemIndexes, predefinedTotalItemIndexes]
  );

  useEffect(() => {
    if (!arrayIsEqual(totalItemsArray, [...itemsArray, ...additionalLettersArray])) {
      if (useArray) {
        onSetConfig('items_total', randomizeArray([...itemsArray, ...additionalLettersArray]));
      } else {
        onSetConfig('items_total', randomizeString([...itemsArray, ...additionalLettersArray].join('')));
      }
    }
  }, [totalItemsArray, onSetConfig, itemsArray, additionalLettersArray, useArray]);

  const prevItemsArray = usePrevious(itemsArray);
  const prevTotalItemsArray = usePrevious(totalItemsArray);

  useEffect(() => {
    // clearing predefined items if items or totalItems array changed
    if (
      prevItemsArray &&
      prevTotalItemsArray &&
      (!arrayIsEqual(prevItemsArray, itemsArray) || !arrayIsEqual(prevTotalItemsArray, totalItemsArray))
    ) {
      setPredefinedTotalItemIndexes(answerArray);
    }
  }, [setPredefinedTotalItemIndexes, itemsArray, totalItemsArray, prevTotalItemsArray, prevItemsArray, answerArray]);

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
    predefinedTotalItemIndexes,
    isPredefinedIndex,
    allowPredefine,
    handlePredefinedTotalItemIndexes,
  };
}
