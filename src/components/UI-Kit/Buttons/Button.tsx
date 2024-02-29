"use client"

import { FC } from 'react';
import clsx from 'clsx';

import { TButtonProps } from './types';

import styles from './Button.module.scss';

const Button: FC<TButtonProps> = ({
  theme = 'outlined',
  type = 'button',
  size = 'default',
  className = '',
  children,
  reference,
  ...props
}) => {
  const buttonStyle: string = clsx(styles.button, styles.defaultSize, {
    [className]: className,
    [styles.filled]: theme === 'filled',
    [styles.outlined]: theme === 'outlined',
    [styles.white]: theme === 'white',
    [styles.small]: size === 'small',
  });

  return (
    <button ref={reference} type={type} className={buttonStyle} {...props}>
      {children}
    </button>
  );
};

export default Button;
