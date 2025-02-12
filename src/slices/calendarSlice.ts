import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { format, toDate } from 'date-fns-tz';

interface IYearAndMonth {
  year: number;
  month: number;
}

interface ICalendarState {
  selectedYearAndMonth: IYearAndMonth;
  selectedTimestamp: number;
  date: string;
}

const nowDate = toDate(Date.now(), { timeZone: 'Asia/Seoul' });

const initialState: ICalendarState = {
  selectedYearAndMonth: {
    year: nowDate.getFullYear(),
    month: nowDate.getMonth(),
  },
  selectedTimestamp: nowDate.setHours(0, 0, 0, 0),
  date: '',
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    clear: () => initialState,

    handleLeftClick: (state: ICalendarState) => {
      if (state.selectedYearAndMonth.month === 0) {
        state.selectedYearAndMonth.year -= 1;
        state.selectedYearAndMonth.month = 11;
      } else {
        state.selectedYearAndMonth.month -= 1;
      }
    },

    handleRightClick: (state: ICalendarState) => {
      if (state.selectedYearAndMonth.month === 11) {
        state.selectedYearAndMonth.year += 1;
        state.selectedYearAndMonth.month = 0;
      } else {
        state.selectedYearAndMonth.month += 1;
      }
    },

    handleDayClick: (state: ICalendarState, action: PayloadAction<number>) => {
      const selectedDate = toDate(action.payload, { timeZone: 'Asia/Seoul' });

      state.selectedTimestamp = action.payload;
      state.selectedYearAndMonth.year = selectedDate.getFullYear();
      state.selectedYearAndMonth.month = selectedDate.getMonth();

      state.date = format(selectedDate, 'yyyy-MM-dd', { timeZone: 'Asia/Seoul' });
    },
  },
});

export const { clear, handleLeftClick, handleRightClick, handleDayClick } = calendarSlice.actions;

const calendarReducer = calendarSlice.reducer;
export default calendarReducer;
