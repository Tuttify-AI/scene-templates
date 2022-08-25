import React, { useCallback, useState } from 'react';

type Params<TargetItem, SelectedItem> = {
  handleDrop: (targetItem: TargetItem, selectedItem: SelectedItem) => (e?: React.DragEvent<HTMLElement>) => void;
};

export default function useDragNDrop<TargetItem = number, SelectedItem = number>({
  handleDrop,
}: Params<TargetItem, SelectedItem>) {
  const [dragTargetItem, setDragTargetItem] = useState<null | TargetItem>(null);
  const [dragSelectedItem, setDragSelectedItem] = useState<null | SelectedItem>(null);
  const onDrop = useCallback(
    (e?: React.DragEvent<HTMLElement>) => {
      e?.preventDefault();
      dragTargetItem !== null && dragSelectedItem !== null && handleDrop(dragTargetItem, dragSelectedItem)(e);
      setDragSelectedItem(null);
      setDragTargetItem(null);
    },
    [handleDrop, dragTargetItem, dragSelectedItem]
  );

  const onDragEnter = useCallback((item: TargetItem) => () => setDragTargetItem(item), []);

  const onDragOver = useCallback((e?: React.DragEvent<HTMLElement>) => e?.preventDefault(), []);

  const onDragLeave = useCallback(() => setDragTargetItem(null), []);

  const onDragStart = useCallback((item: SelectedItem) => () => setDragSelectedItem(item), []);

  const onDragEnd = useCallback(() => setDragSelectedItem(null), []);

  return {
    onDragOver,
    onDragEnter,
    onDragLeave,
    onDrop,
    dragTargetItem,
    onDragStart,
    onDragEnd,
    dragSelectedItem,
  };
}
