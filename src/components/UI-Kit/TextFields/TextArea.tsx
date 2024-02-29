import { FC } from 'react';

import clsx from 'clsx';

import { TextAreaProps } from './types';

import styles from './TextFields.module.scss';

const TextArea: FC<TextAreaProps> = ({
  id,
  validation,
  label,
  disabled,
  className = '',
  wrapperClassName = '',
  resizable = false,
  placeholder = ' ',
  ...props
}) => {
  const wrapperStyle = clsx(styles.wrapper, {
    [wrapperClassName]: !!wrapperClassName,
    [styles.disabled]: !!disabled,
  });

  const textFieldStyle = clsx(styles.textArea, {
    [className]: className,
    [styles.validation]: !!validation,
    [styles.notResizable]: !resizable,
  });

  return (
    <div className={wrapperStyle}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <textarea
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        className={textFieldStyle}
        {...props}
      />
    </div>
  );
};

export default TextArea;
