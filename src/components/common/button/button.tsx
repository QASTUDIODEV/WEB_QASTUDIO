import React from 'react';

import * as S from '@/components/common/button/button.style.ts';

/* 
    예시)
    <Button type="normal" color="default" disabled={true} icon={<Play />} iconPosition="right">
        Play
    </Button>
*/

interface IButtonProps {
  children: React.ReactNode;
  type?: 'normal' | 'act' | 'small_round' | 'small_square' | 'tag'; // 버튼 유형
  color?: 'default' | 'blue' | 'gray' | 'green' | 'white_round' | 'red' | 'white_square' | 'mint'; // 버튼 색상 타입
  disabled?: boolean; // 비활성화 여부
  onClick?: () => void; // 클릭 이벤트
  icon?: React.ReactNode; // 아이콘 컴포넌트
  iconPosition?: 'left' | 'right'; // 아이콘 위치
}

function Button({ children, type = 'normal', color = 'default', disabled = false, onClick, icon, iconPosition = 'left' }: IButtonProps) {
  return (
    <S.StyledButton type={type} color={color} disabled={disabled} onClick={disabled ? undefined : onClick}>
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </S.StyledButton>
  );
}

export default Button;
