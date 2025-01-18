import { createSlice } from '@reduxjs/toolkit';

interface IModalState {
  modalType: string;
  isOpen: boolean;
}

const initialState = {
  modalType: '',
  isOpen: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.modalType = action.payload;
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.modalType = '';
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectModal = (state: { modal: IModalState }) => state.modal;

const modalReducer = modalSlice.reducer;
export default modalReducer;
