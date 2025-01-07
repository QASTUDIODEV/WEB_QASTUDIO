import React from 'react';

import * as S from './codeInput.style';

export type TAuthInput = {
  placeholder: string;
  isValid?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CodeInput({ placeholder, isValid, ...rest }: TAuthInput) {
  return (
    <S.Container>
      <S.Input placeholder={placeholder} $isValid={isValid} {...rest} />
    </S.Container>
  );
}
