import React, { useCallback, useMemo, forwardRef } from 'react';
import { animated } from 'react-spring';
import sceneStyles from './styles.module.css';
import { BaseSceneElements, Classes } from './types';
import { TemplateParameter, SceneProps, SceneValue, Parameters } from '../shared/types';
import { useActions, useAudios } from '../shared/hooks';
import { useAnimation } from './hooks';
import { clsx, getElementId } from '../shared/utils';
import ReactPlayer from 'react-player';
import defaultImage from './assets/full-image';

export type FullVideoSceneProps = SceneProps & {
  parameters?: BaseSceneElements<TemplateParameter>;
  values?: BaseSceneElements<SceneValue>;
  classes?: Classes;
};

const FullVideo = forwardRef<HTMLDivElement, FullVideoSceneProps>(
  ({ editMode, previewMode, classes, activeKey, onClick, parameters, values, onActiveElementClick }, ref) => {
    const { handleMouseMove, resetAnimatedProps } = useAnimation({
      disabled: editMode || previewMode,
    });

    const getEditClass = useCallback((type: 'edit' | 'editRoot' = 'edit') => editMode && sceneStyles[type], [editMode]);
    const { audios } = useAudios({ values });
    const getValue = useCallback(
      (element: keyof BaseSceneElements, parameter: keyof Parameters) => {
        return values?.[element]?.[parameter]?.value ?? parameters?.[element]?.[parameter]?.default_value;
      },
      [values, parameters]
    );

    const { handleClick } = useActions({
      onClick,
      getValue,
      disabled: editMode || previewMode,
      audios,
      onActiveElementClick,
    });

    const isActive = useCallback(
      (key: keyof BaseSceneElements) => activeKey === key && sceneStyles.active,
      [activeKey]
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
        <div>
          {editMode && (
            <div
              className={sceneStyles.image}
              onClick={handleClick('video', { videoUrl: getValue('video', 'url') as string })}
              style={{
                zIndex: 5,
              }}
            />
          )}
          {editMode ? (
            <img src={`${getValue('video', 'preview') || defaultImage}`} className={clsx(sceneStyles.image)} alt="" />
          ) : (
            <ReactPlayer
              playing
              light
              controls
              width="92%"
              height="80%"
              id="video"
              url={`${getValue('video', 'url') || ''}`}
              className={clsx(sceneStyles.image, isActive('video'), getEditClass(), isPreview, classes?.image)}
              onClick={handleClick('video', { videoUrl: getValue('video', 'url') as string })}
            />
          )}
        </div>
      </animated.div>
    );
  }
);

export default FullVideo;
