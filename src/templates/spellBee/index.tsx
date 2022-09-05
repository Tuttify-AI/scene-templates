import React, { CSSProperties, forwardRef, useCallback, useMemo } from 'react';
import { useActions, useAudios } from '../shared/hooks';

import { SceneProps, SceneValue } from '../shared/types';
import { clsx, getElementId, getElementValue } from '../shared/utils';
import defaultImage from './assets/default';
import useLetterAction from './hooks/use-letter-action';
import useParams from './hooks/use-params';

import styles from './styles.module.css';
import { AnswerType, Classes, SpellBeeElements } from './types';
import useDragNDrop from '../shared/hooks/use-drag-n-drop';
import { ReactComponent as IconPlus } from '../shared/assets/icon-plus.svg';

export type SpellBeeSceneProps = SceneProps & {
  values?: SpellBeeElements<SceneValue>;
  classes?: Classes;
  useArray?: boolean;
};

const SpellBee = forwardRef<HTMLDivElement, SpellBeeSceneProps>(
  (
    { editMode, previewMode, classes, activeKey, onClick, values, onSet, onActiveElementClick, onComplete, useArray },
    ref
  ) => {
    const getValue = useMemo(() => getElementValue<SpellBeeElements>(values), [values]);

    const {
      totalItemsArray,
      selectionItemsWidth,
      answerLettersWidth,
      answerArray,
      selectionFontSize,
      selectionContainerHeight,
      wordContainerHeight,
      wordFontSize,
      itemsArray,
      lockCorrectSelection,
      highlightCorrectSelection,
      highlightIncorrectSelection,
      fullScreenTextSize,
      wordPadding,
      predefinedTotalItemIndexes,
      isPredefinedIndex,
      allowPredefine,
      handlePredefinedTotalItemIndexes,
    } = useParams({
      values,
      previewMode,
      editMode,
      onSet,
      useArray,
    });
    const { renderAudios, handlePauseAll } = useAudios({ values });
    const { handleClick, handleComplete } = useActions({
      onClick,
      handlePauseAll,
      disabled: editMode || previewMode,
      onActiveElementClick,
      onComplete,
    });

    const {
      handleSetAnswer,
      handleLetterClick,
      selectedLetterIndex,
      answer,
      checkIsLetterDisabled,
      isFullAnswer,
      handleFullImageClick,
      fullScreen,
      checkIfCorrectLetter,
    } = useLetterAction({
      answerArray,
      totalItemsArray,
      editMode,
      itemsArray,
      values,
      lockCorrectSelection,
      handleClick,
      predefinedTotalItemIndexes,
    });
    const { onDrop, onDragEnter, onDragLeave, dragTargetItem, onDragStart, dragSelectedItem, onDragEnd, onDragOver } =
      useDragNDrop({ handleDrop: handleSetAnswer });
    const getEditClass = useCallback(
      (type: 'edit' | 'editRoot' = 'edit') => editMode && styles[type as keyof typeof styles],
      [editMode]
    );
    const isActive = useCallback((key: keyof SpellBeeElements) => activeKey === key && styles.active, [activeKey]);
    const isPreview = useMemo(() => previewMode && styles.preview, [previewMode]);
    const highlightSelection = useCallback(
      (index: number) => (lockCorrectSelection ? !checkIfCorrectLetter(index) : true),
      [checkIfCorrectLetter, lockCorrectSelection]
    );

    const answerLetterClasses = useCallback(
      (answerIndex: AnswerType, index: number) => {
        return isPredefinedIndex(answerIndex)
          ? [styles.predefinedAnswer]
          : [
              selectedLetterIndex !== null && highlightSelection(index) && styles.empty,
              dragTargetItem === index && highlightSelection(index) && styles.empty,
              highlightCorrectSelection && checkIfCorrectLetter(index) && styles.correct,
              highlightIncorrectSelection && checkIfCorrectLetter(index) === false && styles.incorrect,
            ];
      },
      [
        checkIfCorrectLetter,
        highlightCorrectSelection,
        highlightIncorrectSelection,
        dragTargetItem,
        selectedLetterIndex,
        highlightSelection,
        isPredefinedIndex,
      ]
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
          className={clsx(styles.selectionLetters, isPreview, getEditClass())}
          onClick={handleClick('selection_text')}
          id={getElementId(`selection_text`, previewMode)}
        >
          {totalItemsArray.map((letter, index) => (
            <div
              key={index}
              className={clsx(
                styles.selectionLetterItemWrapper,
                isPredefinedIndex(index) && styles.predefinedItem,
                selectedLetterIndex === index && styles.selected,
                checkIsLetterDisabled(index) && styles.disabled
              )}
              style={{
                width: useArray ? 'auto' : `${selectionItemsWidth}%`,
              }}
            >
              <p
                onDragStart={onDragStart(index)}
                onDragEnd={onDragEnd}
                draggable={!editMode && !checkIsLetterDisabled(index)}
                id={getElementId(`text_${letter}`, previewMode)}
                onClick={handleLetterClick(index)}
                className={clsx(
                  styles.selectionLetterItem,
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
          <div
            id={getElementId(`image`, previewMode)}
            className={clsx(styles.image, getEditClass(), isPreview)}
            style={{ backgroundImage: `url(${getValue('image', 'url') || defaultImage})` }}
            onClick={handleClick('image', { data: { imageUrl: getValue('image', 'url') as string } })}
          />
          <div
            className={clsx(styles.answerTextWrapper, getEditClass(), isPreview)}
            onClick={handleClick('answer_text')}
          >
            {answer?.map((answerIndex, index) => (
              <div
                key={index}
                className={clsx(styles.answerLetterItemWrapper)}
                style={{
                  width: `${answerLettersWidth}%`,
                  padding: wordPadding,
                }}
              >
                <p
                  id={getElementId(`answer_${answerIndex}`, previewMode)}
                  className={clsx(styles.answerLetterItem, ...answerLetterClasses(answerIndex, index))}
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                  onDragEnter={onDragEnter(index)}
                  onDragLeave={onDragLeave}
                  onClick={handleSetAnswer(index)}
                  style={
                    {
                      padding: wordPadding,
                      fontSize: wordFontSize,
                      height: wordContainerHeight,
                      color: getValue('answer_text', 'text_color') as string,
                      '--highlightSuccessColor': getValue('answer_text', 'success_highlight_color'),
                      '--highlightErrorColor': getValue('answer_text', 'error_highlight_color'),
                    } as CSSProperties
                  }
                >
                  {answerIndex !== null && totalItemsArray[answerIndex]}
                </p>
                {allowPredefine(answerIndex) && editMode && (
                  <div
                    onClick={handlePredefinedTotalItemIndexes(index)}
                    className={clsx(styles.answerPredefinedBox, isPreview)}
                  >
                    {isPredefinedIndex(answerIndex) ? null : <IconPlus className={clsx(styles.answerPredefinedIcon)} />}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default SpellBee;
