import React, { RefObject } from 'react';

export type GetValue<T> = (element: keyof Elements<T>, parameter: keyof Parameters) => SceneValue['value'] | undefined;

export type AtomiDocument = Record<string, unknown> & {
  destroy?: () => void;
};

export type AtomiOptions = {
  paused?: boolean;
  preloaderOptions?: Record<string, unknown>;
  center?: string;
  autofit?: boolean;
};

declare global {
  interface Window {
    AtomiSaola: {
      loadedDocs: {
        push: (document: AtomiDocument) => void;
      };
      openDoc: (document: AtomiDocument, element: HTMLElement | null, options: AtomiOptions) => AtomiDocument;
    };
  }
}

export type Elements<T = SceneValue> = {
  [element: string]: Parameters<T>;
};

export type Mods = {
  modX: number;
  modY: number;
};

export type Image = {
  name: string;
  defaultImage: string;
  isPreviewImage: boolean;
  mods: Mods;
};

export type Animation = {
  name: keyof Elements;
  mods: Mods;
};

export type Parameters<T = SceneValue> = {
  [key: string]: T;
};

export enum TemplateParameterType {
  color = 'color',
  textColor = 'textColor',
  text = 'text',
  textarea = 'textarea',
  textArray = 'textArray',
  title = 'title',
  sound = 'sound',
  image = 'image',
  video = 'video',
  boolean = 'boolean',
  number = 'number',
  select = 'select',
}

export type TemplateParameter = {
  type: TemplateParameterType;
  title: string;
  default_value: string | number;
  length?: number;
};

export type SceneValue = {
  type: TemplateParameterType;
  title: string;
  value: string | number;
  length?: number;
  max_length?: number;
  min_length?: number;
  hidden?: boolean;
  replace_pattern?: string;
  options?: { label: string; value: string }[];
};

export type AudioElements = {
  //[key:parameter]
  [key: string]: RefObject<HTMLAudioElement>;
};

export type ActiveElementData = {
  text?: string;
  imageUrl?: string;
  audioUrl?: string;
  videoUrl?: string;
  background?: string;
  templateName?: string;
  [key: string]: string | undefined;
};

export type Translations = {
  totalTiles?: string;
};

export type SceneProps = {
  /**
   * If true - all animation, sounds and customization disabled
   */
  previewMode?: boolean;
  /**
   * If true - all animation and sounds disabled
   */
  editMode?: boolean;
  /**
   * Active key is needed for customization form in order to highlight selected element
   */
  activeKey?: string;
  /**
   * Customized values based on template parameters
   */
  values?: Elements;
  /**
   * CSS classes for component elements
   */
  classes?: { [key: string]: string };
  /**
   * onClick function for each customizable element
   * @param key - parameter key
   * @param element - selected HTMLElement
   */
  onClick?: (key: string, element: HTMLElement) => void;
  /**
   * onActiveElementClick function for interactive elements click
   * @param key - parameter key
   * @param data - interactive element data
   */
  onActiveElementClick?: (key: string, data?: ActiveElementData) => void;
  /**
   * Ref to access child component
   */
  ref?: React.Ref<HTMLDivElement> | null;
  /**
   * function for adding new scene values
   * @param values
   */
  onAdd?: (values: Elements) => void;
  /**
   * function for deleting new scene values
   * @param id
   */
  onDelete?: (id: string) => void;
  /**
   * function for setting scene values
   * @param values
   */
  onSet?: (values: Elements) => void;
  /**
   * Object for scene localization
   */
  translations?: Translations;
};
