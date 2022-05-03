import React, { createRef, Fragment, useCallback, useEffect, useState } from 'react';
import { AudioElements, SceneProps, TemplateParameterType, Parameters, Elements } from '../types';
import { getElementValue } from '../utils';

type Params = {
  values: SceneProps['values'];
};

export default function useAudios({ values }: Params) {
  const [audios, setAudios] = useState({} as AudioElements);

  useEffect(() => {
    if (values) {
      setAudios(
        Object.keys(values).reduce((res, key) => {
          Object.keys(values[key]).forEach(parameter => {
            if (values[key][parameter].type === TemplateParameterType.sound) {
              res[key] = {
                ref: createRef<HTMLAudioElement>(),
                parameter,
              };
            }
          });
          return res;
        }, {} as AudioElements)
      );
    }
  }, [values]);

  const renderAudios = useCallback(
    () =>
      audios ? (
        <Fragment>
          {Object.keys(audios).filter(audioKey => !!getElementValue(values)(audioKey, audios?.[audioKey].parameter)).map(audioKey => (
            <audio
              key={`${audioKey}_sound`}
              id={`${audioKey}_sound`}
              ref={audios?.[audioKey].ref}
              src={getElementValue(values)(audioKey, audios?.[audioKey].parameter) as string}
            />
          ))}
        </Fragment>
      ) : null,
    [audios, values]
  );

  const handlePauseAll = useCallback(
    async (key: keyof Elements, parameter: keyof Parameters = 'sound') => {
      if (audios && getElementValue(values)(key, parameter)) {
        await Promise.all(
          Object.keys(audios).map(async audio => {
            const currentAudio = audios?.[audio]?.ref?.current;
            if (currentAudio) {
              if (audio === key) {
                currentAudio.currentTime = 0;
                await currentAudio.play();
              } else {
                currentAudio.currentTime = 0;
                await currentAudio.pause();
              }
            }
          })
        );
      }
    },
    [audios, values]
  );

  return {
    audios,
    renderAudios,
    handlePauseAll,
  };
}
