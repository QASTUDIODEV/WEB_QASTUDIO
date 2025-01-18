import React from 'react';

import * as S from './codeInput.style';

export type TAuthInput = {
  placeholder: string;
  isValid?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CodeInput = React.forwardRef<HTMLInputElement, TAuthInput>(({ placeholder, isValid, ...rest }, ref) => {
  return (
    <S.Container>
      <S.Input placeholder={placeholder} $isValid={isValid} ref={ref} disabled={isValid} {...rest} />
    </S.Container>
  );
});

export default CodeInput;
