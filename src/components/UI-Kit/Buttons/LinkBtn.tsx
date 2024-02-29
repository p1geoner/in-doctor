"use client"
import { FC, PropsWithChildren } from 'react';
import Link from "next/link";

import clsx from 'clsx';

import { TLinkButtonProps } from './types';

import styles from './Button.module.scss';

const LinkBtn: FC<PropsWithChildren<TLinkButtonProps>> = ({
  theme = 'outlined',
  size = 'default',
  className = '',
  children,
  ...props
}) => {
  const buttonStyle: string = clsx(styles.button, styles.defaultSize, {
    [className]: className,
    [styles.filled]: theme === 'filled',
    [styles.outlined]: theme === 'outlined',
    [styles.small]: size === 'small',
  });

  return (
    <Link className={buttonStyle} {...props}>
      {children}
    </Link>
  );
};

export default LinkBtn;
