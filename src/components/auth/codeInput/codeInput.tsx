import React from 'react';

import * as S from './codeInput.style';

export type TAuthInput = {
  placeholder: string;
  isValid?: boolean;
  autoComplete: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CodeInput({ placeholder, isValid, autoComplete, value, onChange }: TAuthInput) {
  return (
    <S.Container>
      <S.Input placeholder={placeholder} $isValid={isValid} autoComplete={autoComplete} value={value} onChange={onChange} />
    </S.Container>
  );
}
