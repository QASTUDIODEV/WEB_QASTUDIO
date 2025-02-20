import type { ChangeEventHandler, FocusEventHandler } from 'react';
import React from 'react';

import * as S from './input.style';

export type TInput = {
  placeholder: string;
  value?: string;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  ref?: any;
};

const Input = React.forwardRef<HTMLInputElement, TInput>(({ placeholder, onFocus = () => {}, onBlur = () => {}, onChange = () => {}, value, ...rest }, ref) => {
  return <S.ThinInputWrapper placeholder={placeholder} ref={ref} onFocus={onFocus} onBlur={onBlur} onChange={onChange} value={value} {...rest} />;
});
export default Input;
