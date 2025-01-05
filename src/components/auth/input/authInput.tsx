import { useState } from 'react';

import * as S from './authInput.style';

import Eyes from '@/assets/icons/eyes.svg?react';

export type TAuthInput = {
  placeholder: string;
  type: string;
  isValid?: boolean;
};

export default function AuthInput({ placeholder, type, isValid }: TAuthInput) {
  const [passwordType, setPasswordType] = useState('password');

  return (
    <S.Container>
      <S.Input
        placeholder={placeholder}
        type={type === 'password' ? passwordType : type}
        $isValid={isValid}
        autoComplete={type === 'password' ? (passwordType === 'text' ? 'current-password' : 'new-password') : undefined}
      />
      {type === 'password' && (
        <S.Eyes onClick={() => setPasswordType((prevType) => (prevType === 'password' ? 'text' : 'password'))} $active={passwordType === 'text'}>
          <Eyes />
        </S.Eyes>
      )}
    </S.Container>
  );
}
