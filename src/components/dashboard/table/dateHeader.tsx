import type { Column } from '@tanstack/react-table';

import type { TTestListDTO } from '@/types/test/test';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';

import * as S from '@/components/dashboard/table/table.style';

import Calendar from '../calendar/calendar';

import { DownArrow, UpArrow } from '@/assets/icons';
import { toggleCalendar } from '@/slices/calendarSlice.ts';

interface IProps {
  column: Column<TTestListDTO, string>;
}

export default function DateHeader({ column }: IProps) {
  const dispatch = useDispatch();
  const isClicked = useSelector((state) => state.calendar.isCalendarOpen);

  return (
    <S.HeaderWrapper>
      <S.ButtonHeader onClick={() => dispatch(toggleCalendar())}>
        <p>Date</p>
        {column.getIsSorted() ? <UpArrow /> : <DownArrow />}
      </S.ButtonHeader>
      {isClicked && <Calendar />}
    </S.HeaderWrapper>
  );
}
