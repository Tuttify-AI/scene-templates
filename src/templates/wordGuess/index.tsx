import React, { forwardRef, useCallback, useMemo } from 'react';
import { useActions, useAudios } from '../shared/hooks';

import { SceneProps, SceneValue } from '../shared/types';
import { clsx, getElementId, getElementValue } from '../shared/utils';
import defaultImage from './assets/default';
import useLetterAction from './hooks/use-letter-action';
import useParams from './hooks/use-params';

import styles from './styles.module.css';
import { Classes, GuessWordElements } from './types';

export type GuessWordSceneProps = SceneProps & {
  values?: GuessWordElements<SceneValue>;
  classes?: Classes;
};

const GuessWord = forwardRef<HTMLDivElement, GuessWordSceneProps>(
  ({ editMode, previewMode, classes, activeKey, onClick, values, onSet, onActiveElementClick }, ref) => {
    const getValue = useMemo(() => getElementValue<GuessWordElements>(values), [values]);

    const { lettersArray, selectionLettersWidth, answerLettersWidth, answerArray, letterFontSize, wordArray } =
      useParams({
        values,
        previewMode,
        editMode,
        onSet,
      });

    //const selectedLetterIndex = useState<number | null>();
    const {
      handleSetAnswer,
      handleLetterClick,
      selectedLetterIndex,
      answer,
      checkIsLetterDisabled,
      isFullAnswer,
      handleFullImageClick,
      fullScreen,
    } = useLetterAction({
      answerArray,
      totalLettersArray: lettersArray,
      editMode,
      wordArray,
      values,
    });
    /* const { hiddenImageList } = useImage();*/
    const { renderAudios, handlePauseAll } = useAudios({ values });
    const getEditClass = useCallback(
      (type: 'edit' | 'editRoot' = 'edit') => editMode && styles[type as keyof typeof styles],
      [editMode]
    );

    const { handleClick } = useActions({
      onClick,
      handlePauseAll,
      disabled: editMode || previewMode,
      onActiveElementClick,
    });
    const isActive = useCallback((key: keyof GuessWordElements) => activeKey === key && styles.active, [activeKey]);
    const isPreview = useMemo(() => previewMode && styles.preview, [previewMode]);
    /* const isImageHidden = useCallback(
      (key: keyof GuessWordElements, imageListKey?: string, parameter: keyof Parameters = 'url') => {
        const hiddenImageListKey = imageListKey || key;
        return (hiddenImageList[hiddenImageListKey] || !getValue(key, parameter)) && styles.hidden;
      },
      [hiddenImageList, getValue]
    );*/

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
            id={getElementId(`fullscreenText`, previewMode)}
            className={clsx(styles.fullScreenText, isPreview, classes?.fullScreenText)}
          >
            {fullScreen.text}
          </h2>
          <div
            /*id={fullImage.key}*/
            style={{
              backgroundImage: `url(${fullScreen.src})`,
            }}
            className={clsx(styles.activeImage, styles.image, isPreview, getEditClass(), classes?.fullScreenImage)}
          />
        </div>
        <div
          className={clsx(styles.selectionLetters, isPreview, getEditClass())}
          onClick={handleClick('selection_text')}
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
                onClick={handleLetterClick(index)}
                className={clsx(styles.selectionLetterItem, !editMode && styles.withHover)}
                style={{
                  fontSize: letterFontSize,
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
                }}
              >
                <p
                  className={clsx(styles.answerLetterItem)}
                  onClick={handleSetAnswer(index)}
                  style={{
                    fontSize: letterFontSize,
                    color: getValue('answer_text', 'text_color') as string,
                  }}
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
