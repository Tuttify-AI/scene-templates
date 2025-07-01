import React, { CSSProperties, forwardRef, Fragment, useCallback, useMemo } from 'react';

import answerImage from "./assets/answer";
import questionImage from "./assets/question";
import { useActions, useAudios, useImage, useQuizAnswers } from '../shared/hooks';

import { Parameters, SceneProps, SceneValue, TemplateParameterType } from '../shared/types';
import { clsx } from '../shared/utils';
import iconCross from './assets/icon-cross.svg';

import iconPlus from './assets/icon-plus.svg';
import styles from './styles.module.css';
import { Quiz1SceneElements, Classes } from './types';

export type QuizOneProps = SceneProps & {
  values?: Quiz1SceneElements<SceneValue>;
  classes?: Classes;
};

const QuizOne = forwardRef<HTMLDivElement, QuizOneProps>(
  ({ editMode, previewMode, classes, activeKey, onClick, values, onAdd, onSet, onActiveElementClick }, ref) => {
    const { hiddenImageList, onImageError, onImageLoad } = useImage();
    const { audios } = useAudios({ values });
    const isActive = useCallback((key: keyof Quiz1SceneElements) => activeKey === key && styles.active, [activeKey]);
    const isPreview = useMemo(() => previewMode && styles.preview, [previewMode]);
    const getEditClass = useCallback(
      (type: 'edit' | 'editText' | 'editRoot' = 'edit') => editMode && styles[type],
      [editMode]
    );

    const getValue = useCallback(
      (element: keyof Quiz1SceneElements, parameter: keyof Parameters) =>
        (values?.[element]?.[parameter] as SceneValue)?.value,
      [values]
    );
    const { handleClick } = useActions({
      onClick,
      getValue,
      disabled: editMode || previewMode,
      audios,
      onActiveElementClick,
    });

    const answers = useMemo(() => Object.keys(values || {}).filter(k => k.startsWith('answer')), [values]);

    const isImageHidden = useCallback(
      (key: keyof Quiz1SceneElements) => hiddenImageList[key] && styles.hidden,
      [hiddenImageList]
    );

    const handleAddAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const lastAnswer = Number(answers[answers.length - 1]?.replace('answer', ''));
        if (lastAnswer && onAdd && lastAnswer < 4) {
            onAdd({
                [`answer${lastAnswer + 1}`]: {
                  title: {
                    type: TemplateParameterType.title,
                    title: `Answer No.${lastAnswer + 1}`,
                    value: `Answer No.${lastAnswer + 1}`,
                  },
                  url: {
                    type: TemplateParameterType.image,
                    title: "Image",
                    value: "",
                  },
                  full_screen_url: {
                    type: TemplateParameterType.image,
                    title: "Fullscreen image",
                    value: "",
                  },
                  text: {
                    type: TemplateParameterType.text,
                    title: "Answer text",
                    value: "Text"
                  },
                  full_screen_text: {
                    type: TemplateParameterType.text,
                    title: "Answer fullscreen text",
                    value: "Text"
                  },
                  background_hover: {
                    type: TemplateParameterType.color,
                    title: "Background hover color",
                    value: "#5468E7",
                  },
                  sound: {
                    type: TemplateParameterType.sound,
                    title: "On click sound link",
                    value: "",
                  },
                  is_correct: {
                    type: TemplateParameterType.boolean,
                    title: "Is correct answer",
                    value: "false"
                  }
                }
            });
        }
    };

    const { handleFullImageClick, handleImageClick, handleDelete, fullImage, getElementData } = useQuizAnswers({
      elements: answers,
      onSet,
      handleAdd: handleAddAnswer,
      values,
      getValue,
      handleClick,
      defaultImages: [questionImage],
      onActiveElementClick,
      previewMode,
      editMode,
    });

    return (
      <div
        id="background"
        onClick={handleClick('background')}
        className={clsx(styles.root, isActive('background'), getEditClass('editRoot'), isPreview, classes?.root)}
        style={{
          backgroundColor: `${getValue('background', 'background')}`,
        }}
        ref={ref}
      >
        {audios && (
          <Fragment>
            {Object.keys(audios).map(audio => (
              <audio
                key={`${audio}_sound`}
                id={`${audio}_sound`}
                ref={audios?.[audio]}
                src={getValue(audio, 'sound') as string}
              />
            ))}
          </Fragment>
        )}
        <div
          className={clsx(
            styles.activeDiv,
            isPreview,
            getEditClass(),
            fullImage.src ? styles.showActiveDiv : styles.hideActiveDiv
          )}
          onClick={handleFullImageClick}
          style={{ background: fullImage.background }}
        >
          <img
            id={fullImage.key}
            alt=""
            src={fullImage.src}
            className={clsx(styles.activeImage, isPreview, getEditClass())}
          />
        </div>
        <button className={clsx(styles.btn, styles.btnAddElement, getEditClass())} onClick={handleAddAnswer}>
          <img className={styles.addElementIcon} src={iconPlus} alt="" />
        </button>
          <div className={clsx(styles.questionRoot, classes?.questionRoot)} onClick={handleClick('question')}>
            <h1
              id="question"
              className={clsx(styles.title, isPreview, classes?.questionText)}
            >
              {getValue('question', 'text')}
            </h1>
            <div className={clsx(styles.questionImageContainer, isPreview, classes?.questionImageContainer)}>
              <img
                id="question_image"
                alt="question image"
                src={`${getValue('question', 'url')}` || questionImage}
                className={clsx(
                  styles.questionImage,
                  isPreview,
                  classes?.questionImage
                )}
                onLoad={() => onImageLoad('question_image')}
                onError={() => onImageError('question_image')}
              />
            </div>
          </div>
          <div className={styles.answerRoot}>
          {answers.map((k, index) => (
            <div className={clsx(styles.answer, isActive(k), isPreview)}  onClick={handleImageClick(k, index)}>
              <div
                id={k}
                className={clsx(styles.element, isActive(k), isPreview, classes?.tile)}
                style={
                  {
                    '--custom_color': getValue(k, 'background_hover'),
                  } as CSSProperties
                }
              >
                {index > answers.length - 1 && (
                  <button
                    className={clsx(styles.btn, styles.btnDeleteElement, getEditClass('edit'))}
                    onClick={e => handleDelete(e, k)}
                  >
                    <img className={styles.deleteElementIcon} src={iconCross} alt="" />
                  </button>
                )}
                <img
                  id={`image_${k}`}
                  alt={`image_${k}`}
                  src={(getValue(`image_${k}`, 'url') as string) || answerImage}
                  onLoad={() => onImageLoad(`image_${k}`)}
                  onError={() => onImageError(`image_${k}`)}
                  className={clsx(
                    styles.tileImage,
                    isActive(`image_${k}`),
                    isImageHidden(`image_${k}`),
                    getEditClass(),
                    isPreview,
                    classes?.tileImage
                  )}
                />
              </div>

              <p
                id={`text_${k}`}
                onClick={handleClick(`text_${k}`, getElementData(k))}
                className={clsx(
                  styles.tileText,
                  isActive(`text_${k}`),
                  getEditClass('editText'),
                  isPreview,
                  classes?.tileText
                )}
              >
                {getValue(`text_${k}`, 'text')}
              </p>
            </div>
          ))}
          </div>
      </div>
    );
  }
);

export default QuizOne;
