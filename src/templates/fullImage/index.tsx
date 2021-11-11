import React, { useCallback, useMemo, forwardRef, Fragment } from 'react';
import { animated } from 'react-spring';
import sceneStyles from './styles.module.css';
import { BaseSceneElements, Classes } from './types';
import { TemplateParameter, SceneProps, SceneValue, Parameters } from '../shared/types';
import { useImage, useActions, useAudios } from '../shared/hooks';
import { useAnimation } from './hooks';
import { transition, clsx } from '../shared/utils';
import defaultImage from './assets/full-image';

export type FullImageSceneProps = SceneProps & {
  parameters?: BaseSceneElements<TemplateParameter>;
  values?: BaseSceneElements<SceneValue>;
  classes?: Classes;
};

const FullImage = forwardRef<HTMLDivElement, FullImageSceneProps>(
  ({ editMode, previewMode, classes, activeKey, onClick, parameters, values }, ref) => {
    const { hiddenImageList, onImageError, onImageLoad } = useImage();
    const { getAnimationsStyle, handleMouseMove, resetAnimatedProps, scale, clearHover, handleHover } = useAnimation(
      {
        disabled: editMode || previewMode,
      }
    );

    const getEditClass = useCallback(
      (type: 'edit' | 'editRoot' = 'edit') => editMode && sceneStyles[type],
      [editMode]
    );
    const {audios} = useAudios({values});
    const getValue = useCallback(
      (element: keyof BaseSceneElements, parameter: keyof Parameters) =>
        values?.[element]?.[parameter]?.value ?? parameters?.[element]?.[parameter]?.default_value,
      [values, parameters]
    );

    const { handleClick } = useActions({ onClick, getValue, disabled: editMode || previewMode, audios });

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
        id='background'
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
              <audio key={`${audio}_sound`} id={`${audio}_sound`} ref={audios?.[audio]} src={getValue(audio, 'sound') as string}/>
            ))}
          </Fragment>
        )}
        <animated.img
          id='image'
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
          onClick={handleClick('image')}
        />
      </animated.div>
    );
  }
);

export default FullImage;
