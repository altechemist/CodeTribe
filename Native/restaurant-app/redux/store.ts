import { configureStore } from '@reduxjs/toolkit';
import reservationReducer from './slices/reservationSlice';
import restaurantReducer from './slices/restaurantSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    reservations: reservationReducer,
    restaurants: restaurantReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
