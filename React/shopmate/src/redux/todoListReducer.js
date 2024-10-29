import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: {},
};

const todoSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      const { email, todos } = action.payload;
      state.todos[email] = todos;
    },

    addTodoItem: (state, action) => {
      const { todo, email } = action.payload;
      state.todos[email] = state.todos[email] || [];
      state.todos[email].push(todo);
      updateLocalStorage(email, state.todos[email]);
    },

    deleteTodoItem: (state, action) => {
      const { todoId, email } = action.payload;
      if (state.todos[email]) {
        state.todos[email] = state.todos[email].filter(item => item.id !== todoId);
        updateLocalStorage(email, state.todos[email]);
      }
    },

    checkout: (state, action) => {
      const { todoId, email } = action.payload;
      const todo = state.todos[email]?.find(item => item.id === todoId);
      if (todo) {
        todo.completed = !todo.completed;
        updateLocalStorage(email, state.todos[email]);
      }
    },

    updateTodoItem: (state, action) => {
      const { todo, email } = action.payload;
      const todoIndex = state.todos[email]?.findIndex(item => item.id === todo.id);
      if (todoIndex !== -1) {
        state.todos[email][todoIndex] = { ...state.todos[email][todoIndex], ...todo };
        updateLocalStorage(email, state.todos[email]);
      }
    },
  },
});

// Helper function to update local storage
const updateLocalStorage = (email, todos) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userIndex = users.findIndex(user => user.email === email);
  
  if (userIndex !== -1) {
    users[userIndex].lists = todos;
    localStorage.setItem("users", JSON.stringify(users));
  }
};

// Export actions
export const {
  addTodoItem,
  deleteTodoItem,
  checkout,
  updateTodoItem,
  setTodos,
} = todoSlice.actions;

export default todoSlice.reducer;
