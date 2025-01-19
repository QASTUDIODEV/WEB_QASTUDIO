import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type TAuthState = {
  isAuthenticated: boolean;
  email: string | null;
  accessToken: string | null;
  refreshToken: string | null;
};

type TLoginPayload = {
  email: string;
  accessToken: string;
  refreshToken: string;
};

const initialState = {
  isAuthenticated: false,
  email: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: TAuthState, action: PayloadAction<TLoginPayload>) => {
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state: TAuthState) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      (state.isAuthenticated = false), (state.email = null), (state.accessToken = null), (state.refreshToken = null);
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectAuth = (state: { auth: TAuthState }) => state.auth;

const authReducer = authSlice.reducer;

export default authReducer;
