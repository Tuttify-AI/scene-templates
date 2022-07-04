import React, { useCallback, useState } from 'react';

type Params<T> = {
  handleDrop: (targetIndex: T, selectedIndex: T) => (e?: React.DragEvent<HTMLElement>) => void;
};

export default function useDragNDrop<T = number>({ handleDrop }: Params<T>) {
  const [dragTargetIndex, setDragTargetIndex] = useState<null | T>(null);
  const [dragSelectedIndex, setDragSelectedIndex] = useState<null | T>(null);
  const onDrop = useCallback(
    (e?: React.DragEvent<HTMLElement>) => {
      e?.preventDefault();
      dragTargetIndex !== null && dragSelectedIndex !== null && handleDrop(dragTargetIndex, dragSelectedIndex)(e);
      setDragSelectedIndex(null);
      setDragTargetIndex(null);
    },
    [handleDrop, dragTargetIndex, dragSelectedIndex]
  );

  const onDragEnter = useCallback((index: T) => () => setDragTargetIndex(index), []);

  const onDragOver = useCallback((e?: React.DragEvent<HTMLElement>) => e?.preventDefault(), []);

  const onDragLeave = useCallback(() => setDragTargetIndex(null), []);

  const onDragStart = useCallback((index: T) => () => setDragSelectedIndex(index), []);

  const onDragEnd = useCallback(() => setDragSelectedIndex(null), []);

  return {
    onDragOver,
    onDragEnter,
    onDragLeave,
    onDrop,
    dragTargetIndex,
    onDragStart,
    onDragEnd,
    dragSelectedIndex,
  };
}
