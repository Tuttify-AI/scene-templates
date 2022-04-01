import React, {useCallback, useMemo, forwardRef, Fragment, CSSProperties} from 'react';
import { animated } from 'react-spring';
import sceneStyles from './styles.module.css';
import { BaseSceneElements, Classes } from './types';
import { TemplateParameter, SceneProps, SceneValue, Parameters } from '../shared/types';
import { useImage, useActions, useAudios } from '../shared/hooks';
import { useAnimation } from './hooks';
import {transition, clsx, getElementId} from '../shared/utils';
import defaultImage from './assets/full-image';

export type FullImageWithButtonProps = SceneProps & {
  parameters?: BaseSceneElements<TemplateParameter>;
  values?: BaseSceneElements<SceneValue>;
  classes?: Classes;
};

const FullImageWithButton = forwardRef<HTMLDivElement, FullImageWithButtonProps>(
  ({ editMode, previewMode, classes, activeKey, onClick, parameters, values, onActiveElementClick }, ref) => {
    const { hiddenImageList, onImageError, onImageLoad } = useImage();
    const { getAnimationsStyle, handleMouseMove, resetAnimatedProps, clearHover, handleHover, scale } = useAnimation({
      disabled: editMode || previewMode,
    });

    const getEditClass = useCallback((type: 'edit' | 'editRoot' | 'editText' = 'edit') => editMode && sceneStyles[type], [editMode]);
    const { audios } = useAudios({ values });
    const getValue = useCallback(
      (element: keyof BaseSceneElements, parameter: keyof Parameters) =>
        values?.[element]?.[parameter]?.value ?? parameters?.[element]?.[parameter]?.default_value,
      [values, parameters]
    );

    const { handleClick } = useActions({ onClick, getValue, disabled: editMode || previewMode, audios, onActiveElementClick });

    const isActive = useCallback(
      (key: keyof BaseSceneElements) => activeKey === key && sceneStyles.active,
      [activeKey]
    );
    const isImageHidden = useCallback(
      (key: keyof BaseSceneElements) => hiddenImageList[key] && sceneStyles.hidden,
      [hiddenImageList]
    );
    const isPreview = useMemo(() => previewMode && sceneStyles.preview, [previewMode]);

    return (
      <animated.div
          id={getElementId(`background`, previewMode)}

          onClick={handleClick('background')}
        className={clsx(sceneStyles.root, isActive('background'), getEditClass('editRoot'), isPreview, classes?.root)}
        style={{
          backgroundColor: `${getValue('background', 'background')}`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetAnimatedProps}
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
          <animated.h1
              id={getElementId(`title`, previewMode)}

              onMouseEnter={handleHover('title')}
              onMouseLeave={clearHover}
              onClick={handleClick('title', {text: getValue('title', 'text') as string})}
              className={clsx(sceneStyles.title, isActive('title'), getEditClass('editText'), isPreview, classes?.title)}
              style={{
                  ...scale,
                  ...getAnimationsStyle(transition({ modX: 15, modY: 15 })),
                  color: getValue('title', 'text_color') as string
              }}
          >
              {getValue('title', 'text')}
          </animated.h1>
        <animated.img
            id={getElementId(`image`, previewMode)}
            alt="image"
          onMouseEnter={handleHover('image')}
          onMouseLeave={clearHover}
          src={`${getValue('image', 'url') || defaultImage}`}
          className={clsx(
            sceneStyles.image,
            isImageHidden('image'),
            isActive('image'),
            getEditClass(),
            isPreview,
            classes?.image
          )}
          style={{
              ...scale,
            ...getAnimationsStyle(transition({ modX: 20, modY: 20 })),
          }}
          onLoad={() => onImageLoad('image')}
          onError={() => onImageError('image')}
          onClick={handleClick('image', {imageUrl: getValue('image', 'url') as string})}
        />
          <button
              id={getElementId(`button`, previewMode)}

              onMouseEnter={handleHover('button')}
              onMouseLeave={clearHover}
              className={clsx(
                  sceneStyles.button,
                  isImageHidden('button'),
                  isActive('button'),
                  getEditClass(),
                  isPreview,
                  classes?.button
              )}
              style={
                  {
                      '--button-background-color': getValue('button', 'background'),
                      '--button-text-color': getValue('button', 'text_color'),
                  } as CSSProperties
              }
              onClick={handleClick('button', {text: getValue('button', 'text') as string})}
          >{getValue('button', 'text')}</button>
      </animated.div>
    );
  }
);

export default FullImageWithButton;
