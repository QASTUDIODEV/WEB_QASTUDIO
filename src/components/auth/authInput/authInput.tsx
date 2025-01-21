import React, { useState } from 'react';

import ValidataionMessage from '@/components/common/input/validationMessage';

import * as S from './authInput.style';

import Eyes from '@/assets/icons/eyes.svg?react';

export type TAuthInput = {
  placeholder: string;
  type: string;
  isValid?: boolean;
  errorMessage?: string;
  touched?: boolean;
  autoComplete: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  valid?: boolean;
  top: boolean;
  ref: any;
};

const AuthInput = React.forwardRef<HTMLInputElement, TAuthInput>(
  ({ placeholder, type, isValid, autoComplete, errorMessage, touched, valid, top, ...rest }, ref) => {
    const [passwordType, setPasswordType] = useState('password');

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
export default AuthInput;
