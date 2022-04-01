import React, { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react';

import '../shared/slplayer';
import { AtomiDocument, SceneProps } from '../shared/types';
import { clsx } from '../shared/utils';
import docData from './halloween.js';
import styles from './styles.module.css';

const Atomi = forwardRef<HTMLDivElement, SceneProps>(({ previewMode, onClick, onActiveElementClick }, ref) => {
  const atomiContainerRef = useRef<HTMLDivElement>(null);
  const atomiDocument = useRef<AtomiDocument>();
  const isPreview = useMemo(() => previewMode && styles.preview, [previewMode]);

  useEffect(() => {
    if (window?.AtomiSaola) {
      const li = { color: '#2090e6', density: 9, diameter: 60, range: 1, shape: 'oval', speed: 1 };
      window.AtomiSaola.loadedDocs.push(docData);
      atomiDocument.current = window.AtomiSaola.openDoc(docData, atomiContainerRef.current, {
        paused: previewMode,
        preloaderOptions: li,
        center: 'horizontal',
        autofit: true,
      });
    }
    return () => {
      atomiDocument?.current?.destroy && atomiDocument?.current?.destroy();
    };
  }, [atomiDocument, previewMode]);

  const handleClick = useCallback(() => {
    if (onClick && atomiContainerRef.current) {
      onClick('atomi', atomiContainerRef.current);
    }
    if (onActiveElementClick) {
      onActiveElementClick('atomi');
    }
  }, [onClick, onActiveElementClick]);

  return (
    <div className={clsx(styles.root, isPreview)} ref={ref}>
      <div id="atomi" onClick={handleClick} className={styles.rootScene} ref={atomiContainerRef} />
    </div>
  );
});

export default Atomi;
