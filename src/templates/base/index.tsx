import React, { useCallback, useMemo, useRef, forwardRef } from 'react';
import { animated } from 'react-spring';
import sceneStyles from './styles.module.css';
import { ANIMATIONS } from './constants';
import { BaseSceneElements, Classes } from './types';
import { TemplateParameter, SceneProps, SceneValue, Parameters } from '../shared/types';
import { useImage, useActions } from '../shared/hooks';
import { useAnimation } from './hooks';
import { transition, clsx } from '../shared/utils';
import defaultImage from './assets/defaultImage';

export type BaseSceneProps = SceneProps & {
  parameters?: BaseSceneElements<TemplateParameter>;
  values?: BaseSceneElements<SceneValue>;
  classes?: Classes;
};

const Base = forwardRef<HTMLDivElement, BaseSceneProps>(
  ({ editMode, previewMode, classes, activeKey, onClick, parameters, values }, ref) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const { hiddenImageList, onImageError, onImageLoad } = useImage();
    const {
      visibleX,
      rotate,
      opacity,
      getAnimationsStyle,
      handleMouseMove,
      resetAnimatedProps,
      getScale,
      clearHover,
      handleHover,
    } = useAnimation({
      disabled: editMode || previewMode,
      element: scrollRef.current,
    });

    const getEditClass = useCallback(
      (type: 'edit' | 'editText' | 'editRoot' = 'edit') => editMode && sceneStyles[type],
      [editMode]
    );

    const getValue = useCallback(
      (element: keyof BaseSceneElements, parameter: keyof Parameters) =>
        values?.[element]?.[parameter]?.value ?? parameters?.[element]?.[parameter]?.default_value,
      [values, parameters]
    );

    const { handleClick } = useActions({ onClick, getValue, disabled: editMode || previewMode });

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
        onClick={handleClick('background')}
        className={clsx(sceneStyles.root, isActive('background'), getEditClass('editRoot'), isPreview, classes?.root)}
        style={{
          backgroundColor: `${getValue('background', 'background')}`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetAnimatedProps}
        ref={ref}
      >
        <div ref={scrollRef} className={sceneStyles.scroll} />
        <animated.h1
          onMouseEnter={handleHover('title')}
          onMouseLeave={clearHover}
          onClick={handleClick('title')}
          className={clsx(sceneStyles.title, isActive('title'), getEditClass('editText'), isPreview, classes?.title)}
          style={{
            x: visibleX,
            opacity,
            ...getScale('title'),
            ...getAnimationsStyle(transition({ modX: 20, modY: 20 })),
          }}
        >
          {getValue('title', 'text')}
        </animated.h1>
        <animated.p
          onMouseEnter={handleHover('description')}
          onMouseLeave={clearHover}
          onClick={handleClick('description')}
          className={clsx(
            sceneStyles.description,
            isActive('description'),
            getEditClass('editText'),
            isPreview,
            classes?.description
          )}
          style={{
            x: visibleX,
            opacity,
            ...getScale('description'),
            ...getAnimationsStyle(transition({ modX: 15, modY: 15 })),
          }}
        >
          {getValue('description', 'text')}
        </animated.p>
        <animated.img
          onMouseEnter={handleHover('image')}
          onMouseLeave={clearHover}
          alt="image"
          src={`${getValue('image', 'url')}` || defaultImage}
          className={clsx(
            sceneStyles.image,
            isImageHidden('image'),
            isActive('image'),
            getEditClass(),
            isPreview,
            classes?.image
          )}
          style={{
            rotate,
            opacity,
            ...getScale('image'),
            ...getAnimationsStyle(transition({ modX: 20, modY: 20 })),
          }}
          onLoad={() => onImageLoad('image')}
          onError={() => onImageError('image')}
          onClick={handleClick('image')}
        />
        {ANIMATIONS.map(({ name, mods }) => (
          <animated.div
            onMouseEnter={handleHover(name)}
            onMouseLeave={clearHover}
            key={name}
            className={clsx(
              sceneStyles[name],
              isActive(name),
              getEditClass(),
              isPreview,
              classes?.[name as keyof Classes]
            )}
            style={{
              backgroundColor: `${getValue(name, 'background')}`,
              ...getScale(name),
              ...getAnimationsStyle(transition(mods)),
            }}
            onClick={handleClick(name)}
          />
        ))}
      </animated.div>
    );
  }
);

export default Base;
