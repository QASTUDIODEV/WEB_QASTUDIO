import { configureStore } from '@reduxjs/toolkit';

import modalReducer from '@/slices/modalSlice.ts';

function createStore() {
  const store = configureStore({
    reducer: {
      modal: modalReducer,
    },
  });

  return store;
}

const store = createStore();

export default store;

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
