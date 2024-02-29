import { GroupBase, Props } from 'react-select';

export type TSelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = Props<Option, IsMulti, Group> & IBaseSelectProps;

export interface IBaseSelectProps {
  label?: string;
  selectClassName?: string;
  wrapperClassName?: string;
  themeType?: ThemeType;
}

type ThemeType = 'default' | 'frameless';
