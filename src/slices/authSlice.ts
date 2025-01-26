import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type TAuthState = {
  isAuthenticated: boolean;
  isSignup?: boolean;
  accessToken?: string | null;
  refreshToken?: string | null;
};

type TLoginPayload = {
  accessToken: string;
  refreshToken: string;
};

const initialState = {
  isAuthenticated: false,
  isSignup: false,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: TAuthState, action: PayloadAction<TLoginPayload>) => {
      state.isAuthenticated = true;
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      state.isSignup = false;
    },
    refreshToken: (_, action) => {
      localStorage.setItem('accessToken', action.payload.accessToken);
    },
    isSignup: (state: TAuthState, action) => {
      state.isSignup = action.payload.isSignup;
    },
  },
});

export const { login, logout, isSignup, refreshToken } = authSlice.actions;
export const selectAuth = (state: { auth: TAuthState }) => state.auth;

const authReducer = authSlice.reducer;

export default authReducer;
