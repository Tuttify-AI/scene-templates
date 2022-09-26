import React, { CSSProperties, forwardRef, useCallback, useMemo } from 'react';
import { useActions, useAudios } from '../shared/hooks';

import { SceneProps, SceneValue } from '../shared/types';
import { clsx, getElementId, getElementValue } from '../shared/utils';
import defaultImage from './assets/default';
import useNumbersAction from './hooks/use-numbers-action';
import useParams from './hooks/use-params';

import styles from './styles.module.css';
import { Classes, CountingElements } from './types';
import useDragNDrop from '../shared/hooks/use-drag-n-drop';
import useAnswerTimer from '../shared/hooks/use-answer-timer';

export type CountingSceneProps = SceneProps & {
  values?: CountingElements<SceneValue>;
  classes?: Classes;
};

const Counting = forwardRef<HTMLDivElement, CountingSceneProps>(
  (
    {
      editMode,
      previewMode,
      classes,
      activeKey,
      onClick,
      values,
      onSet,
      onActiveElementClick,
      onSceneSolved,
      onComplete,
    },
    ref
  ) => {
    const getValue = useMemo(() => getElementValue<CountingElements>(values), [values]);
    const {
      totalItemsArray,
      selectionNumbersWidth,
      answerArray,
      selectionFontSize,
      selectionContainerHeight,
      wordFontSize,
      itemsArray,
      lockCorrectSelection,
      highlightCorrectSelection,
      highlightIncorrectSelection,
      fullScreenTextSize,
      wordPadding,
      itemsCountArray,
      itemImageWidth,
      itemImageHeight,
    } = useParams({
      values,
      previewMode,
      editMode,
      onSet,
    });
    const { renderAudios, handleElementAudio, pauseAudios } = useAudios({ values, previewMode });
    const { getUserAnswerTime, clearTimer } = useAnswerTimer(previewMode || editMode);
    const { handleClick, handleComplete, handleSceneSolved } = useActions({
      onClick,
      disabled: editMode || previewMode,
      onActiveElementClick,
      onComplete,
      onSceneSolved,
      clearTimer,
      pauseAudios,
      handleElementAudio,
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
      checkIfCorrectNumber,
    } = useNumbersAction({
      answerArray,
      totalItemsArray,
      editMode,
      itemsArray,
      values,
      lockCorrectSelection,
      handleClick,
      handleComplete,
      getUserAnswerTime,
      handleSceneSolved,
    });
    const { onDrop, onDragEnter, onDragLeave, dragTargetItem, onDragStart, dragSelectedItem, onDragEnd, onDragOver } =
      useDragNDrop({ handleDrop: handleSetAnswer });
    const getEditClass = useCallback(
      (type: 'edit' | 'editRoot' = 'edit') => editMode && styles[type as keyof typeof styles],
      [editMode]
    );
    const isActive = useCallback((key: keyof CountingElements) => activeKey === key && styles.active, [activeKey]);
    const isPreview = useMemo(() => previewMode && styles.preview, [previewMode]);
    const highlightSelection = useCallback(
      (index: number) => (lockCorrectSelection ? !checkIfCorrectNumber(index) : true),
      [checkIfCorrectNumber, lockCorrectSelection]
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
          {totalItemsArray.map((letter, index) => (
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
                  dragSelectedItem === index && styles.dragged
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
          {itemsCountArray.map(item => (
            <div
              key={item}
              id={getElementId(`image`, previewMode)}
              className={clsx(styles.image, getEditClass(), isPreview)}
              style={{
                backgroundImage: `url(${getValue('image', 'url') || defaultImage})`,
                width: `${itemImageWidth}%`,
                height: `${itemImageHeight}%`,
              }}
              onClick={handleClick('image', { data: { imageUrl: getValue('image', 'url') as string } })}
            />
          ))}
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
                  selectedNumberIndex !== null && highlightSelection(index) && styles.empty,
                  dragTargetItem === index && highlightSelection(index) && styles.empty,
                  highlightCorrectSelection && checkIfCorrectNumber(index) && styles.correct,
                  highlightIncorrectSelection && checkIfCorrectNumber(index) === false && styles.incorrect
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
                {answerIndex !== null && totalItemsArray[answerIndex]}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default Counting;
