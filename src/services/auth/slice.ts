import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { registerUser, loginUser } from './actions';
import { logoutUser } from './actions';

export interface TUserState {
  // флаг для статуса проверки токена пользователя
  isAuthChecked: boolean;
  // данные текущего пользователя
  user: TUser | null;
  // ошибка авторизации если есть
  error: string | null;
}

const initialState: TUserState = {
  isAuthChecked: false,
  user: null,
  error: null
};

export const users = createSlice({
  name: 'users',
  initialState,
  selectors: {
    getUser: (state) => state.user,
    getAuthChecked: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      // Регистрация
      .addCase(registerUser.rejected, (state, action) => {
        state.user = null;
        state.error = action.error.message ?? null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      // Логин
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.error = action.error.message ?? null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      // Логаут
      .addCase(logoutUser.fulfilled, (state, action) => {
        console.log(state);
        state.user = null;
      });
  },
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    }
  }
});

export const usersReducer = users.reducer;
export const { setAuthChecked, setUser } = users.actions;
export const { getUser, getAuthChecked } = users.selectors;
