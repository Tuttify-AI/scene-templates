import React, { createRef, Fragment, useCallback, useEffect, useState } from 'react';
import { AudioElements, SceneProps, TemplateParameterType, Parameters, Elements } from '../types';
import { getElementValue } from '../utils';

type Params = {
  values: SceneProps['values'];
};

const parseKey = (audioKey: string) => ({
  key: audioKey.split(':')[0] || '',
  parameter: audioKey.split(':')[1] || '',
});

export default function useAudios({ values }: Params) {
  const [audios, setAudios] = useState({} as AudioElements);

  useEffect(() => {
    if (values) {
      setAudios(
        Object.keys(values).reduce((res, key) => {
          Object.keys(values[key]).forEach(parameter => {
            if (values[key][parameter].type === TemplateParameterType.sound) {
              res[`${key}:${parameter}`] = createRef<HTMLAudioElement>();
            }
          });
          return res;
        }, {} as AudioElements)
      );
    }
  }, [values]);

  const pauseOtherAudios = async (ignoreEl: HTMLAudioElement) => {
    const allAudios = Array.from(document.getElementsByTagName('audio'));
    await Promise.all(
      allAudios.map(async el => {
        if (ignoreEl !== el) {
          el.currentTime = 0;
          await el.pause();
        }
      })
    );
  };

  const renderAudios = useCallback(
    () =>
      audios ? (
        <Fragment>
          {Object.keys(audios)
            .filter(audioKey => !!getElementValue(values)(parseKey(audioKey).key, parseKey(audioKey).parameter))
            .map(audioKey => (
              <audio
                key={`${audioKey}_sound`}
                id={`${audioKey}_sound`}
                ref={audios?.[audioKey]}
                src={getElementValue(values)(parseKey(audioKey).key, parseKey(audioKey).parameter) as string}
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
            const currentAudio = audios?.[audio]?.current;
            if (currentAudio) {
              if (parseKey(audio).key === key) {
                if (!currentAudio.paused) {
                  currentAudio.currentTime = 0;
                  await currentAudio.pause();
                } else {
                  currentAudio.currentTime = 0;
                  await currentAudio.play();
                  await pauseOtherAudios(currentAudio);
                }
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
