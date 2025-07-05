// store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token?: string;
  preSignupToken?: string;
}

const initialState: AuthState = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPreSignupToken(state, action: PayloadAction<string>) {
      state.preSignupToken = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.preSignupToken = undefined;
    },
    clearAuth(state) {
      state.token = undefined;
      state.preSignupToken = undefined;
    }
  }
});

export const { setPreSignupToken, setToken, clearAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
