import { configureStore } from '@reduxjs/toolkit';

import modalReducer from '@/slices/modalSlice';

const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;

export default store;
