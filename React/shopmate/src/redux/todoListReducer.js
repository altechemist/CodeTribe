import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: {
    // Format: userEmail: { listName: [todoItems] }
  },
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
      const { todo, email, listName } = action.payload;
      state.todos[email] = state.todos[email] || {};
      state.todos[email][listName] = state.todos[email][listName] || [];
      state.todos[email][listName].push(todo);
      updateLocalStorage(email, state.todos[email]);
    },

    deleteTodoItem: (state, action) => {
      const { todoId, email, listName } = action.payload;
      if (state.todos[email] && state.todos[email][listName]) {
        state.todos[email][listName] = state.todos[email][listName].filter(item => item.id !== todoId);
        updateLocalStorage(email, state.todos[email]);
      }
    },

    checkout: (state, action) => {
      const { todoId, email, listName } = action.payload;
      const todo = state.todos[email]?.[listName]?.find(item => item.id === todoId);
      if (todo) {
        todo.completed = !todo.completed;
        updateLocalStorage(email, state.todos[email]);
      }
    },

    updateTodoItem: (state, action) => {
      const { todo, email, listName } = action.payload;
      const todoIndex = state.todos[email]?.[listName]?.findIndex(item => item.id === todo.id);
      if (todoIndex !== -1) {
        state.todos[email][listName][todoIndex] = { ...state.todos[email][listName][todoIndex], ...todo };
        updateLocalStorage(email, state.todos[email]);
      }
    },

    addList: (state, action) => {
      const { email, listName } = action.payload;
      state.todos[email] = state.todos[email] || {};
      state.todos[email][listName] = [];
      updateLocalStorage(email, state.todos[email]);
    },

    removeList: (state, action) => {
      const { email, listName } = action.payload;
      if (state.todos[email] && state.todos[email][listName]) {
        delete state.todos[email][listName];
        updateLocalStorage(email, state.todos[email]);
      }
    },
  },
});

const updateLocalStorage = (email, todos) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userIndex = users.findIndex(user => user.email === email);

  if (userIndex !== -1) {
    users[userIndex].lists = todos;
    localStorage.setItem("users", JSON.stringify(users));
  }
};

export const {
  addTodoItem,
  deleteTodoItem,
  checkout,
  updateTodoItem,
  setTodos,
  addList,
  removeList,
} = todoSlice.actions;

export default todoSlice.reducer;
