import React, { CSSProperties, forwardRef, useCallback, useMemo } from 'react';
import { useActions, useAudios } from '../shared/hooks';
import useDragNDrop from '../shared/hooks/use-drag-n-drop';

import { DefaultType, SceneProps, SceneValue } from '../shared/types';
import { clsx, getElementId, getElementValue } from '../shared/utils';
import defaultImage from './assets/default';
import useNumbersAction from './hooks/use-numbers-action';
import useParams from './hooks/use-params';

import styles from './styles.module.css';
import { Classes, CountingElements } from './types';
import useAnswerTimer from '../shared/hooks/use-answer-timer';

export type MathBaseSceneProps = SceneProps & {
  values?: CountingElements<SceneValue>;
  classes?: Classes;
  useArray?: boolean;
};

const MathBase = forwardRef<HTMLDivElement, MathBaseSceneProps>(
  (
    { editMode, previewMode, classes, activeKey, onClick, onComplete, values, onActiveElementClick, onSceneSolved },
    ref
  ) => {
    const getValue = useMemo(() => getElementValue<CountingElements>(values), [values]);
    const { getUserAnswerTime, clearTimer } = useAnswerTimer();
    const {
      predefinedValues,
      selectionFontSize,
      selectionContainerHeight,
      wordFontSize,
      fullScreenTextSize,
      wordPadding,
      mathOperand,
      additionalNumbersArray,
      showQuestionMark,
    } = useParams({
      values,
      previewMode,
      editMode,
    });
    const { renderAudios, handleElementAudio } = useAudios({ values, previewMode });
    const { handleClick, handleComplete, handleSceneSolved } = useActions({
      onClick,
      handlePauseAll: handleElementAudio,
      disabled: editMode || previewMode,
      onActiveElementClick,
      onComplete,
      onSceneSolved,
      clearTimer,
    });

    const {
      handleSetAnswer,
      handleNumberClick,
      selectedNumber,
      answer,
      isFullAnswer,
      handleFullImageClick,
      fullScreen,
    } = useNumbersAction({
      predefinedValues,
      editMode,
      values,
      handleClick,
      mathOperand,
      getUserAnswerTime,
      handleSceneSolved,
      handleComplete,
    });
    const { onDrop, onDragEnter, onDragLeave, dragTargetItem, onDragStart, dragSelectedItem, onDragEnd, onDragOver } =
      useDragNDrop({ handleDrop: handleSetAnswer });
    const getEditClass = useCallback(
      (type: 'edit' | 'editRoot' = 'edit') => editMode && styles[type as keyof typeof styles],
      [editMode]
    );
    const isActive = useCallback((key: keyof CountingElements) => activeKey === key && styles.active, [activeKey]);
    const isPreview = useMemo(() => previewMode && styles.preview, [previewMode]);

    const renderNumber = (type: keyof typeof answer, value: DefaultType) => (
      <div
        key={type}
        className={clsx(styles.answerNumberItemWrapper)}
        style={{
          padding: wordPadding,
        }}
      >
        <p
          id={getElementId(type, previewMode)}
          className={clsx(
            styles.answerNumberItem,
            (selectedNumber !== null || dragTargetItem === type) && !predefinedValues[type] && styles.empty
          )}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onDragEnter={onDragEnter(type)}
          onDragLeave={onDragLeave}
          onClick={handleSetAnswer(type)}
          style={
            {
              padding: wordPadding,
              fontSize: wordFontSize,
              height: selectionContainerHeight,
              color: getValue('answer_text', 'text_color') as string,
            } as CSSProperties
          }
        >
          {value ?? (showQuestionMark ? <span className={styles.questionMark}>?</span> : '')}
        </p>
      </div>
    );

    const renderOperand = (operand: string) => (
      <div
        className={styles.operand}
        style={{ fontSize: wordFontSize, color: getValue('answer_text', 'text_color') as string }}
      >
        {operand}
      </div>
    );

    return (
      <div
        id={getElementId('background', previewMode)}
        onClick={handleClick('background')}
        className={clsx(styles.root, isActive('background'), getEditClass('editRoot'), isPreview, classes?.root)}
        style={{
          backgroundColor: `${getValue('background', 'background')}`,
        }}
        ref={ref}
      >
        {renderAudios()}
        <div
          className={clsx(
            styles.activeDiv,
            isPreview,
            getEditClass(),
            isFullAnswer ? styles.showActiveDiv : styles.hideActiveDiv
          )}
          style={{
            backgroundColor: fullScreen.backgroundColor,
          }}
          onClick={handleFullImageClick}
        >
          <h2
            style={{
              fontSize: fullScreenTextSize,
              lineHeight: `${fullScreenTextSize}px`,
              color: fullScreen.textColor,
            }}
            id={getElementId(`fullscreenText`, previewMode)}
            className={clsx(styles.fullScreenText, isPreview, classes?.fullScreenText)}
          >
            {fullScreen.text}
          </h2>
          {fullScreen.src && (
            <div
              id={getElementId(`fullscreenImage`, previewMode)}
              style={{
                backgroundImage: `url(${fullScreen.src})`,
              }}
              className={clsx(styles.activeImage, styles.image, isPreview, getEditClass(), classes?.fullScreenImage)}
            />
          )}
        </div>
        <div
          className={clsx(styles.selectionNumbers, isPreview, getEditClass())}
          onClick={handleClick('selection_text')}
          id={getElementId(`selection_text`, previewMode)}
        >
          {additionalNumbersArray.map((number, index) => (
            <div
              key={index}
              className={clsx(styles.selectionNumberItemWrapper, selectedNumber === number && styles.selected)}
            >
              <p
                onDragStart={onDragStart(number)}
                onDragEnd={onDragEnd}
                draggable={!editMode}
                id={getElementId(`text_${number}`, previewMode)}
                onClick={handleNumberClick(number)}
                className={clsx(
                  styles.selectionNumberItem,
                  !editMode && styles.withHover,
                  dragSelectedItem === number && styles.dragged,
                  styles.wordText
                )}
                style={{
                  fontSize: selectionFontSize,
                  height: selectionContainerHeight,
                  color: getValue('selection_text', 'text_color') as string,
                }}
              >
                {number}
              </p>
            </div>
          ))}
        </div>
        <div className={clsx(styles.wrapper)}>
          <div
            id={getElementId(`image`, previewMode)}
            className={clsx(styles.image, getEditClass(), isPreview)}
            style={{ backgroundImage: `url(${getValue('image', 'url') || defaultImage})` }}
            onClick={handleClick('image', { data: { imageUrl: getValue('image', 'url') as string } })}
          />
        </div>
        <div className={clsx(styles.answerTextWrapper, getEditClass(), isPreview)} onClick={handleClick('answer_text')}>
          {renderNumber('leftNumber', answer?.leftNumber)}
          {renderOperand(mathOperand)}
          {renderNumber('rightNumber', answer?.rightNumber)}
          {renderOperand('=')}
          {renderNumber('resultNumber', answer?.resultNumber)}
        </div>
      </div>
    );
  }
);

export default MathBase;
