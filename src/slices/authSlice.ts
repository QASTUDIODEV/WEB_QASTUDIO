import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type TAuthState = {
  isAuthenticated: boolean;
  email: string | null;
  nickname: string | null;
  profileImage: string | null;
  isSignup?: boolean;
  accessToken?: string;
};

type TLoginPayload = {
  email: string;
  accessToken: string;
  refreshToken: string;
  nickname: string | null;
  profileImage: string | null;
};

const initialState = {
  isAuthenticated: false,
  email: null,
  profileImage: null,
  nickname: null,
  isSignup: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: TAuthState, action: PayloadAction<TLoginPayload>) => {
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.email = action.payload.email;
      state.profileImage = action.payload.profileImage;
      state.nickname = action.payload.nickname;
    },
    logout: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      sessionStorage.removeItem('loginHandled');
      return initialState;
    },
    refreshToken: (_, action) => {
      localStorage.setItem('accessToken', action.payload.accessToken);
    },
    changeUserInfo: (state: TAuthState, action) => {
      state.profileImage = action.payload.profileImage;
      state.nickname = action.payload.nickname;
    },
    initailUserSetting: (state: TAuthState, action) => {
      state.profileImage = action.payload.profileImage;
      state.nickname = action.payload.nickname;
      sessionStorage.removeItem('loginHandled');
    },
    isSignup: (state: TAuthState, action) => {
      state.isSignup = action.payload.isSignup;
    },
  },
});

export const { login, logout, isSignup, refreshToken, changeUserInfo, initailUserSetting } = authSlice.actions;
export const selectAuth = (state: { auth: TAuthState }) => state.auth;

const authReducer = authSlice.reducer;

export default authReducer;
