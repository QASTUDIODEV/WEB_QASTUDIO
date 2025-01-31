import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface IModalState {
  modalType: string;
  isOpen: boolean;
  modalProps?: Record<string, any>;
}

const initialState: IModalState = {
  modalType: '',
  isOpen: false,
  modalProps: {},
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string | { modalType: string; modalProps?: Record<string, any> }>) => {
      if (typeof action.payload === 'string') {
        state.modalType = action.payload;
        state.modalProps = {};
      } else {
        state.modalType = action.payload.modalType;
        state.modalProps = action.payload.modalProps || {};
      }
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.modalType = '';
      state.isOpen = false;
      state.modalProps = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectModal = (state: { modal: IModalState }) => state.modal;

const modalReducer = modalSlice.reducer;
export default modalReducer;
