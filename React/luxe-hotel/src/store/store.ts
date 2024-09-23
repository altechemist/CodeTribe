import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import dbReducer from './slices/dbSlice';
import bookingReducer from './slices/bookingSlice';

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  db: dbReducer,
  booking: bookingReducer,
});

// Configure the store
export const store = configureStore({
  reducer: rootReducer, // Use rootReducer directly
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
