import { createSlice } from '@reduxjs/toolkit';

type TAuthState = {
  isAuthenticated: boolean;
  isSignup: boolean;
};

const initialState = {
  isAuthenticated: false,
  isSignup: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: TAuthState) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.isSignup = false;
    },
    isSignup: (state: TAuthState, action) => {
      state.isSignup = action.payload.isSignup;
    },
  },
});

export const { login, logout, isSignup } = authSlice.actions;
export const selectAuth = (state: { auth: TAuthState }) => state.auth;

const authReducer = authSlice.reducer;

export default authReducer;
