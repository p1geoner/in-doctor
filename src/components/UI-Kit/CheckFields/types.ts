import { InputHTMLAttributes } from 'react';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: 'checkbox';
}

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: 'radio';
}
