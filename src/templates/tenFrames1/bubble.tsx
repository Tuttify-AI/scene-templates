import React from 'react';
import { clsx } from '../shared/utils';
import styles from './styles.module.css';

type Props = {
  hidden?: boolean;
  color: string;
  onClick: () => void;
};

const Bubble: React.FC<Props> = ({ color, onClick, hidden }) => {
  return (
    <div
      className={clsx(styles.bubble, hidden && styles.bubbleHidden)}
      style={{ backgroundColor: color }}
      onClick={onClick}
    />
  );
};

export default Bubble;
