import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { useActions, useImage, useAudios } from '../shared/hooks';
import { clsx, getElementId, getElementValue } from '../shared/utils';

import { Parameters, SceneProps, SceneValue } from '../shared/types';
import { GuessWordElements, Classes } from './types';

import styles from './styles.module.css';
import useParams from './hooks/use-params';

export type GuessWordSceneProps = SceneProps & {
  values?: GuessWordElements<SceneValue>;
  classes?: Classes;
};

const GuessWord = forwardRef<HTMLDivElement, GuessWordSceneProps>(
  ({ editMode, previewMode, classes, activeKey, onClick, values, onSet, onActiveElementClick }, ref) => {
    const { lettersArray, selectionLettersWidth } = useParams({ values, previewMode, editMode, onSet });
    const selectedLetterIndex = useState<number | null>();
    const { hiddenImageList } = useImage();
    const { renderAudios, handlePauseAll } = useAudios({ values });
    const getEditClass = useCallback(
      (type: 'edit' | 'editRoot' = 'edit') => editMode && styles[type as keyof typeof styles],
      [editMode]
    );

    const getValue = useMemo(() => getElementValue<GuessWordElements>(values), [values]);

    const { handleClick } = useActions({
      onClick,
      handlePauseAll,
      disabled: editMode || previewMode,
      onActiveElementClick,
    });
    const isActive = useCallback((key: keyof GuessWordElements) => activeKey === key && styles.active, [activeKey]);
    const isPreview = useMemo(() => previewMode && styles.preview, [previewMode]);
    const isImageHidden = useCallback(
      (key: keyof GuessWordElements, imageListKey?: string, parameter: keyof Parameters = 'url') => {
        const hiddenImageListKey = imageListKey || key;
        return (hiddenImageList[hiddenImageListKey] || !getValue(key, parameter)) && styles.hidden;
      },
      [hiddenImageList, getValue]
    );

    return (
      <div
        id={getElementId('background', previewMode)}
        onClick={handleClick('background')}
        className={clsx(styles.root, isActive('background'), getEditClass('editRoot'), isPreview, classes?.root)}
        style={{
          backgroundColor: `${getValue('background', 'background')}`,
        }}
        ref={ref}
      >
        {renderAudios()}
        <div className={clsx(styles.selectionLetters)}>
          {lettersArray.map((letter, index) => (
            <div
              key={index}
              className={clsx(styles.selectionLetterItemWrapper)}
              style={{
                width: `${selectionLettersWidth}%`,
              }}
            >
              <p className={clsx(styles.selectionLetterItem)}>{letter}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default GuessWord;
