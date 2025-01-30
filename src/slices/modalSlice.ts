import { createSlice } from '@reduxjs/toolkit';

interface IModalState {
  modalType: string;
  isOpen: boolean;
  modalProps?: Record<string, any>;
}

const initialState = {
  modalType: '',
  isOpen: false,
  modalProps: {},
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.modalType = action.payload;
      state.isOpen = true;
      state.modalProps = action.payload.modalProps || {};
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
