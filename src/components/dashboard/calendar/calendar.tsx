import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toDate } from 'date-fns-tz';

import { DAY_OF_WEEK } from '@/constants/day/day';

import { getDayList, isCurrentMonth } from '@/utils/getDayList';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';

import * as S from './calendar.style';

import PreArrow from '@/assets/icons/arrow_left.svg?react';
import NextArrow from '@/assets/icons/arrow_right.svg?react';
import { clear, handleDayClick, handleLeftClick, handleRightClick } from '@/slices/calendarSlice';

export default function Calendar() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const { selectedYearAndMonth, selectedTimestamp } = useSelector((state) => state.calendar);

  useEffect(() => {
    if (!pathname.includes('dashboard')) clear();
  }, [pathname]);

  return (
    <S.Container>
      <S.CalenderHeaderWrapper>
        <button onClick={() => dispatch(handleLeftClick())}>
          <PreArrow />
        </button>
        <div>
          {selectedYearAndMonth.year}년 {selectedYearAndMonth.month + 1}월
        </div>
        <button onClick={() => dispatch(handleRightClick())}>
          <NextArrow />
        </button>
      </S.CalenderHeaderWrapper>
      <S.CalendarContainer>
        <S.DayofWeekWrapper>
          {Object.values(DAY_OF_WEEK).map((e, idx) => (
            <div key={idx}>{e}</div>
          ))}
        </S.DayofWeekWrapper>
        <S.DayWrapper>
          {getDayList(selectedYearAndMonth.year, selectedYearAndMonth.month).map((e) => (
            <S.Day
              onClick={() => dispatch(handleDayClick(e))}
              key={e}
              $isSelected={e === selectedTimestamp}
              $isCurrentMonth={isCurrentMonth(e, selectedYearAndMonth.month)}
            >
              <p>{toDate(e, { timeZone: 'Asia/Seoul' }).getDate()}</p>
            </S.Day>
          ))}
        </S.DayWrapper>
      </S.CalendarContainer>
    </S.Container>
  );
}
