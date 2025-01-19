import { configureStore } from '@reduxjs/toolkit';

import modalReducer from '@/slices/modalSlice';
import scenarioReducer from '@/slices/scenarioSlice';

const store = configureStore({
  reducer: {
    modal: modalReducer,
    scenario: scenarioReducer,
  },
});

export default store;

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
