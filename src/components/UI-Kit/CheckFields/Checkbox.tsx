import { FC } from 'react';
import clsx from 'clsx';

import { CheckboxProps } from './types';

import styles from './CheckFields.module.scss';

const Checkbox: FC<CheckboxProps> = ({
  label,
  disabled,
  className = '',
  type = 'checkbox',
  children,
  ...props
}) => {
  const checkboxStyle = clsx(
    styles.checkbox,
    {
      [className]: className,
      [styles.disabled]: !!disabled
    },
  );

  return (
    <label className={checkboxStyle} onClick={event => event.stopPropagation()}>
      <input type={type} disabled={disabled} {...props} />

      <span>{children}</span>
    </label>
  );
};

export default Checkbox;
