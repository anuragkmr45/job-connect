// store/index.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistReducer, persistStore,
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './authSlice';
import { authApi } from '@/services/authService';
import { dropdownApi } from '@/services/dropdownService';
import { profileApi } from '@/services/profileService';
import { healthApi } from '@/services/healthService';


const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [dropdownApi.reducerPath]: dropdownApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [healthApi.reducerPath]: healthApi.reducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(
      authApi.middleware,
      dropdownApi.middleware,
      profileApi.middleware,
      healthApi.middleware
    )
});

export const persistor = persistStore(store);
export type RootState  = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
