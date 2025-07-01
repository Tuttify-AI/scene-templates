import { createRef, useEffect, useState } from 'react';
import { AudioElements, SceneProps } from '../types';

type Params = {
  values: SceneProps['values'];
};

export default function useAudios({ values }: Params) {
  const [audios, setAudios] = useState({} as AudioElements);

  useEffect(() => {
    if (values) {
      setAudios(
        Object.keys(values)
          .filter(key => !!values?.[key]?.sound?.value)
          .reduce((res, key) => {
            res[key] = createRef<HTMLAudioElement>();
            return res;
          }, {} as AudioElements)
      );
    }
  }, [values]);

  return {
    audios,
  };
}
