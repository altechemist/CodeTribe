import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import taskReducer from './taskSlice';


// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  tasks: taskReducer,

});

// Configure the store
export const store = configureStore({
  reducer: rootReducer, // Use rootReducer directly
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
