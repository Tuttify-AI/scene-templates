import React, { CSSProperties, forwardRef, useCallback, useMemo } from 'react';
import { useActions, useAudios } from '../shared/hooks';

import { SceneProps, SceneValue } from '../shared/types';
import { clsx, getElementId, getElementValue } from '../shared/utils';
import defaultImage from './assets/default';
import useLetterAction from './hooks/use-letter-action';
import useParams from './hooks/use-params';

import styles from './styles.module.css';
import { Classes, GuessWordElements } from './types';
import useDragNDrop from '../shared/hooks/use-drag-n-drop';

export type GuessWordSceneProps = SceneProps & {
  values?: GuessWordElements<SceneValue>;
  classes?: Classes;
};

const GuessWord = forwardRef<HTMLDivElement, GuessWordSceneProps>(
  ({ editMode, previewMode, classes, activeKey, onClick, values, onSet, onActiveElementClick }, ref) => {
    const getValue = useMemo(() => getElementValue<GuessWordElements>(values), [values]);

    const {
      lettersArray,
      selectionLettersWidth,
      answerLettersWidth,
      answerArray,
      selectionFontSize,
      selectionContainerHeight,
      wordContainerHeight,
      wordFontSize,
      wordArray,
      lockCorrectSelection,
      highlightCorrectSelection,
      highlightIncorrectSelection,
      fullScreenTextSize,
      wordPadding,
    } = useParams({
      values,
      previewMode,
      editMode,
      onSet,
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
      totalLettersArray: lettersArray,
      editMode,
      wordArray,
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
    const isActive = useCallback((key: keyof GuessWordElements) => activeKey === key && styles.active, [activeKey]);
    const isPreview = useMemo(() => previewMode && styles.preview, [previewMode]);
    const highlightSelection = useCallback(
      (index: number) => (lockCorrectSelection ? !checkIfCorrectLetter(index) : true),
      [checkIfCorrectLetter, lockCorrectSelection]
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
          {lettersArray.map((letter, index) => (
            <div
              key={index}
              className={clsx(
                styles.selectionLetterItemWrapper,
                selectedLetterIndex === index && styles.selected,
                checkIsLetterDisabled(index) && styles.disabled
              )}
              style={{
                width: `${selectionLettersWidth}%`,
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
                  dragSelectedIndex === index && styles.dragged
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
                  className={clsx(
                    styles.answerLetterItem,
                    selectedLetterIndex !== null && highlightSelection(index) && styles.empty,
                    dragTargetIndex === index && highlightSelection(index) && styles.empty,
                    highlightCorrectSelection && checkIfCorrectLetter(index) && styles.correct,
                    highlightIncorrectSelection && checkIfCorrectLetter(index) === false && styles.incorrect
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
                      height: wordContainerHeight,
                      color: getValue('answer_text', 'text_color') as string,
                      '--highlightSuccessColor': getValue('answer_text', 'success_highlight_color'),
                      '--highlightErrorColor': getValue('answer_text', 'error_highlight_color'),
                    } as CSSProperties
                  }
                >
                  {answerIndex !== null && lettersArray[answerIndex]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default GuessWord;
