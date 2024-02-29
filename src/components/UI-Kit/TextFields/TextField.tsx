"use client"

import React, { FC, useState } from 'react';
import clsx from 'clsx';

import { TextFieldProps } from './types';

import IcOpenedEye from '@/assets/icons/forms/ic_eye-opened.svg';
import IcClosedEye from '@/assets/icons/forms/ic_eye-closed.svg';
import styles from './TextFields.module.scss';

const TextField: FC<TextFieldProps> = ({
  theme = 'white',
  id,
  label,
  validation,
  disabled,
  reference,
  type = 'text',
  className = '',
  wrapperClassName = '',
  placeholder = ' ',
  ...props
}) => {
  const [inputType, setInputType] = useState(type);
  const [isShowPassword, setShowPassword] = useState(false);

  const wrapperStyle = clsx(styles.wrapper, {
    [wrapperClassName]: !!wrapperClassName,
    [styles.blue]: theme === 'blue',
    [styles.disabled]: !!disabled,
  });

  const textFieldStyle = clsx(styles.input, {
    [className]: !!className,
    [styles.validation]: !!validation,
  });

  const showPassword = () => {
    setShowPassword(true);
    setInputType('text');
  };

  const hidePassword = () => {
    setShowPassword(false);
    setInputType('password');
  };

  return (
    <div className={wrapperStyle}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <input
        id={id}
        ref={reference}
        type={inputType}
        disabled={disabled}
        placeholder={placeholder}
        className={textFieldStyle}
        {...props}
      />
    </div>
  );
};

export default TextField;
