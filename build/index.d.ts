/// <reference types="react" />
import * as Types from './templates/shared/types';
import Base, { BaseSceneProps } from './templates/base';
import Base2, { Base2SceneProps } from './templates/base2';
import Base3, { Base3SceneProps } from './templates/base3';
import QuizOne, { QuizOneProps } from './templates/quiz1';
import FullImage, { FullImageSceneProps } from './templates/fullImage';
import FullImageWithButton, { FullImageWithButtonProps } from './templates/scene15';
import { SpellBeeSceneProps } from './templates/spellBee';
import FullVideo, { FullVideoSceneProps } from './templates/fullVideo';
import MultipleTiles, { MultipleTilesSceneProps } from './templates/multipletiles';
import Tiles from './templates/tiles';
import MultipleTiles4, { MultipleTiles4SceneProps } from './templates/multipletiles4';
import MultipleTiles4FullImage, { MultipleTiles4FullImageProps } from './templates/multipletiles4FullImg';
import MultipleTiles6FullImage, { MultipleTiles6FullImageProps } from './templates/multipletiles6Fullimg';
import MultipleTiles8FullImage, { MultipleTiles8FullImageProps } from './templates/multipletiles8Fullimg';
import MultipleTiles6, { MultipleTiles6SceneProps } from './templates/multipletiles6';
import MultipleTiles8, { MultipleTiles8SceneProps } from './templates/multipletiles8';
import Parallax1, { Parallax1SceneProps } from './templates/parallax1';
import WordGuess, { WordGuessSceneProps } from './templates/wordGuess';
import Twocando, { TwocandoSceneProps } from './templates/twocando';
import { CountingSceneProps } from './templates/counting';
import MathBase, { MathBaseSceneProps } from './templates/mathBase';
import { TenFrames1SceneProps } from './templates/tenFrames1';
import { TenFrames2SceneProps } from './templates/tenFrames2';
declare const previews: {
    base: string;
    base2: string;
    base3: string;
    quiz1: string;
    fullImage: string;
    multipleTiles: string;
    multipleTiles4: string;
    multipleTiles4FullImage: string;
    multipleTiles6FullImage: string;
    multipleTiles8FullImage: string;
    multipleTiles6: string;
    multipleTiles8: string;
    fullImageWithButton: string;
    tiles: string;
    spellbee: string;
    parallax1: string;
    wordGuess: string;
    twocando: string;
    mathBase: string;
};
export { Base, Base2, Base3, QuizOne, FullImage, FullVideo, MultipleTiles, MultipleTiles4, MultipleTiles4FullImage, MultipleTiles6, MultipleTiles6FullImage, MultipleTiles8, MultipleTiles8FullImage, FullImageWithButton, Parallax1, Twocando, Tiles, Types, previews, WordGuess, MathBase, };
export type { BaseSceneProps, Base2SceneProps, Base3SceneProps, QuizOneProps, FullImageSceneProps, MultipleTilesSceneProps, MultipleTiles4SceneProps, MultipleTiles4FullImageProps, MultipleTiles6SceneProps, MultipleTiles6FullImageProps, MultipleTiles8SceneProps, MultipleTiles8FullImageProps, FullVideoSceneProps, FullImageWithButtonProps, SpellBeeSceneProps, Parallax1SceneProps, TwocandoSceneProps, WordGuessSceneProps, CountingSceneProps, MathBaseSceneProps, TenFrames1SceneProps, TenFrames2SceneProps, };
export declare const AVAILABLE_SCENES: {
    base: {
        component: import("react").ForwardRefExoticComponent<Pick<BaseSceneProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "parameters" | "values" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations"> & import("react").RefAttributes<HTMLDivElement>>;
        previewImage: string;
    };
    base2: {
        component: import("react").ForwardRefExoticComponent<Pick<Base2SceneProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "parameters" | "values" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations"> & import("react").RefAttributes<HTMLDivElement>>;
        previewImage: string;
    };
    base3: {
        component: import("react").ForwardRefExoticComponent<Pick<Base3SceneProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "parameters" | "values" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations"> & import("react").RefAttributes<HTMLDivElement>>;
        previewImage: string;
    };
    quiz1: {
        component: import("react").ForwardRefExoticComponent<Pick<QuizOneProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "values" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations"> & import("react").RefAttributes<HTMLDivElement>>;
        previewImage: string;
    };
    fullImage: {
        component: import("react").ForwardRefExoticComponent<Pick<FullImageSceneProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "parameters" | "values" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations"> & import("react").RefAttributes<HTMLDivElement>>;
        previewImage: string;
    };
    fullVideo: {
        component: import("react").ForwardRefExoticComponent<Pick<FullVideoSceneProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "parameters" | "values" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations"> & import("react").RefAttributes<HTMLDivElement>>;
        previewImage: string;
    };
    multipletiles: {
        component: import("react").ForwardRefExoticComponent<Pick<MultipleTilesSceneProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "values" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations"> & import("react").RefAttributes<HTMLDivElement>>;
        previewImage: string;
    };
    multipletiles4: {
        component: import("react").ForwardRefExoticComponent<Pick<MultipleTiles4SceneProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "values" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations"> & import("react").RefAttributes<HTMLDivElement>>;
        previewImage: string;
    };
    multipletiles4FullImg: {
        component: import("react").ForwardRefExoticComponent<Pick<MultipleTiles4FullImageProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "values" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations"> & import("react").RefAttributes<HTMLDivElement>>;
        previewImage: string;
    };
    multipletiles6: {
        component: import("react").ForwardRefExoticComponent<Pick<MultipleTiles6SceneProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "values" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations"> & import("react").RefAttributes<HTMLDivElement>>;
        previewImage: string;
    };
    multipletiles6FullImg: {
        component: import("react").ForwardRefExoticComponent<Pick<MultipleTiles6FullImageProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "values" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations"> & import("react").RefAttributes<HTMLDivElement>>;
        previewImage: string;
    };
    multipletiles8: {
        component: import("react").ForwardRefExoticComponent<Pick<MultipleTiles8SceneProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "values" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations"> & import("react").RefAttributes<HTMLDivElement>>;
        previewImage: string;
    };
    multipletiles8FullImg: {
        component: import("react").ForwardRefExoticComponent<Pick<MultipleTiles8FullImageProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "values" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations"> & import("react").RefAttributes<HTMLDivElement>>;
        previewImage: string;
    };
    scene15: {
        component: import("react").ForwardRefExoticComponent<Pick<FullImageWithButtonProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "parameters" | "values" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations"> & import("react").RefAttributes<HTMLDivElement>>;
        previewImage: string;
    };
    tiles: {
        component: import("react").ForwardRefExoticComponent<Pick<import("./templates/tiles").MultipleTilesSceneProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "values" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations"> & import("react").RefAttributes<HTMLDivElement>>;
        previewImage: string;
    };
    spellbee: {
        component: import("react").ForwardRefExoticComponent<Pick<SpellBeeSceneProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "values" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations" | "useArray"> & import("react").RefAttributes<HTMLDivElement>>;
        previewImage: string;
    };
    parallax1: {
        component: import("react").ForwardRefExoticComponent<Pick<Parallax1SceneProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "parameters" | "values" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations"> & import("react").RefAttributes<HTMLDivElement>>;
        previewImage: string;
    };
    twocando: {
        component: import("react").ForwardRefExoticComponent<Pick<TwocandoSceneProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "parameters" | "values" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations"> & import("react").RefAttributes<HTMLDivElement>>;
        previewImage: string;
    };
    wordGuess: {
        component: import("react").ForwardRefExoticComponent<Pick<WordGuessSceneProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "values" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations"> & import("react").RefAttributes<HTMLDivElement>>;
        previewImage: string;
    };
    counting: {
        component: import("react").ForwardRefExoticComponent<Pick<CountingSceneProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "values" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations"> & import("react").RefAttributes<HTMLDivElement>>;
        previewImage: string;
    };
    mathBase: {
        component: import("react").ForwardRefExoticComponent<Pick<MathBaseSceneProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "values" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations" | "useArray"> & import("react").RefAttributes<HTMLDivElement>>;
        previewImage: string;
    };
    tenFrames1: {
        component: import("react").ForwardRefExoticComponent<Pick<TenFrames1SceneProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "values" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations"> & import("react").RefAttributes<HTMLDivElement>>;
        previewImage: null;
    };
    tenFrames2: {
        component: import("react").ForwardRefExoticComponent<Pick<TenFrames2SceneProps, "editMode" | "previewMode" | "classes" | "activeKey" | "onClick" | "values" | "onActiveElementClick" | "onComplete" | "onSceneSolved" | "onAdd" | "onDelete" | "onSet" | "translations"> & import("react").RefAttributes<HTMLDivElement>>;
        previewImage: null;
    };
};
