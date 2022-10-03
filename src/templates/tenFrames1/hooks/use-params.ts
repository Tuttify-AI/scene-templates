import { useCallback, useMemo, useEffect } from 'react';
import { useWindowSize } from '../../shared/hooks';
import { DefaultType, SceneProps, SceneValue } from '../../shared/types';
import { getElement, getElementValue, getNumber } from '../../shared/utils';
import { TenFramesBaseConfig } from '../types';

type Params = Pick<SceneProps, 'values' | 'previewMode' | 'editMode' | 'onSet'>;

const DEFAULTS = {
  selectionTextSize: 72,
  selectionWordSize: 38,
  wordTextSize: 72,
  wordSize: 42,
  fullScreenTextSize: 40,
  textPadding: 8,
};

export default function useParams({ values, previewMode, editMode, onSet }: Params) {
  const { isSm, isMd } = useWindowSize();

  const getConfig = useCallback(
    (parameter: keyof TenFramesBaseConfig) => getElement(values)('config', parameter),
    [values]
  );

  const getConfigValue = useCallback(
    (parameter: keyof TenFramesBaseConfig) => getElementValue(values)('config', parameter),
    [values]
  );

  const onSetConfig = useCallback(
    (key: keyof TenFramesBaseConfig, value: SceneValue['value'], parameter: keyof SceneValue = 'value') => {
      onSet &&
        values &&
        onSet({ ...values, config: { ...values.config, [key]: { ...values.config[key], [parameter]: value } } });
    },
    [onSet, values]
  );

  const operationNumbersArray = useMemo(
    () =>
      ([getConfig('number_1'), getConfig('number_2'), getConfig('number_3'), getConfig('number_4')] as SceneValue[])
        .filter(c => !c.hidden)
        .map(c => c.value as DefaultType),
    [getConfig]
  );

  const totalNumbers = useMemo(() => Number(getConfigValue('total_digits')), [getConfigValue]);

  useEffect(() => {
    const showNumber3 = totalNumbers > 2;
    const hideNumber3 = totalNumbers < 3;
    const showNumber4 = totalNumbers > 3;
    const hideNumber4 = totalNumbers < 4;
    if (getConfig('number_3')?.hidden && showNumber3) {
      onSetConfig('number_3', false, 'hidden');
      getConfig('math_second_operand')?.hidden && onSetConfig('math_second_operand', false, 'hidden');
    }
    if (!getConfig('number_3')?.hidden && hideNumber3) {
      onSetConfig('number_3', true, 'hidden');
      getConfig('number_3')?.value && onSetConfig('number_3', '', 'value');
      !getConfig('math_second_operand')?.hidden && onSetConfig('math_second_operand', true, 'hidden');
    }
    if (getConfig('number_4')?.hidden && showNumber4) {
      onSetConfig('number_4', false, 'hidden');
      getConfig('math_third_operand')?.hidden && onSetConfig('math_third_operand', false, 'hidden');
    }
    if (!getConfig('number_4')?.hidden && hideNumber4) {
      onSetConfig('number_4', true, 'hidden');
      getConfig('number_4')?.value && onSetConfig('number_4', '', 'value');
      !getConfig('math_third_operand')?.hidden && onSetConfig('math_third_operand', true, 'hidden');
    }
  }, [totalNumbers, onSetConfig, getConfig]);

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
    () => ({ numbers: operationNumbersArray, resultNumber }),
    [operationNumbersArray, resultNumber]
  );

  const selectionFontSize = useMemo(
    () =>
      Math.floor(
        isSm ? DEFAULTS.selectionTextSize * 0.55 : isMd ? DEFAULTS.selectionTextSize * 0.75 : DEFAULTS.selectionTextSize
      ),
    [isSm, isMd]
  );
  const wordFontSize = useMemo(
    () => Math.floor(isSm ? DEFAULTS.wordTextSize * 0.35 : isMd ? DEFAULTS.wordTextSize * 0.55 : DEFAULTS.wordTextSize),
    [isSm, isMd]
  );

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
