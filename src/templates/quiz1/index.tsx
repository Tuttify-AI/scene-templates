import React, { forwardRef, Fragment, useCallback, useMemo } from 'react';
import { useActions, useAudios, useImage, useQuizAnswers } from '../shared/hooks';

import { Parameters, SceneProps, SceneValue, TemplateParameterType } from '../shared/types';
import { clsx } from '../shared/utils';

import answerImage from "./assets/answer";
import iconCross from './assets/icon-cross.svg';

import iconPlus from './assets/icon-plus.svg';
import questionImage from "./assets/question";
import styles from './styles.module.css';
import { Classes, Quiz1SceneElements } from './types';

export type QuizOneProps = SceneProps & {
  values?: Quiz1SceneElements<SceneValue>;
  classes?: Classes;
};

const MAX_ANSWERS = 6;
const MIN_ANSWERS = 2;

const QuizOne = forwardRef<HTMLDivElement, QuizOneProps>(
  ({editMode, previewMode, classes, activeKey, onClick, values, onAdd, onSet, onActiveElementClick}, ref) => {
    const {hiddenImageList, onImageError, onImageLoad} = useImage();
    const {audios} = useAudios({values});
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
    const {handleClick} = useActions({
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
      if (lastAnswer && onAdd && lastAnswer < MAX_ANSWERS) {
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
            background: {
              type: TemplateParameterType.color,
              title: "Fullscreen background color",
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

    const {handleFullImageClick, handleImageClick, handleDelete, fullImage} = useQuizAnswers({
      elements: answers,
      onSet,
      handleAdd: handleAddAnswer,
      values,
      getValue,
      handleClick,
      defaultImages: [answerImage],
      onActiveElementClick,
      previewMode,
      editMode,
    });

    const answerStyles = useMemo(() =>
      answers.length > 4
        ? {width: '50%', height: '33.3%'}
        : answers.length > 2
          ? {width: '50%', height: '50%'}
          : {width: '100%', height: '50%'},
      [answers])

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
          style={{background: fullImage.background}}
        >
          <h2
            id="question"
            className={clsx(styles.fullScreenText, isPreview, classes?.fullScreenText)}
          >
            {fullImage.text}
          </h2>
          <div
            id={fullImage.key}
            style={{backgroundImage: `url(${fullImage.src})`}}
            className={clsx(styles.activeImage, styles.image, isPreview, getEditClass(), classes?.fullScreenImage)}
          />
        </div>
        {answers.length < MAX_ANSWERS ? (
          <button className={clsx(styles.btn, styles.btnAddElement, getEditClass())} onClick={handleAddAnswer}>
            <img className={styles.addElementIcon} src={iconPlus} alt=""/>
          </button>) : null}
        <div
          className={clsx(styles.questionRoot, getEditClass(), classes?.questionRoot)}
          onClick={handleClick('question')}
        >
          <h1
            id="question"
            className={clsx(styles.title, isPreview, classes?.questionText)}
          >
            {getValue('question', 'text')}
          </h1>
          <div className={clsx(styles.imageContainer, isPreview, classes?.questionImageContainer)}>
            <div
              id="question_image"
              style={{backgroundImage: `url(${`${getValue('question', 'url')}` || questionImage})`}}
              className={clsx(
                styles.image,
                isPreview,
                classes?.questionImage
              )}
              onLoad={() => onImageLoad('question_image')}
              onError={() => onImageError('question_image')}
            />
          </div>
        </div>
        <div className={clsx(styles.answerRoot, classes?.answersRoot)}>
          {answers.map((k, index) => (
            <div key={k} className={clsx(styles.answer, isActive(k), isPreview, getEditClass(), classes?.answerRoot)} onClick={handleImageClick(k, index)} style={answerStyles}>
              <div
                id={k}
                className={clsx(styles.element, isPreview, classes?.answer)}
              >
                {answers.length > MIN_ANSWERS && (
                  <button
                    className={clsx(styles.btn, styles.btnDeleteElement, getEditClass('edit'))}
                    onClick={e => handleDelete(e, k)}
                  >
                    <img className={styles.deleteElementIcon} src={iconCross} alt=""/>
                  </button>
                )}
                <p
                  id={`text_${k}`}
                  className={clsx(
                    styles.answerText,
                    isPreview,
                    classes?.answerText
                  )}
                >
                  {getValue(k, 'text')}
                </p>
                <div className={clsx(styles.imageContainer, isPreview, classes?.answerImageContainer)}>
                  <div
                    id={`image_${k}`}
                    style={{backgroundImage: `url(${`${getValue(k, 'url')}` || answerImage})`}}
                    onLoad={() => onImageLoad(`image_${k}`)}
                    onError={() => onImageError(`image_${k}`)}
                    className={clsx(
                      styles.image,
                      isImageHidden(`image_${k}`),
                      isPreview,
                      classes?.answerImage
                    )}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default QuizOne;
