import {ButtonHTMLAttributes, Dispatch, LegacyRef, ReactNode, SetStateAction} from 'react';
import { LinkProps } from "next/link";
import {Product, ProductCard} from "@/types/types";

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
  isCheckedCard:boolean;
  product: Product | ProductCard;
  };

export type TLinkButtonProps = LinkProps &
  IButtonStylesProps & {
  className?: string;

  };
