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
    setOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setOpen } = modalSlice.actions;

const modalReducer = modalSlice.reducer;
export default modalReducer;
