import { default as ReactSelect, GroupBase } from 'react-select';
import clsx from 'clsx';

import { TSelectProps } from './types';

import selectStyles from './Select.module.scss';

const Select = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  id,
  label,
  noOptionsMessage,
  themeType = 'default',
  selectClassName = '',
  wrapperClassName = '',
  placeholder = '',
  ...props
}: TSelectProps<Option, IsMulti, Group>) => {
  const customStyles = {
    control: (provided: any, state: any) => {
      if (themeType === 'frameless') {
        return {
          ...provided,
          width: 'fit-content',
          border: 'none !important',
          boxShadow: 'none !important',
        };
      }

      return {
        ...provided,
        opacity: state.isDisabled ? 0.5 : 1,
        height: 46,
        width: '100%',
        borderRadius: 100,
        border: state.isFocused
          ? '1px solid var(--blue-deafault) !important'
          : state.hasValue
          ? '1px solid var(--blue-deafault) !important'
          : '1px solid var(--blue-messy) !important',
        paddingLeft: 20,
        cursor: 'pointer',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        transition: 'border, color 15s ease-in-out',
      };
    },
    dropdownIndicator: (provided: any) => {
      if (themeType === 'frameless') {
        return {
          ...provided,
          height: '24px',
          width: '24px',
          padding: 0,
          marginLeft: '5px',
          opacity: 0.5,

        };
      }

      return {
        ...provided,
        padding: '12px 20px',
        opacity: 0.5,
      };
    },
    valueContainer: (provided: any) => ({
      ...provided,
      padding: 0,
    }),
    indicatorSeparator: () => ({
      isDisabled: true,
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: '24px',
      position: 'absolute',
      top: 53,
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      border: '1px solid var(--c_grey)',
      // scrollbarWidth: '4px',
      // scrollbarColor:' var(--blue-faded) white'
    }),
    menuList: (provided: any) => ({
      ...provided,
      padding: 0,

    }),
    singleValue: (provided: any) => ({
      ...provided,
      fontSize: 16,
      color: 'var(--blue-dark)',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      fontSize: 14,
      color: 'var(--blue-dark)',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      fontSize: 16,
      padding: '14px 15px',
      borderBottom: '1px solid var(--c_grey)',
      backgroundColor: state.isSelected
        ? 'var(--blue-dark)'
        : state.isFocused
        ? 'var(--c_blue-uncative)'
        : 'var(--c_white-all)',
      color: state.isSelected ? 'white' : 'var(--blue-dark)',
      cursor: 'pointer',
      transition: 'all .15s ease-in-out',
    }),
    input: (provided: any) => ({
      ...provided,
      fontSize: 16,
      color: 'var(--blue-dark)',
    }),
    noOptionsMessage: (provided: any) => ({
      ...provided,
      height: 48,
      fontSize: 14,
      padding: '14px 15px',
      color: 'var(--с_black)',
      backgroundColor: 'var(--c_white-all)',
    }),
  };

  const selectWrapperClasses = clsx(selectStyles.selectWrapper, {
    [wrapperClassName]: !!wrapperClassName,
  });

  const noAsyncNoOptionsMessage = () => 'Ничего не найдено';

  return (
    <div className={selectWrapperClasses}>
      {label && <label htmlFor={id}>{label}</label>}

      <ReactSelect
        noOptionsMessage={
          noOptionsMessage ? noOptionsMessage : noAsyncNoOptionsMessage
        }
        styles={customStyles}
        className={selectClassName}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default Select;
