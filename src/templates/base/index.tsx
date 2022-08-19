import React, { useCallback, useMemo, useRef, forwardRef } from 'react';
import { animated } from '@react-spring/web';
import sceneStyles from './styles.module.css';
import { ANIMATIONS } from './constants';
import { BaseSceneElements, Classes } from './types';
import { TemplateParameter, SceneProps, SceneValue } from '../shared/types';
import { useImage, useActions, useAudios } from '../shared/hooks';
import { useAnimation } from './hooks';
import { transition, clsx, getElementId, getElementValue } from '../shared/utils';
import defaultImage from './assets/defaultImage';

export type BaseSceneProps = SceneProps & {
  parameters?: BaseSceneElements<TemplateParameter>;
  values?: BaseSceneElements<SceneValue>;
  classes?: Classes;
};

const Base = forwardRef<HTMLDivElement, BaseSceneProps>(
  ({ editMode, previewMode, classes, activeKey, onClick, parameters, values, onActiveElementClick }, ref) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const { hiddenImageList, onImageError, onImageLoad } = useImage();
    const {
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

    const getValue = useMemo(() => getElementValue(values, parameters), [values, parameters]);

    const { renderAudios, handlePauseAll } = useAudios({ values });

    const { handleClick } = useActions({
      onClick,
      disabled: editMode || previewMode,
      onActiveElementClick,
      handlePauseAll,
    });

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
        id={getElementId('background', previewMode)}
        onClick={handleClick('background', { data: { background: getValue('background', 'background') as string } })}
        className={clsx(sceneStyles.root, isActive('background'), getEditClass('editRoot'), isPreview, classes?.root)}
        style={{
          backgroundColor: `${getValue('background', 'background')}`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetAnimatedProps}
        ref={ref}
      >
        {renderAudios()}
        <div ref={scrollRef} className={sceneStyles.scroll} />
        <animated.h1
          id={getElementId('title', previewMode)}
          onMouseEnter={handleHover('title')}
          onMouseLeave={clearHover}
          onClick={handleClick('title', { data: { text: getValue('title', 'text') as string } })}
          className={clsx(sceneStyles.title, isActive('title'), getEditClass('editText'), isPreview, classes?.title)}
          style={{
            ...getScale('title'),
            ...getAnimationsStyle(transition({ modX: 20, modY: 20 })),
          }}
        >
          {getValue('title', 'text')}
        </animated.h1>
        <animated.p
          id={getElementId('description', previewMode)}
          onMouseEnter={handleHover('description')}
          onMouseLeave={clearHover}
          onClick={handleClick('description', { data: { text: getValue('description', 'text') as string } })}
          className={clsx(
            sceneStyles.description,
            isActive('description'),
            getEditClass('editText'),
            isPreview,
            classes?.description
          )}
          style={{
            ...getScale('description'),
            ...getAnimationsStyle(transition({ modX: 15, modY: 15 })),
          }}
        >
          {getValue('description', 'text')}
        </animated.p>
        <animated.img
          id={getElementId('image', previewMode)}
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
            ...getScale('image'),
            ...getAnimationsStyle(transition({ modX: 20, modY: 20 })),
          }}
          onLoad={() => onImageLoad('image')}
          onError={() => onImageError('image')}
          onClick={handleClick('image', { data: { imageUrl: getValue('image', 'url') as string } })}
        />
        {ANIMATIONS.map(({ name, mods }) => (
          <animated.div
            id={getElementId(`${name}`, previewMode)}
            onMouseEnter={handleHover(name)}
            onMouseLeave={clearHover}
            key={name}
            className={clsx(
              sceneStyles[name as keyof typeof sceneStyles],
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
            onClick={handleClick(name, { data: { background: getValue(name, 'background') as string } })}
          />
        ))}
      </animated.div>
    );
  }
);

export default Base;
