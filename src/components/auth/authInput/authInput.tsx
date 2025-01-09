import React, { useState } from 'react';

import * as S from './authInput.style';
import ValidataionMessage from '../validationMessage/validationMessage';

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
};

export default function AuthInput({ placeholder, type, isValid, autoComplete, errorMessage, touched, valid, top, ...rest }: TAuthInput) {
  const [passwordType, setPasswordType] = useState('password');

  return (
    <S.Container>
      <S.InputWrapper>
        <S.Input
          placeholder={placeholder}
          type={type === 'password' ? passwordType : type}
          $isValid={isValid}
          autoComplete={type === 'password' ? (passwordType === 'text' ? 'current-password' : 'new-password') : autoComplete}
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
}
