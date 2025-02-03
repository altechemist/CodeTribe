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
