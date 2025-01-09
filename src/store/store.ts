import { configureStore } from '@reduxjs/toolkit';

import modalReducer from '@/slices/modalSlice.ts';
import scenarioReducer from '@/slices/scenarioSlice';

function createStore() {
  const store = configureStore({
    reducer: {
      modal: modalReducer,
      scenario: scenarioReducer,
    },
  });

  return store;
}

const store = createStore();

export default store;

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
