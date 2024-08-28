import { configureStore } from "@reduxjs/toolkit";
import todoSlice from '../redux/todoListReducer';
import usersReducer from './usersReducer';

export const store = configureStore({
    reducer: {
        todoList: todoSlice,
        users: usersReducer,
    },
});