import React, { HTMLAttributes } from 'react';
import { clsx } from '../utils';
import styles from './styles.module.css';
import iconCross from '../assets/icon-cross.svg';

const DeleteButton: React.VFC<HTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => (
  <button className={clsx(styles.btn, styles.btnDelete, className)} {...props}>
    <img className={styles.deleteIcon} src={iconCross} alt="" />
  </button>
);

export default DeleteButton;
