import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/slices/authSlice';
import calendarReducer from '@/slices/calendarSlice';
import modalReducer from '@/slices/modalSlice';
import scenarioActReducer from '@/slices/scenarioActSlice';
import scenarioReducer from '@/slices/scenarioSlice';

const store = configureStore({
  reducer: {
    modal: modalReducer,
    scenario: scenarioReducer,
    scenarioAct: scenarioActReducer,
    auth: authReducer,
    calendar: calendarReducer,
  },
});

export default store;

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
