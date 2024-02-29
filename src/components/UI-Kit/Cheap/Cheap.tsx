"use client"

import {FC, useState} from 'react';
import clsx from 'clsx';

import { TButtonProps } from './types';

import styles from './Cheap.module.scss';

import IcClose from '@/assets/icons/close.svg'

const Button: FC<TButtonProps> = ({
                                    theme = 'outlined',
                                    type = 'button',
                                    size = 'default',
                                    className = '',
                                    children,
                                    onClickCheap,
  isCheckedCheap,
                                    reference,
                                    ...props
                                  }) => {
  const [isChecked, setIsChecked] = useState(isCheckedCheap);
  const buttonStyle: string = clsx(styles.button, styles.defaultSize, {
    [className]: className,
    [styles.filled]: isChecked,
    [styles.outlined]: theme === 'outlined',
    [styles.white]: theme === 'white',
    [styles.small]: size === 'small',
  });

  return (
    <button onClick={()=>{setIsChecked(!isChecked);onClickCheap(isChecked);}} ref={reference} type={type} className={buttonStyle} {...props}>
      {children}
      {isChecked && <IcClose></IcClose> }
    </button>
  );
};

export default Button;
