// store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token?: string;
  preSignupToken?: string;
  preResetToken?: string;
}

const initialState: AuthState = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPreSignupToken(state, action: PayloadAction<string>) {
      state.preSignupToken = action.payload;
      state.preResetToken = undefined
    },
    setPreResetToken(state, action: PayloadAction<string>) { // 🆕
      state.preResetToken = action.payload
      state.preSignupToken = undefined           // 🆕 avoid confusion
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.preSignupToken = undefined;
      state.preResetToken = undefined
    },
    clearAuth(state) {
      state.token = undefined;
      state.preSignupToken = undefined;
      state.preResetToken = undefined
    }
  }
});

export const { setPreSignupToken, setPreResetToken, setToken, clearAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
