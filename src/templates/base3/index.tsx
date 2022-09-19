import { animated } from '@react-spring/web';
import React, { CSSProperties, forwardRef, useCallback, useMemo, useRef } from 'react';
import { AddButton, DeleteButton } from '../shared/components';
import { useActions, useAudios, useImage } from '../shared/hooks';
import { SceneProps, SceneValue, TemplateParameter } from '../shared/types';
import { clsx, getElementId, getElementValue } from '../shared/utils';
import styles from '../tiles/styles.module.css';
import { useAnimation, useBlocks, useBlocksParams } from './hooks';
import sceneStyles from './styles.module.css';
import { BaseSceneElements, Classes } from './types';

export type Base3SceneProps = SceneProps & {
  parameters?: BaseSceneElements<TemplateParameter>;
  values?: BaseSceneElements<SceneValue>;
  classes?: Classes;
};

const Base3 = forwardRef<HTMLDivElement, Base3SceneProps>(
  ({ editMode, previewMode, classes, activeKey, onClick, parameters, values, onActiveElementClick }, ref) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const { blocks, allowDeleteTile, allowAddBlock } = useBlocksParams({ values, previewMode, editMode });
    const { hiddenImageList } = useImage();
    const { handleMouseMove, resetAnimatedProps } = useAnimation({
      disabled: editMode || previewMode,
      element: scrollRef.current,
    });
    const firstBlock = getElementId(blocks[0], previewMode);
    useBlocks(firstBlock, editMode);

    const getEditClass = useCallback(
      (type: 'edit' | 'editText' | 'editBlock' | 'editRoot' = 'edit') => editMode && sceneStyles[type],
      [editMode]
    );

    const getValue = useMemo(() => getElementValue(values, parameters), [values, parameters]);

    const { renderAudios, handleElementAudio } = useAudios({ values, previewMode });

    const { handleClick } = useActions({
      onClick,
      disabled: editMode || previewMode,
      onActiveElementClick,
      handleElementAudio,
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
    return (
      <animated.div
        id={getElementId('background', previewMode)}
        onClick={handleClick('background', { data: { background: getValue('background', 'background') as string } })}
        className={clsx(sceneStyles.root, isActive('background'), getEditClass('editRoot'), isPreview, classes?.root)}
        style={{
          backgroundColor: `${getValue('background', 'background')}`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetAnimatedProps}
        ref={ref}
      >
        {renderAudios()}
        {allowAddBlock && <AddButton className={sceneStyles.addBtn} />}
        <div ref={scrollRef} className={sceneStyles.scroll} />
        {/* <animated.div
          id={getElementId('block1', previewMode)}
          onMouseEnter={handleHover('title')}
          onMouseLeave={clearHover}
          onClick={handleClick('title', { data: { text: getValue('title', 'text') as string } })}
          className={clsx(sceneStyles.title, isActive('title'), getEditClass('editText'), isPreview, classes?.title)}
          style={{
            x: visibleX,
            opacity,
            ...getScale('title'),
            ...getAnimationsStyle(transition({ modX: 20, modY: 20 })),
          }}
        >
          {getValue('title', 'text')}
        </animated.div>*/}
        {/*<animated.p
          id={getElementId('description', previewMode)}
          onMouseEnter={handleHover('description')}
          onMouseLeave={clearHover}
          onClick={handleClick('description', { data: { text: getValue('description', 'text') as string } })}
          className={clsx(
            sceneStyles.description,
            isActive('description'),
            getEditClass('editText'),
            isPreview,
            classes?.description
          )}
          style={{
            x: visibleX,
            opacity,
            ...getScale('description'),
            ...getAnimationsStyle(transition({ modX: 15, modY: 15 })),
          }}
        >
          {getValue('description', 'text')}
        </animated.p>*/}
        {/* <animated.img
          id={getElementId('image', previewMode)}
          onMouseEnter={handleHover('image')}
          onMouseLeave={clearHover}
          alt="image"
          src={`${getValue('image', 'url')}` || defaultImage}
          className={clsx(
            sceneStyles.image,
            isImageHidden('image'),
            isActive('image'),
            getEditClass(),
            isPreview,
            classes?.image
          )}
          style={{
            rotate,
            opacity,
            ...getScale('image'),
            ...getAnimationsStyle(transition({ modX: 20, modY: 20 })),
          }}
          onLoad={() => onImageLoad('image')}
          onError={() => onImageError('image')}
          onClick={handleClick('image', { data: { imageUrl: getValue('image', 'url') as string } })}
        />*/}
        {blocks.map((k, index) => (
          <>
            <animated.div
              key={k}
              id={getElementId(k, previewMode)}
              className={clsx(
                sceneStyles.block,
                isImageHidden('block'),
                isActive('block'),
                getEditClass('editBlock'),
                isPreview,
                classes?.image
              )}
              onTouchMove={() => {
                console.log('animated.div');
              }}
              onClick={handleClick('')}
              style={
                {
                  '--background-color': getValue(k, 'background'),
                  '--background-hover-color': getValue(k, 'background_hover'),
                  '--top': getValue(k, 'top'),
                  '--left': getValue(k, 'left'),
                } as CSSProperties
              }
            >
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
