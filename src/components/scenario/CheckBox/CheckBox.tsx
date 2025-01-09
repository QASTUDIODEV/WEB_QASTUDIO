import { useState } from 'react';

import CheckBoxFalseIcon from '@/assets/icons/check box_false.svg?react';
import CheckBoxTrueIcon from '@/assets/icons/check box_true.svg?react';

interface ICheckBoxProps {
  onClick?: () => void;
}

export default function CheckBox({ onClick }: ICheckBoxProps) {
  const [isChecked, setIsChecked] = useState(false);

  // 기본 클릭 함수: 체크박스 상태 토글
  const handleCheckBoxClick = () => {
    setIsChecked(!isChecked);

    // 추가 onClick 함수
    if (onClick) {
      onClick();
    }
  };

  return (
    <div onClick={handleCheckBoxClick} style={{ cursor: 'pointer' }}>
      {isChecked ? <CheckBoxTrueIcon /> : <CheckBoxFalseIcon />}
    </div>
  );
}
