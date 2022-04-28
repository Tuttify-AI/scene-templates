import React, { HTMLAttributes } from 'react';
import { clsx } from '../utils';
import styles from './styles.module.css';
import iconPlus from '../assets/icon-plus.svg';

const AddButton: React.VFC<HTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => (
  <button className={clsx(styles.btn, styles.btnAdd, className)} {...props}>
    <img className={styles.addIcon} src={iconPlus} alt="" />
  </button>
);

export default AddButton;
