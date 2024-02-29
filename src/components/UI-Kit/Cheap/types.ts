import {ButtonHTMLAttributes, LegacyRef, ReactNode} from 'react';
import { LinkProps } from "next/link";

type ThemeType =
  | 'outlined'
  | 'filled'
  | 'white'


type ButtonType = 'button' | 'reset' | 'submit';

type SizeType = 'default' | 'small';

export interface IButtonStylesProps {
  theme?: ThemeType;
  size?: SizeType;
}

export type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  IButtonStylesProps & {
    type?: ButtonType;
    reference?: LegacyRef<HTMLButtonElement>;
    onClickCheap: any;
  isCheckedCheap:boolean;
  };

export type TLinkButtonProps = LinkProps &
  IButtonStylesProps & {
    className?: string;
    children: ReactNode;
  };
