import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './userSlice';
import shoppingListReducer from './shoppingListSlice';

// Configure the Redux store by combining reducers
const store = configureStore({
  reducer: {
    users: usersReducer,
    shoppingList: shoppingListReducer,
  },
});

export default store;
