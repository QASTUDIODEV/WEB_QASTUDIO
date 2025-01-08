import React from 'react';

import * as S from './authButton.style';

interface IButtonProps {
  children: React.ReactNode;
  format?: 'normal' | 'small' | 'code'; // 버튼 유형
  disabled?: boolean; //  비활성화 여부
  onClick?: () => void; // 클릭 이벤트
  type?: 'button' | 'submit' | 'reset';
  codeVerify?: boolean;
  valid?: boolean;
}
export default function AuthButton({ children, format = 'normal', disabled = false, onClick, type, codeVerify, valid }: IButtonProps) {
  return (
    <S.StyledButton type={type} valid={valid} format={format} disabled={disabled} codeVerify={codeVerify} onClick={disabled ? undefined : onClick}>
      {children}
    </S.StyledButton>
  );
}
