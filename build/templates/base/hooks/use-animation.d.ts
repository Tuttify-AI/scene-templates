import React from 'react';
import { BaseSceneElements } from '../types';
type Params = {
    disabled?: boolean;
};
export default function useAnimation({ disabled }: Params): {
    handleMouseMove: ({ clientX, clientY }: React.MouseEvent<HTMLDivElement>) => void;
    resetAnimatedProps: () => import("@react-spring/core").AsyncResult<import("@react-spring/core").Controller<{
        x: number;
        y: number;
    }>>[];
    getAnimationsStyle: (func: (x: number, y: number) => string) => {
        transform: string | import("@react-spring/core").Interpolation<string, any>;
    };
    handleHover: (key: keyof BaseSceneElements) => () => void;
    clearHover: () => void;
    getScale: (key: keyof BaseSceneElements) => {
        scale: import("@react-spring/core").SpringValue<number>;
    };
};
export {};
