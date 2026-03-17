import React from 'react';
import { ActiveElementData, Elements, Parameters, SceneProps } from '../types';
import { useAudios } from './';
import useAnswerTimer from './use-answer-timer';
type Params = {
    disabled?: boolean;
    onClick?: SceneProps['onClick'];
    onActiveElementClick?: SceneProps['onActiveElementClick'];
    clearTimer?: ReturnType<typeof useAnswerTimer>['clearTimer'];
    onComplete?: SceneProps['onComplete'];
    onSceneSolved?: SceneProps['onSceneSolved'];
    pauseAudios?: ReturnType<typeof useAudios>['pauseAudios'];
    handleElementAudio?: ReturnType<typeof useAudios>['handleElementAudio'];
};
export type OnClickData = {
    data?: ActiveElementData;
    parameter?: keyof Parameters;
};
export type SoundData = {
    key?: keyof Elements;
    parameter?: keyof Parameters;
};
export default function useActions({ disabled, onClick, onActiveElementClick, onComplete, onSceneSolved, clearTimer, pauseAudios, handleElementAudio, }: Params): {
    handleClick: (key: keyof Elements, { data, parameter }?: OnClickData) => (e?: React.MouseEvent<HTMLElement>) => Promise<void>;
    handleComplete: (key: keyof Elements, { data }?: OnClickData) => Promise<void>;
    handleSceneSolved: (key: keyof Elements, { data }?: OnClickData, soundData?: SoundData) => Promise<void>;
};
export {};
