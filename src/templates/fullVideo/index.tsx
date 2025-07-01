import React, { useCallback, useMemo, forwardRef } from 'react';
import { animated } from 'react-spring';
import sceneStyles from './styles.module.css';
import { BaseSceneElements, Classes } from './types';
import { TemplateParameter, SceneProps, SceneValue, Parameters } from '../shared/types';
import { useActions, useAudios } from '../shared/hooks';
import { useAnimation } from './hooks';
import {clsx} from '../shared/utils';
import ReactPlayer from 'react-player';

export type FullVideoSceneProps = SceneProps & {
  parameters?: BaseSceneElements<TemplateParameter>;
  values?: BaseSceneElements<SceneValue>;
  classes?: Classes;
};

const FullVideo = forwardRef<HTMLDivElement, FullVideoSceneProps>(
  ({ editMode, previewMode, classes, activeKey, onClick, parameters, values, onActiveElementClick }, ref) => {
    const { handleMouseMove, resetAnimatedProps, } = useAnimation({
      disabled: editMode || previewMode,
    });

    const getEditClass = useCallback((type: 'edit' | 'editRoot' = 'edit') => editMode && sceneStyles[type], [editMode]);
    const { audios } = useAudios({ values });
    const getValue = useCallback(
      (element: keyof BaseSceneElements, parameter: keyof Parameters) => {
        return  values?.[element]?.[parameter]?.value ?? parameters?.[element]?.[parameter]?.default_value
      },
      [values, parameters]
    );

    const { handleClick } = useActions({ onClick, getValue, disabled: editMode || previewMode, audios, onActiveElementClick });

    const isActive = useCallback(
      (key: keyof BaseSceneElements) => activeKey === key && sceneStyles.active,
      [activeKey]
    );
    const isPreview = useMemo(() => previewMode && sceneStyles.preview, [previewMode]);

    const splitValues = useCallback((value, element) => {
      if(typeof value !== 'string') return;
      if (element === 'video'){
        return value ? value?.split(',')[0] : 'https://youtu.be/ErxyunQ7joA'
      }
      if (element === 'image'){
        return value ? value?.split(',')[1] : 'https://i.ytimg.com/vi/ErxyunQ7joA/hqdefault.jpg'
      }
      return '';
    }, [values])
    return (
      <animated.div
        id="background"
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
          {editMode &&
            <div
              className={sceneStyles.image}
              onClick={handleClick('video', {videoUrl: getValue('video', 'url') as string})}
              style={{
                zIndex: 5,
              }}
          />}
          {editMode
            ? <img
                src={`${splitValues(values?.video?.url?.value, 'image')}`}
                className={clsx(sceneStyles.image)}
                alt=""
              />
            : (<ReactPlayer
                playing
                light
                controls
                width='92%'
                height='80%'
                id='video'
                url={`${splitValues(values?.video?.url?.value, 'video')}`}
                className={clsx(
                  sceneStyles.image,
                  isActive('video'),
                  getEditClass(),
                  isPreview,
                  classes?.image,
                )}
                onClick={handleClick('video', { videoUrl: getValue('video', 'url') as string })}
              />)
          }
        </div>
      </animated.div>
    );
  }
);

export default FullVideo;
