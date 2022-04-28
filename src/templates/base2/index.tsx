import React, { useCallback, useMemo, useRef, forwardRef } from 'react';
import { animated } from 'react-spring';
import sceneStyles from './styles.module.css';
import { IMAGES, SHAPES } from './constants';
import { BaseSceneElements, Classes } from './types';
import { TemplateParameter, SceneProps, SceneValue } from '../shared/types';
import { useActions, useAudios, useImage } from '../shared/hooks';
import { useAnimation } from './hooks';
import { transition, clsx, getElementId, getElementValue } from '../shared/utils';

export type Base2SceneProps = SceneProps & {
  parameters?: BaseSceneElements<TemplateParameter>;
  values?: BaseSceneElements<SceneValue>;
  classes?: Classes;
};

const Base2 = forwardRef<HTMLDivElement, Base2SceneProps>(
  ({ editMode, previewMode, classes, activeKey, onClick, parameters, values, onActiveElementClick }, ref) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const { handlePauseAll, renderAudios } = useAudios({ values });
    const { hiddenImageList, onImageError, onImageLoad } = useImage();

    const {
      opacity,
      translateY,
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
      (type: 'edit' | 'editText' | 'editRoot' = 'edit') => editMode && sceneStyles[type as keyof typeof sceneStyles],
      [editMode]
    );

    const getValue = useMemo(() => getElementValue(values, parameters), [values, parameters]);

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
        onClick={handleClick('background')}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetAnimatedProps}
        className={clsx(sceneStyles.root, isActive('background'), getEditClass('editRoot'), isPreview, classes?.root)}
        style={{
          backgroundColor: `${getValue('background', 'background')}`,
        }}
        ref={ref}
      >
        {renderAudios()}
        <div ref={scrollRef} className={sceneStyles.scroll} />
        <div className={sceneStyles.view}>
          {IMAGES.filter(el => el.isPreviewImage).map(({ name, defaultImage }) => (
            <animated.img
              id={getElementId(name, previewMode)}
              onMouseEnter={handleHover(name)}
              onMouseLeave={clearHover}
              onClick={handleClick(name, { data: { imageUrl: getValue(name, 'url') as string } })}
              onLoad={() => onImageLoad(name)}
              onError={() => onImageError(name)}
              key={name}
              alt={name}
              src={`${getValue(name, 'url')}` || defaultImage}
              className={clsx(
                sceneStyles.previewImage,
                sceneStyles[name as keyof typeof sceneStyles],
                isImageHidden(name),
                isActive(name),
                getEditClass(),
                isPreview,
                classes?.[name as keyof Classes]
              )}
              style={{
                opacity,
                translateY,
                ...getScale(name),
                ...getAnimationsStyle(transition({ modX: 20, modY: 20 })),
              }}
            />
          ))}
        </div>

        {IMAGES.filter(el => !el.isPreviewImage).map(({ name, defaultImage }) => (
          <animated.img
            id={getElementId(name, previewMode)}
            onMouseEnter={handleHover(name)}
            onMouseLeave={clearHover}
            onClick={handleClick(name, { data: { imageUrl: getValue(name, 'url') as string } })}
            onLoad={() => onImageLoad(name)}
            onError={() => onImageError(name)}
            key={name}
            alt={name}
            src={`${getValue(name, 'url')}` || defaultImage}
            className={clsx(
              sceneStyles.cloudImage,
              sceneStyles[name as keyof typeof sceneStyles],
              isImageHidden(name),
              isActive(name),
              getEditClass(),
              isPreview,
              classes?.[name as keyof Classes]
            )}
            style={{
              opacity,
              translateY,
              ...getScale(name),
              ...getAnimationsStyle(transition({ modX: 20, modY: 20 })),
            }}
          />
        ))}

        {SHAPES.map(({ name, mods }) => (
          <animated.div
            id={getElementId(`${name}`, previewMode)}
            onMouseEnter={handleHover(name)}
            onMouseLeave={clearHover}
            onClick={handleClick(name, { data: { imageUrl: getValue(name, 'background') as string } })}
            key={name}
            className={clsx(
              sceneStyles.shape,
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
          />
        ))}
      </animated.div>
    );
  }
);

export default Base2;
