import type { ChangeEventHandler, FocusEventHandler } from 'react';
import React from 'react';

import * as S from './input.style';

export type TInput = {
  placeholder: string;
  type: 'normal' | 'thin' | 'password' | 'auth' | string;
  value?: string;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  ref?: any;
};

const Input = React.forwardRef<HTMLInputElement, TInput>(
  ({ placeholder, type, onFocus = () => {}, onBlur = () => {}, onChange = () => {}, value, ...rest }, ref) => {
    if (type === 'normal') {
      return <S.NormalInputWrapper placeholder={placeholder} ref={ref} {...rest} />;
    }
    if (type === 'thin') {
      return <S.ThinInputWrapper placeholder={placeholder} ref={ref} onFocus={onFocus} onBlur={onBlur} onChange={onChange} value={value} {...rest} />;
    }
    return null;
  },
);
export default Input;
