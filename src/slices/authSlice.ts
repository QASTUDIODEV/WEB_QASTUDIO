import { createSlice } from '@reduxjs/toolkit';

type TAuthState = {
  isSignup: boolean;
};

const initialState = {
  isSignup: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    isNowSignup: (state: TAuthState, action) => {
      state.isSignup = action.payload.isSignup;
    },
  },
});

export const { isNowSignup } = authSlice.actions;
export const selectAuth = (state: { auth: TAuthState }) => state.auth;

const authReducer = authSlice.reducer;

export default authReducer;
