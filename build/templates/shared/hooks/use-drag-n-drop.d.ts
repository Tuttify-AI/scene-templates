import React from 'react';
type Params<TargetItem, SelectedItem> = {
    handleDrop: (targetItem: TargetItem, selectedItem: SelectedItem) => (e?: React.DragEvent<HTMLElement>) => void;
};
export default function useDragNDrop<TargetItem = number, SelectedItem = number>({ handleDrop, }: Params<TargetItem, SelectedItem>): {
    onDragOver: (e?: React.DragEvent<HTMLElement>) => void | undefined;
    onDragEnter: (item: TargetItem) => () => void;
    onDragLeave: () => void;
    onDrop: (e?: React.DragEvent<HTMLElement>) => void;
    dragTargetItem: TargetItem | null;
    onDragStart: (item: SelectedItem) => () => void;
    onDragEnd: () => void;
    dragSelectedItem: SelectedItem | null;
};
export {};
