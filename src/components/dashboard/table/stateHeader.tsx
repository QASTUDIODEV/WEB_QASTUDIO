import { useState } from 'react';

import { STATE } from '@/constants/state/state';
import type { TEST_STATE } from '@/enums/enums';

import SelectBox from '@/components/dashboard/selectBox/selectBox';
import * as S from '@/components/dashboard/table/table.style';

import DownArrow from '@/assets/icons/arrow_down.svg?react';
import UpArrow from '@/assets/icons/arrow_up.svg?react';

interface IProps {
  onSelect: (value: TEST_STATE) => void;
}

export default function StateHeader({ onSelect }: IProps) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <S.HeaderWrapper>
      <S.ButtonHeader onClick={() => setIsClicked((prev) => !prev)}>
        <p>State</p>
        {isClicked ? <UpArrow /> : <DownArrow />}
      </S.ButtonHeader>
      {isClicked && <SelectBox<TEST_STATE> selectList={STATE} onSelect={onSelect} />}
    </S.HeaderWrapper>
  );
}
