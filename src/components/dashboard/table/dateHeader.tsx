import { useState } from 'react';
import type { Column } from '@tanstack/react-table';

import type { TTestListDTO } from '@/types/test/test';

import * as S from '@/components/dashboard/table/table.style';

import Calendar from '../calendar/calendar';

import { DownArrow, UpArrow } from '@/assets/icons';

interface IProps {
  column: Column<TTestListDTO, string>;
}

export default function DateHeader({ column }: IProps) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <S.HeaderWrapper>
      <S.ButtonHeader onClick={() => setIsClicked((prev) => !prev)}>
        <p>Date</p>
        {column.getIsSorted() ? <UpArrow /> : <DownArrow />}
      </S.ButtonHeader>
      {isClicked && <Calendar />}
    </S.HeaderWrapper>
  );
}
