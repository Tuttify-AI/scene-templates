import React from 'react';
import { DefaultType, GetValue } from '../shared/types';
import { TenFramesElements } from './types';
type Props = {
    getValue: GetValue<TenFramesElements<string | number>, DefaultType | DefaultType[] | undefined>;
    hidden?: boolean;
    color: string;
    onClick: () => void;
};
declare const Bubble: React.FC<Props>;
export default Bubble;
