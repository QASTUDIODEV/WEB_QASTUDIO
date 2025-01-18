import type React from 'react';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface IModalState {
  modals: Array<React.FC<{ onClose: () => void }>>;
}

const initialState: IModalState = {
  modals: [],
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<React.FC<{ onClose: () => void }>>) => {
      state.modals.push(action.payload);
    },
    closeModal: (state, action: PayloadAction<number>) => {
      state.modals.splice(action.payload, 1);
    },
    clearModals: (state) => {
      state.modals = [];
    },
  },
});

export const { openModal, closeModal, clearModals } = modalSlice.actions;
const modalReducer = modalSlice.reducer;
export default modalReducer;
