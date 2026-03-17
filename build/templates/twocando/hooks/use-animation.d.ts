import React from 'react';
import { ParallaxSceneElements } from '../types';
type Params = {
    element: HTMLElement | null;
    disabled?: boolean;
};
export default function useAnimation({ element, disabled }: Params): {
    opacity: import("@react-spring/core").SpringValue<number> | undefined;
    translateY: import("@react-spring/core").SpringValue<number> | undefined;
    handleMouseMove: ({ clientX, clientY }: React.MouseEvent<HTMLDivElement>) => void;
    resetAnimatedProps: () => import("@react-spring/core").AsyncResult<import("@react-spring/core").Controller<{
        x: number;
        y: number;
    }>>[];
    getAnimationsStyle: (func: (x: number, y: number) => string) => {
        transform: string | import("@react-spring/core").Interpolation<string, any>;
    };
    handleHover: (key: keyof ParallaxSceneElements) => () => void;
    clearHover: () => void;
    getScale: (key: keyof ParallaxSceneElements, scale?: number) => {
        scale: import("@react-spring/core").SpringValue<number>;
    };
};
export {};
