import type { ReactNode } from 'react';

import * as S from './selectBox.style';

type TSelectBoxProps<T extends ReactNode> = {
  selectList: T[];
  onSelect: (value: T) => void;
};

export default function SelectBox<T extends ReactNode>({ selectList, onSelect }: TSelectBoxProps<T>) {
  return (
    <S.Container>
      {selectList.map((e, idx) => (
        <li key={idx} onClick={() => onSelect(e)}>
          {e}
        </li>
      ))}
    </S.Container>
  );
}
