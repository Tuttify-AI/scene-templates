import React, { createRef, Fragment, useCallback, useEffect, useState } from 'react';
import { AudioElements, SceneProps, TemplateParameterType, Parameters, Elements } from '../types';
import { getElementValue } from '../utils';

type Params = {
  values: SceneProps['values'];
  previewMode: SceneProps['previewMode'];
};

const parseKey = (audioKey: string) => ({
  key: audioKey.split(':')[0] || '',
  parameter: audioKey.split(':')[1] || '',
});

export default function useAudios({ values, previewMode }: Params) {
  const [audios, setAudios] = useState({} as AudioElements);

  useEffect(() => {
    if (values && !previewMode) {
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
  }, [values, previewMode]);

  const pauseAudios = useCallback(async (ignoreEl?: HTMLAudioElement) => {
    const allAudios = Array.from(document.getElementsByTagName('audio'));
    await Promise.all(
      allAudios.map(async el => {
        if (ignoreEl !== el) {
          el.currentTime = 0;
          await el.pause();
        }
      })
    );
  }, []);

  const renderAudios = useCallback(
    () =>
      audios && !previewMode ? (
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
    [audios, values, previewMode]
  );

  const handleElementAudio = useCallback(
    async (key: keyof Elements, parameter: keyof Parameters = 'sound') => {
      if (audios && getElementValue(values)(key, parameter) && !previewMode) {
        await Promise.all(
          Object.keys(audios).map(async audio => {
            const currentAudio = audios?.[audio]?.current;
            if (currentAudio) {
              if (parseKey(audio).parameter === parameter && parseKey(audio).key === key) {
                if (!currentAudio.paused) {
                  await currentAudio.pause();
                  currentAudio.currentTime = 0;
                } else {
                  currentAudio.currentTime = 0;
                  await currentAudio.play();
                  await pauseAudios(currentAudio);
                }
              } else {
                await currentAudio.pause();
                currentAudio.currentTime = 0;
              }
            }
          })
        );
      }
    },
    [audios, values, previewMode, pauseAudios]
  );

  return {
    audios,
    renderAudios,
    handleElementAudio,
    pauseAudios,
  };
}
