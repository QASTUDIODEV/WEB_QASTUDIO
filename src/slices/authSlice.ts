import { createSlice } from '@reduxjs/toolkit';

import { deleteAllCookies } from '@/utils/cookies';

type TAuthState = {
  isAuthenticated: boolean;
  email: string | null;
  nickname: string | null;
  profileImage: string | null;
  isSignup?: boolean;
  isLogin?: boolean;
};

const initialState = {
  isAuthenticated: false,
  email: null,
  profileImage: null,
  nickname: null,
  isSignup: false,
  isLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: TAuthState) => {
      state.isAuthenticated = true;
    },
    logout: (state: TAuthState) => {
      deleteAllCookies();
      localStorage.clear();
      sessionStorage.removeItem('loginHandled');
      state.isAuthenticated = false;
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
    getUserInfo: (state: TAuthState, action) => {
      state.email = action.payload.email;
      state.profileImage = action.payload.profileImage;
      state.nickname = action.payload.nickname;
    },
  },
});

export const { login, logout, isSignup, refreshToken, changeUserInfo, initailUserSetting } = authSlice.actions;
export const selectAuth = (state: { auth: TAuthState }) => state.auth;

const authReducer = authSlice.reducer;

export default authReducer;
