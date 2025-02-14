import type { ChangeEventHandler, FocusEventHandler } from 'react';
import React, { useState } from 'react';

import * as S from './input.style';
import ValidataionMessage from './validationMessage';

import Eyes from '@/assets/icons/eyes.svg?react';

export type TInput = {
  placeholder: string;
  type: 'normal' | 'thin' | 'password' | 'auth' | string;
  isValid?: boolean;
  errorMessage?: string;
  touched?: boolean;
  autoComplete?: string;
  value?: string;
  valid?: boolean;
  top?: boolean;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  ref?: any;
};

const Input = React.forwardRef<HTMLInputElement, TInput>(
  (
    { placeholder, type, isValid, autoComplete, errorMessage, touched, valid, top, onFocus = () => {}, onBlur = () => {}, onChange = () => {}, ...rest },
    ref,
  ) => {
    const [passwordType, setPasswordType] = useState('password');

    if (type === 'normal') {
      return <S.NormalInputWrapper placeholder={placeholder} ref={ref} {...rest} />;
    }
    if (type === 'thin') {
      return <S.ThinInputWrapper placeholder={placeholder} ref={ref} onFocus={onFocus} onBlur={onBlur} onChange={onChange} {...rest} />;
    }
    return (
      <S.Container>
        <S.InputWrapper>
          <S.Input
            placeholder={placeholder}
            type={type === 'password' ? passwordType : type}
            $isValid={isValid}
            autoComplete={type === 'password' ? (passwordType === 'text' ? 'current-password' : 'new-password') : autoComplete}
            ref={ref}
            {...rest}
          />
          {type === 'password' && (
            <S.Eyes onClick={() => setPasswordType((prevType) => (prevType === 'password' ? 'text' : 'password'))} $active={passwordType === 'text'}>
              <Eyes />
            </S.Eyes>
          )}
        </S.InputWrapper>

        {errorMessage && touched && top && (
          <S.MessageWrapper2>
            <ValidataionMessage message={errorMessage} isError={!valid} />
          </S.MessageWrapper2>
        )}
        {errorMessage && touched && top === false && (
          <S.MessageWrapper>
            <ValidataionMessage message={errorMessage} isError={!valid} />
          </S.MessageWrapper>
        )}
      </S.Container>
    );
  },
);
export default Input;
