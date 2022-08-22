import React, { CSSProperties, forwardRef, useCallback, useMemo } from 'react';
import { useActions, useAudios } from '../shared/hooks';
import useDragNDrop from '../shared/hooks/use-drag-n-drop';

import { SceneProps, SceneValue } from '../shared/types';
import { clsx, getElementId, getElementValue } from '../shared/utils';
import defaultImage from './assets/default';
import useNumbersAction from './hooks/use-numbers-action';
import useParams from './hooks/use-params';

import styles from './styles.module.css';
import { Classes, CountingElements } from './types';

export type MathBaseSceneProps = SceneProps & {
  values?: CountingElements<SceneValue>;
  classes?: Classes;
  useArray?: boolean;
};

const MathBase = forwardRef<HTMLDivElement, MathBaseSceneProps>(
  ({ editMode, previewMode, classes, activeKey, onClick, values, onSet, onActiveElementClick }, ref) => {
    const getValue = useMemo(() => getElementValue<CountingElements>(values), [values]);
    const useArray = true;
    const {
      totalItemsArray,
      selectionNumbersWidth,
      additionalNumbers,
      answerArray,
      selectionFontSize,
      selectionContainerHeight,
      resultNumber,
      leftNumber,
      rightNumber,
      wordFontSize,
      lockCorrectSelection,
      fullScreenTextSize,
      wordPadding,
      answerValueArray,
    } = useParams({
      values,
      previewMode,
      editMode,
      onSet,
      useArray,
    });
    const { renderAudios, handlePauseAll } = useAudios({ values });
    const { handleClick } = useActions({
      onClick,
      handlePauseAll,
      disabled: editMode || previewMode,
      onActiveElementClick,
    });

    const {
      handleSetAnswer,
      handleNumberClick,
      selectedNumberIndex,
      answer,
      checkIsNumberDisabled,
      isFullAnswer,
      handleFullImageClick,
      fullScreen,
    } = useNumbersAction({
      answerArray,
      totalItemsArray,
      additionalNumbers,
      answerValueArray,
      editMode,
      resultNumber,
      leftNumber,
      rightNumber,
      values,
      lockCorrectSelection,
      handleClick,
    });
    const { onDrop, onDragEnter, onDragLeave, dragTargetIndex, onDragStart, dragSelectedIndex, onDragEnd, onDragOver } =
      useDragNDrop({ handleDrop: handleSetAnswer });
    const getEditClass = useCallback(
      (type: 'edit' | 'editRoot' = 'edit') => editMode && styles[type as keyof typeof styles],
      [editMode]
    );
    const isActive = useCallback((key: keyof CountingElements) => activeKey === key && styles.active, [activeKey]);
    const isPreview = useMemo(() => previewMode && styles.preview, [previewMode]);
    /*  const highlightSelection = useCallback(
      (index: number) => (lockCorrectSelection ? !checkIfCorrectNumber(index) : true),
      [checkIfCorrectNumber, lockCorrectSelection]
    );*/
    console.log('answer', answer);

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
          {additionalNumbers.map((letter, index) => (
            <div
              key={index}
              className={clsx(
                styles.selectionNumberItemWrapper,
                selectedNumberIndex === index && styles.selected,
                checkIsNumberDisabled(index) && styles.disabled
              )}
              style={{
                width: `${selectionNumbersWidth}%`,
              }}
            >
              <p
                onDragStart={onDragStart(index)}
                onDragEnd={onDragEnd}
                draggable={!editMode && !checkIsNumberDisabled(index)}
                id={getElementId(`text_${letter}`, previewMode)}
                onClick={handleNumberClick(index)}
                className={clsx(
                  styles.selectionNumberItem,
                  !editMode && styles.withHover,
                  dragSelectedIndex === index && styles.dragged,
                  useArray && styles.wordText
                )}
                style={{
                  fontSize: selectionFontSize,
                  height: selectionContainerHeight,
                  color: getValue('selection_text', 'text_color') as string,
                }}
              >
                {letter}
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
          {answer?.map((answerIndex, index) => (
            <div
              key={index}
              className={clsx(styles.answerNumberItemWrapper)}
              style={{
                padding: wordPadding,
              }}
            >
              <p
                id={getElementId(`answer_${answerIndex}`, previewMode)}
                className={clsx(
                  styles.answerNumberItem,
                  selectedNumberIndex !== null && styles.empty,
                  dragTargetIndex === index && styles.empty
                  /* highlightCorrectSelection && checkIfCorrectNumber(index) && styles.correct,
                  highlightIncorrectSelection && checkIfCorrectNumber(index) === false && styles.incorrect*/
                )}
                onDragOver={onDragOver}
                onDrop={onDrop}
                onDragEnter={onDragEnter(index)}
                onDragLeave={onDragLeave}
                onClick={handleSetAnswer(index)}
                style={
                  {
                    padding: wordPadding,
                    fontSize: wordFontSize,
                    color: getValue('answer_text', 'text_color') as string,
                    '--highlightSuccessColor': getValue('answer_text', 'success_highlight_color'),
                    '--highlightErrorColor': getValue('answer_text', 'error_highlight_color'),
                  } as CSSProperties
                }
              >
                {answerIndex !== null && answerValueArray[answerIndex]}
                {/*{answerIndex}*/}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default MathBase;
