import { useCallback, useEffect, useMemo } from 'react';
import { useWindowSize } from '../../shared/hooks';
import { SceneProps, SceneValue } from '../../shared/types';
import { getElementValue, getNumber, randomizeArray, randomizeString } from '../../shared/utils';
import { CountingConfig } from '../types';

type Params = Pick<SceneProps, 'values' | 'previewMode' | 'editMode' | 'onSet'> & {
  useArray?: boolean;
};

const DEFAULTS = {
  selectionTextSize: 72,
  selectionWordSize: 38,
  wordTextSize: 90,
  wordSize: 42,
  fullScreenTextSize: 40,
  textPadding: 8,
};

export default function useParams({ values, previewMode, editMode, onSet, useArray }: Params) {
  const { isMd, isSm } = useWindowSize();

  const getConfigValue = useCallback(
    (parameter: keyof CountingConfig) => getElementValue(values)('config', parameter),
    [values]
  );
  const onSetConfig = useCallback(
    (key: keyof CountingConfig, value: SceneValue['value']) => {
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
        : `${getConfigValue('items_total')}`.split(''),
    [getConfigValue, useArray]
  );
  const additionalNumbersArray = useMemo(() => {
    return useArray && Array.isArray(getConfigValue('additional_items'))
      ? (getConfigValue('additional_items') as string[])?.map(w => w.toUpperCase())
      : `${getConfigValue('additional_items')}`.toUpperCase().split('');
  }, [getConfigValue, useArray]);

  const rightNumber = useMemo(() => getNumber(getConfigValue('right_number')), [getConfigValue]);

  const leftNumber = useMemo(() => getNumber(getConfigValue('left_number')), [getConfigValue]);

  const resultNumber = useMemo(() => getNumber(getConfigValue('result')), [getConfigValue]);

  const countingOperation = useMemo(() => getConfigValue('counting_operation') as string, [getConfigValue]);

  const answerArray = useMemo(() => Array.from(Array(5).fill(null)), []);
  const answerValueArray = useMemo(() => Array.from(Array(5).fill(null)), []);

  useEffect(() => {
    const filteredAdditionalNumbers = additionalNumbersArray.filter(item => item !== ',');
    if (totalItemsArray.slice().sort().join('') !== [...filteredAdditionalNumbers].slice().sort().join('')) {
      if (useArray) {
        onSetConfig('items_total', randomizeArray([...filteredAdditionalNumbers]));
      } else {
        onSetConfig('items_total', randomizeString([...filteredAdditionalNumbers].join('')));
      }
    }
  }, [totalItemsArray, onSetConfig, additionalNumbersArray, useArray]);

  const selectionNumbersWidth = useMemo(
    () =>
      100 /
      (isMd && totalItemsArray.length > (useArray ? 4 : 8)
        ? Math.round(totalItemsArray.length / (useArray ? 1.2 : 2))
        : totalItemsArray.length || 1),
    [isMd, totalItemsArray.length, useArray]
  );
  const additionalNumbers = useMemo(
    () => additionalNumbersArray && additionalNumbersArray?.map(i => +i),
    [additionalNumbersArray]
  );
  useEffect(() => {
    if (rightNumber) {
      answerValueArray[0] = rightNumber;
      answerArray[0] = 0;
    }
  }, [rightNumber, answerArray, answerValueArray]);

  useEffect(() => {
    if (countingOperation) {
      answerValueArray[1] = countingOperation;
      answerArray[1] = 1;
    }
  }, [countingOperation, answerArray, answerValueArray]);

  useEffect(() => {
    if (leftNumber) {
      answerValueArray[2] = leftNumber;
      answerArray[2] = 2;
    }
  }, [leftNumber, answerArray, answerValueArray]);

  useEffect(() => {
    answerValueArray[3] = '=';
    answerArray[3] = 3;
  }, [answerArray, answerValueArray]);

  useEffect(() => {
    if (resultNumber) {
      answerValueArray[4] = resultNumber;
      answerArray[4] = 4;
    }
  }, [resultNumber, answerArray, answerValueArray]);

  /* const itemImageWidth = useMemo(
     () => (itemsCountArray.length > 5 ? 100 / 5 : 100 / itemsCountArray.length),
     [itemsCountArray.length]
   );*/

  /*const itemImageHeight = useMemo(() => (itemsCountArray.length > 5 ? 100 / 2 : 100), [itemsCountArray.length]);*/

  /* const answerNumbersWidth = useMemo(() => 100 / (itemsArray.length || 1), [itemsArray]);*/

  useEffect(() => {
    additionalNumbers?.length && answerValueArray.splice(5, 0, ...additionalNumbers);
  }, [answerValueArray, additionalNumbers]);

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
    rightNumber,
    leftNumber,
    resultNumber,
    DEFAULTS,
    showSceneActionElements,
    selectionNumbersWidth,
    answerArray,
    wordPadding,
    fullScreenTextSize,
    answerValueArray,
    additionalNumbers,
  };
}
