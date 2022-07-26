import { animated } from '@react-spring/web';
import React, { CSSProperties, forwardRef, useCallback, useMemo } from 'react';
import { AddButton, DeleteButton } from '../shared/components';
import { useActions, useAudios, useImage } from '../shared/hooks';
import { SceneProps, SceneValue, TemplateParameter } from '../shared/types';
import { clsx, getElementId, getElementValue } from '../shared/utils';
import styles from '../tiles/styles.module.css';
import { useBlocksParams } from './hooks';
import sceneStyles from './styles.module.css';
import { BaseSceneElements, Classes } from './types';

export type Base3SceneProps = SceneProps & {
  parameters?: BaseSceneElements<TemplateParameter>;
  values?: BaseSceneElements<SceneValue>;
  classes?: Classes;
};

const Base3 = forwardRef<HTMLDivElement, Base3SceneProps>(
  ({ editMode, previewMode, classes, activeKey, onClick, parameters, values, onActiveElementClick }, ref) => {
    const { blocks, allowDeleteTile, allowAddBlock } = useBlocksParams({ values, previewMode, editMode });
    const { hiddenImageList } = useImage();
    const getEditClass = useCallback(
      (type: 'edit' | 'editBlock' | 'editRoot' = 'edit') => editMode && sceneStyles[type],
      [editMode]
    );

    const getValue = useMemo(() => getElementValue(values, parameters), [values, parameters]);

    const { renderAudios, handlePauseAll } = useAudios({ values });

    const { handleClick } = useActions({
      onClick,
      disabled: editMode || previewMode,
      onActiveElementClick,
      handlePauseAll,
    });

    const isActive = useCallback(
      (key: keyof BaseSceneElements) => activeKey === key && sceneStyles.active,
      [activeKey]
    );
    const isImageHidden = useCallback(
      (key: keyof BaseSceneElements) => hiddenImageList[key] && sceneStyles.hidden,
      [hiddenImageList]
    );
    const isPreview = useMemo(() => previewMode && sceneStyles.preview, [previewMode]);

    const preventClickOnDrag = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
    }, []);

    return (
      <animated.div
        id={getElementId('background', previewMode)}
        //onClick={handleClick('background', { data: { background: getValue('background', 'background') as string } })}
        className={clsx(sceneStyles.root, isActive('background'), getEditClass('editRoot'), isPreview, classes?.root)}
        style={{
          backgroundColor: `${getValue('background', 'background')}`,
        }}
        ref={ref}
      >
        {renderAudios()}
        {allowAddBlock && <AddButton className={sceneStyles.addBtn} />}
        {blocks.map((block, index) => (
          <>
            <animated.div
              key={block.id}
              id={getElementId(block.id, previewMode)}
              className={clsx(
                sceneStyles.block,
                isImageHidden(block.id),
                isActive(block.id),
                getEditClass('editBlock'),
                isPreview,
                classes?.image
              )}
              onTouchMove={() => {
                console.log('animated.div');
              }}
              onClick={handleClick(block.id)}
              style={
                {
                  backgroundColor: getValue(block.id, 'background'),
                  top: getValue(block.id, 'top'),
                  left: getValue(block.id, 'left'),
                } as CSSProperties
              }
            >
              <div onClick={preventClickOnDrag} className={sceneStyles.dragBlock} />
              {allowDeleteTile && <DeleteButton className={clsx(styles.btnDeleteTile)} onClick={() => ({ index })} />}
            </animated.div>
            <div
              id="ghost-pane"
              onTouchMove={() => {
                console.log('ghost-pane');
              }}
            />
          </>
        ))}
      </animated.div>
    );
  }
);

export default Base3;
