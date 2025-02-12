import { useState } from 'react';

import { STATE } from '@/constants/state/state';
import type { TEST_STATE } from '@/enums/enums';

import SelectBox from '@/components/dashboard/selectBox/selectBox';
import * as S from '@/components/dashboard/table/table.style';

import DownArrow from '@/assets/icons/arrow_down.svg?react';
import UpArrow from '@/assets/icons/arrow_up.svg?react';

export default function StateHeader() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <S.HeaderWrapper>
      <S.ButtonHeader onClick={() => setIsClicked((prev) => !prev)}>
        <p>State</p>
        {isClicked ? <UpArrow /> : <DownArrow />}
      </S.ButtonHeader>
      {isClicked && <SelectBox<TEST_STATE> selectList={STATE} filterKey={'state'} />}
    </S.HeaderWrapper>
  );
}
