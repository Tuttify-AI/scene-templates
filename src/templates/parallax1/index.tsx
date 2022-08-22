import React, { useCallback, useMemo, useRef, forwardRef } from 'react';
import { SceneProps, SceneValue, TemplateParameter } from '../shared/types';
import { ParallaxSceneElements, Classes } from './types';
import { animated } from '@react-spring/web';
import sceneStyles from './styles.module.css';
import { clsx, getElementId, getElementValue, transition } from '../shared/utils';
import { BaseSceneElements } from '../base/types';
import useAnimation from './hooks/use-animation';
import { useActions, useAudios, useImage } from '../shared/hooks';
import { ANIMATIONS, IMAGES } from './constants';

export type Parallax1SceneProps = SceneProps & {
  parameters?: ParallaxSceneElements<TemplateParameter>;
  values?: ParallaxSceneElements<SceneValue>;
  classes?: Classes;
};

const Parallax1 = forwardRef<HTMLDivElement, Parallax1SceneProps>(
  ({ editMode, previewMode, classes, activeKey, onClick, parameters, values, onActiveElementClick }, ref) => {
    const getEditClass = useCallback(
      (type: 'edit' | 'editText' | 'editRoot' = 'edit') => editMode && sceneStyles[type],
      [editMode]
    );
    const isActive = useCallback(
      (key: keyof BaseSceneElements) => activeKey === key && sceneStyles.active,
      [activeKey]
    );
    const { hiddenImageList, onImageError, onImageLoad } = useImage();
    const scrollRef = useRef<HTMLDivElement>(null);
    const isPreview = useMemo(() => previewMode && sceneStyles.preview, [previewMode]);
    const getValue = useMemo(() => getElementValue(values, parameters), [values, parameters]);
    const isImageHidden = useCallback(
      (key: keyof BaseSceneElements) => hiddenImageList[key] && sceneStyles.hidden,
      [hiddenImageList]
    );

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
    const { renderAudios, handlePauseAll } = useAudios({ values });
    const { handleClick } = useActions({
      onClick,
      disabled: editMode || previewMode,
      onActiveElementClick,
      handlePauseAll,
    });

    const getImageSrc = useCallback(
      (k: string, isAnimation = false) => {
        const src = getValue(k, 'url') as string;
        return src !== '' && !Number.isNaN(Number(src))
          ? (isAnimation ? ANIMATIONS : IMAGES)[Number(src)]?.defaultImage
          : src;
      },
      [getValue]
    );

    return (
      <animated.div
        id={getElementId('background', previewMode)}
        onClick={handleClick('background')}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetAnimatedProps}
        className={clsx(sceneStyles.root, isActive('background'), getEditClass('editRoot'), isPreview, classes?.root)}
        ref={ref}
      >
        {renderAudios()}
        <div ref={scrollRef} className={sceneStyles.scroll} />
        {IMAGES.map(({ name, isStatic, scale, mods }) => (
          <animated.img
            id={getElementId(name, previewMode)}
            onMouseEnter={handleHover(name)}
            onMouseLeave={clearHover}
            key={name}
            alt={name}
            src={getImageSrc(name)}
            className={clsx(
              //sceneStyles.previewImage
              sceneStyles[name as keyof typeof sceneStyles],
              isImageHidden(name),
              isActive(name),
              getEditClass(),
              isPreview,
              classes?.[name as keyof Classes]
            )}
            style={{
              translateY,
              backgroundColor: `${getValue(name, 'background')}`,
              ...(!isStatic && getScale(name, scale)),
              ...(!isStatic && getAnimationsStyle(transition(mods))),
            }}
            onLoad={() => onImageLoad(name)}
            onError={() => onImageError(name)}
            onClick={handleClick(name, { data: { imageUrl: getValue(name, 'url') as string } })}
          />
        ))}
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
              backgroundImage: `url(${getImageSrc(name, true)})`,
              backgroundColor: `${getValue(name, 'background')}`,
              ...getScale(name, 1.03),
              ...getAnimationsStyle(transition(mods)),
            }}
            onClick={handleClick(name, { data: { background: getValue(name, 'background') as string } })}
          />
        ))}
      </animated.div>
    );
  }
);
export default Parallax1;
