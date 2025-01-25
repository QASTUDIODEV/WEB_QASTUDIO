import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type TAuthState = {
  isAuthenticated: boolean;
  email: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  nickname: string | null;
  profileImage: string | null;
  isSignup?: boolean;
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
  accessToken: null,
  refreshToken: null,
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
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.profileImage = action.payload.profileImage;
      state.nickname = action.payload.nickname;
    },
    logout: (state: TAuthState) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      (state.isAuthenticated = false),
        (state.email = null),
        (state.accessToken = null),
        (state.refreshToken = null),
        (state.nickname = null),
        (state.profileImage = null);
      sessionStorage.removeItem('loginHandled');
    },
    refreshToken: (state: TAuthState, action) => {
      localStorage.setItem('accessToken', action.payload.accessToken);
      state.accessToken = action.payload.accessToken;
    },
    changeUserInfo: (state: TAuthState, action) => {
      state.profileImage = action.payload.profileImage;
      state.nickname = action.payload.nickname;
    },
    reset: () => {
      initialState;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    initailUserSetting: (state: TAuthState, action) => {
      state.profileImage = action.payload.profileImage;
      state.nickname = action.payload.nickname;
      sessionStorage.removeItem('loginHandled');
    },
    isSignup: (state: TAuthState, action) => {
      console.log(action.payload.isSignup);
      state.isSignup = action.payload.isSignup;
    },
  },
});

export const { login, logout, isSignup, refreshToken, changeUserInfo, reset, initailUserSetting } = authSlice.actions;
export const selectAuth = (state: { auth: TAuthState }) => state.auth;

const authReducer = authSlice.reducer;

export default authReducer;
