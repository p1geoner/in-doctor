import { FC } from 'react';
import clsx from 'clsx';

import { RadioProps } from './types';

import styles from './CheckFields.module.scss';

const Radio: FC<RadioProps> = ({
  label,
  disabled,
  className = '',
  type = 'radio',
  ...props
}) => {
  const radioStyle = clsx(
    styles.radio,
    {
      [className]: className,
      [styles.disabled]: !!disabled
    },
  );

  return (
    <label className={radioStyle} onClick={event => event.stopPropagation()}>
      <input type={type} {...props} />

      <span>{label}</span>
    </label>
  );
};

export default Radio;
