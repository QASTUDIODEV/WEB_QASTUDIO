import { createSlice } from '@reduxjs/toolkit';

interface IModalSlice {
  isOpen: boolean;
}
const initialState: IModalSlice = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { open } = modalSlice.actions;

const modalReducer = modalSlice.reducer;
export default modalReducer;
