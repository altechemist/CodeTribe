import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const todoSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    addTodoItem: (state, action) => {
      state.push({ ...action.payload, completed: false });
    },
    deleteTodoItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    checkout: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      if (item) {
        item.completed = !item.completed;
      }
    },
    updateTodoItem: (state, action) => {
      const tmpItem = action.payload;
      const item = state.find((item) => item.id === tmpItem.id);
      if (item) {
        console.log(item);
        item.name = tmpItem.name;
        item.quantity = tmpItem.quantity;
        item.category = tmpItem.category;
        item.description = tmpItem.description;
      }
    },
    searchItem: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      const filteredItems = state.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      );
      return filteredItems;
    },
  },
});

export const {
  addTodoItem,
  deleteTodoItem,
  checkout,
  updateTodoItem,
  searchItem,
} = todoSlice.actions;
export default todoSlice.reducer;
