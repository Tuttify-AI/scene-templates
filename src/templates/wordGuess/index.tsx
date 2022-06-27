import React, { forwardRef, useCallback, useMemo } from 'react';
import defaultImage from './assets/default';
import { useActions, useAudios } from '../shared/hooks';

import { SceneProps, SceneValue } from '../shared/types';
import { clsx, getElementId, getElementValue } from '../shared/utils';
import useParams from './hooks/use-params';
import useLetterAction from './hooks/useLetterAction';

import styles from './styles.module.css';
import { Classes, GuessWordElements } from './types';

export type GuessWordSceneProps = SceneProps & {
  values?: GuessWordElements<SceneValue>;
  classes?: Classes;
};

const GuessWord = forwardRef<HTMLDivElement, GuessWordSceneProps>(
  ({ editMode, previewMode, classes, activeKey, onClick, values, onSet, onActiveElementClick }, ref) => {
    const { lettersArray, selectionLettersWidth, answerLettersWidth, answerArray, letterFontSize } = useParams({
      values,
      previewMode,
      editMode,
      onSet,
    });

    //const selectedLetterIndex = useState<number | null>();
    const { handleSetAnswer, handleLetterClick, selectedLetterIndex, answer, checkIsLetterDisabled } = useLetterAction({
      answerArray,
      totalLettersArray: lettersArray,
      editMode,
    });
    /* const { hiddenImageList } = useImage();*/
    const { renderAudios, handlePauseAll } = useAudios({ values });
    const getEditClass = useCallback(
      (type: 'edit' | 'editRoot' = 'edit') => editMode && styles[type as keyof typeof styles],
      [editMode]
    );

    const getValue = useMemo(() => getElementValue<GuessWordElements>(values), [values]);

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
          <div className={clsx(styles.imageWrapper)}>
            <img
              alt="image"
              id={getElementId(`image`, previewMode)}
              src={`${getValue('image', 'url') || defaultImage}`}
              className={clsx(styles.image, getEditClass(), isPreview)}
              onClick={handleClick('image', { data: { imageUrl: getValue('image', 'url') as string } })}
            />
          </div>
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
