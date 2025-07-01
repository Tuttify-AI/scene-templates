import React from 'react';
import { clsx } from '../shared/utils';
import styles from './styles.module.css';

type Props = {
  color: string;
  onClick: () => void;
};

const Bubble: React.FC<Props> = ({ color, onClick }) => {
  return <div className={clsx(styles.bubble)} style={{ backgroundColor: color }} onClick={onClick} />;
};

export default Bubble;
