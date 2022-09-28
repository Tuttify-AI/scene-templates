import { useCallback, useMemo } from 'react';
import { useWindowSize } from '../../shared/hooks';
import { SceneProps } from '../../shared/types';
import { getElementValue, getNumber } from '../../shared/utils';
import { TenFramesBaseConfig } from '../types';

type Params = Pick<SceneProps, 'values' | 'previewMode' | 'editMode'>;

const DEFAULTS = {
  selectionTextSize: 72,
  selectionWordSize: 38,
  wordTextSize: 90,
  wordSize: 42,
  fullScreenTextSize: 40,
  textPadding: 8,
};

export default function useParams({ values, previewMode, editMode }: Params) {
  const { isSm } = useWindowSize();

  const getConfigValue = useCallback(
    (parameter: keyof TenFramesBaseConfig) => getElementValue(values)('config', parameter),
    [values]
  );

  const operationNumbersArray = useMemo(
    () => ((getConfigValue('operation_numbers') || []) as string[])?.map(n => getNumber(n)),
    [getConfigValue]
  );

  const additionalNumbersArray = useMemo(
    () => ((getConfigValue('additional_items') || []) as string[])?.map(n => getNumber(n)),
    [getConfigValue]
  );

  const showQuestionMark = useMemo(() => getNumber(getConfigValue('show_question_mark')) === 1, [getConfigValue]);

  const resultNumber = null;

  const mathOperand = useMemo(() => getConfigValue('math_operand') as string, [getConfigValue]);
  const mathSecondOperand = useMemo(() => getConfigValue('math_second_operand') as string, [getConfigValue]);
  const mathThirdOperand = useMemo(() => getConfigValue('math_third_operand') as string, [getConfigValue]);

  const predefinedValues = useMemo(
    () => ({ number: operationNumbersArray, resultNumber }),
    [operationNumbersArray, resultNumber]
  );

  const selectionFontSize = useMemo(
    () => Math.floor(isSm ? DEFAULTS.selectionTextSize * 0.75 : DEFAULTS.selectionTextSize),
    [isSm]
  );
  const wordFontSize = useMemo(() => Math.floor(isSm ? DEFAULTS.wordTextSize * 0.55 : DEFAULTS.wordTextSize), [isSm]);

  const wordPadding = useMemo(() => (isSm ? DEFAULTS.textPadding * 0.4 : DEFAULTS.textPadding * 0.8), [isSm]);
  const selectionContainerHeight = useMemo(() => selectionFontSize + wordPadding * 2, [selectionFontSize, wordPadding]);
  const wordContainerHeight = useMemo(() => wordFontSize + DEFAULTS.textPadding * 2, [wordFontSize]);

  // fullscreen text size depending on screen resolution
  const fullScreenTextSize = useMemo(() => Math.floor(DEFAULTS.fullScreenTextSize * (isSm ? 0.85 : 1)), [isSm]);

  const showSceneActionElements = useMemo(() => editMode && !previewMode, [editMode, previewMode]);

  return {
    selectionFontSize,
    selectionContainerHeight,
    wordContainerHeight,
    wordFontSize,
    resultNumber,
    DEFAULTS,
    showSceneActionElements,
    predefinedValues,
    wordPadding,
    fullScreenTextSize,
    mathOperand,
    additionalNumbersArray,
    showQuestionMark,
    mathSecondOperand,
    mathThirdOperand,
    operationNumbersArray,
  };
}
