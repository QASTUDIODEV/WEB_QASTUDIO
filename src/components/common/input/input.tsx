import type { ChangeEvent } from 'react';

import * as S from '@/components/common/input/input.style';

type TInputProps = {
  value?: string;
  placeholder?: string;
  width?: `${number}px` | `${number}%`;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ value, placeholder = '입력하세요', width = '820px', onChange }: TInputProps) {
  return <S.InputWrapper value={value} placeholder={placeholder} width={width} onChange={onChange} />;
}
