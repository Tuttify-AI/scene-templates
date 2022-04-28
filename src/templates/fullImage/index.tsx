import React, { useCallback, useMemo, forwardRef } from 'react';
import { animated } from 'react-spring';
import sceneStyles from './styles.module.css';
import { BaseSceneElements, Classes } from './types';
import { TemplateParameter, SceneProps, SceneValue } from '../shared/types';
import { useImage, useActions, useAudios } from '../shared/hooks';
import { useAnimation } from './hooks';
import { transition, clsx, getElementId, getElementValue } from '../shared/utils';
import defaultImage from './assets/full-image';

export type FullImageSceneProps = SceneProps & {
  parameters?: BaseSceneElements<TemplateParameter>;
  values?: BaseSceneElements<SceneValue>;
  classes?: Classes;
};

const FullImage = forwardRef<HTMLDivElement, FullImageSceneProps>(
  ({ editMode, previewMode, classes, activeKey, onClick, parameters, values, onActiveElementClick }, ref) => {
    const { hiddenImageList, onImageError, onImageLoad } = useImage();
    const { getAnimationsStyle, handleMouseMove, resetAnimatedProps, scale, clearHover, handleHover } = useAnimation({
      disabled: editMode || previewMode,
    });

    const getEditClass = useCallback((type: 'edit' | 'editRoot' = 'edit') => editMode && sceneStyles[type], [editMode]);
    const { handlePauseAll, renderAudios } = useAudios({ values });
    const getValue = useMemo(() => getElementValue(values, parameters), [values, parameters]);

    const { handleClick } = useActions({
      onClick,
      disabled: editMode || previewMode,
      handlePauseAll,
      onActiveElementClick,
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
        className={clsx(sceneStyles.root, isActive('background'), getEditClass('editRoot'), isPreview, classes?.root)}
        style={{
          backgroundColor: `${getValue('background', 'background')}`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetAnimatedProps}
        ref={ref}
      >
        {renderAudios()}
        <animated.img
          id={getElementId('image', previewMode)}
          onMouseEnter={handleHover('image')}
          onMouseLeave={clearHover}
          alt="image"
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
          onClick={handleClick('image', { data: { imageUrl: getValue('image', 'url') as string } })}
        />
      </animated.div>
    );
  }
);

export default FullImage;
