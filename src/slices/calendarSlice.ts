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
  isCalendarOpen: boolean;
}

const nowDate = toDate(Date.now(), { timeZone: 'Asia/Seoul' });

const initialState: ICalendarState = {
  isCalendarOpen: false,
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

    toggleCalendar: (state) => {
      state.isCalendarOpen = !state.isCalendarOpen;
    },

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

      state.isCalendarOpen = !state.isCalendarOpen;
    },
  },
});

export const { clear, handleLeftClick, handleRightClick, handleDayClick, toggleCalendar } = calendarSlice.actions;

const calendarReducer = calendarSlice.reducer;
export default calendarReducer;
