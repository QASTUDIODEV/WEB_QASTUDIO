import { useState } from 'react';

import SelectBox from '@/components/dashboard/selectBox/selectBox';
import * as S from '@/components/dashboard/table/table.style';

import DownArrow from '@/assets/icons/arrow_down.svg?react';
import UpArrow from '@/assets/icons/arrow_up.svg?react';
import { pageData } from '@/mocks/tableData.ts';

interface IProps {
  onSelect: (value: string) => void;
}

export default function PageNameHeader({ onSelect }: IProps) {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <S.HeaderWrapper>
      <S.ButtonHeader onClick={() => setIsClicked((prev) => !prev)}>
        <p>Page</p>
        {isClicked ? <UpArrow /> : <DownArrow />}
      </S.ButtonHeader>
      {isClicked && (
        <SelectBox
          selectList={pageData}
          onSelect={(value) => {
            setIsClicked(false);
            onSelect(value);
          }}
        />
      )}
    </S.HeaderWrapper>
  );
}
