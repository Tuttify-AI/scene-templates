import React from 'react';
import { DefaultType, GetValue } from '../shared/types';
import { clsx } from '../shared/utils';
import styles from './styles.module.css';
import { CountingElements } from './types';

type Props = {
  getValue: GetValue<CountingElements<string | number>, DefaultType | DefaultType[] | undefined>;
  hidden?: boolean;
  color: string;
  onClick: () => void;
};

const Bubble: React.FC<Props> = ({ getValue, color, onClick, hidden }) => {
  return (
    <div
      className={clsx(styles.bubble, hidden && styles.bubbleHidden)}
      style={{ backgroundColor: `${getValue('image', color)}` }}
      onClick={onClick}
    />
  );
};

export default Bubble;
