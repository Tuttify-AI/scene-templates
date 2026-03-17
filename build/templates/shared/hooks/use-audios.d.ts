/// <reference types="react" />
import { AudioElements, SceneProps, Parameters, Elements } from '../types';
type Params = {
    values: SceneProps['values'];
    previewMode: SceneProps['previewMode'];
};
export default function useAudios({ values, previewMode }: Params): {
    audios: AudioElements;
    renderAudios: () => JSX.Element | null;
    handleElementAudio: (key: keyof Elements, parameter?: keyof Parameters) => Promise<void>;
    pauseAudios: (ignoreEl?: HTMLAudioElement) => Promise<void>;
};
export {};
