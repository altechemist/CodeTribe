import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the types for the user state and user actions
interface ShoppingListItem {
  id: string;
  name: string;
  quantity: number;
  completed: boolean;
}

interface User {
  name: string;
  email: string;
  password: string;
  lists: {
    [listName: string]: ShoppingListItem[];
  };
}

interface UsersState {
  users: User[];
  currentUser: User | null;
  loginError: string;
  registerError: string;
}

interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
  password2: string;
}

interface LoginUserPayload {
  email: string;
  password: string;
}

const initialState: UsersState = {
  users: [],
  currentUser: null,
  loginError: '',
  registerError: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Load users from localStorage
    getUsers(state) {
      try {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
          state.users = JSON.parse(storedUsers);
        }
      } catch (e) {
        console.error('Failed to parse users from localStorage', e);
        state.loginError = 'An error occurred while accessing the user data.';
      }
    },

    // Register a new user
    registerUser(state, action: PayloadAction<RegisterUserPayload>) {
      const { name, email, password, password2 } = action.payload;
      if (!email || !password || !password2 || !name) {
        state.registerError = 'All fields are required.';
        return;
      }
      if (password !== password2) {
        state.registerError = 'Passwords do not match.';
        return;
      }
      if (state.users.find(user => user.email === email)) {
        state.registerError = 'Email already registered.';
        return;
      }

      const newUser: User = { name, email, password, lists: {} };
      state.users.push(newUser);

      // Update localStorage after modifying state
      localStorage.setItem('users', JSON.stringify(state.users));

      state.registerError = '';
    },

    // Login a user
    loginUser(state, action: PayloadAction<LoginUserPayload>) {
      const { email, password } = action.payload;
      if (!email || !password) {
        state.loginError = 'All fields are required.';
        return;
      }

      const user = state.users.find(user => user.email === email && user.password === password);
      if (user) {
        state.currentUser = user;
        state.loginError = '';
      } else {
        state.loginError = 'Invalid email or password.';
      }
    },

    // Logout the current user
    logoutUser(state) {
      state.currentUser = null;
    },

    // Clear the login error
    clearLoginError(state) {
      state.loginError = '';
    },

    // Clear the register error
    clearRegisterError(state) {
      state.registerError = '';
    },

    // Add a shopping list for the current user
    addListForUser(state, action: PayloadAction<{ listName: string }>) {
      if (state.currentUser) {
        state.currentUser.lists[action.payload.listName] = [];
        // Update localStorage after modifying state
        updateLocalStorage(state.users);
      }
    },

    // Remove a shopping list for the current user
    removeListForUser(state, action: PayloadAction<{ listName: string }>) {
      if (state.currentUser) {
        delete state.currentUser.lists[action.payload.listName];
        // Update localStorage after modifying state
        updateLocalStorage(state.users);
      }
    },

    // Add an item to a shopping list for the current user
    addItemToList(state, action: PayloadAction<{ listName: string; item: ShoppingListItem }>) {
      if (state.currentUser) {
        const { listName, item } = action.payload;
        state.currentUser.lists[listName] = state.currentUser.lists[listName] || [];
        state.currentUser.lists[listName].push(item);
        // Update localStorage after modifying state
        updateLocalStorage(state.users);
      }
    },

    // Remove an item from a shopping list for the current user
    removeItemFromList(state, action: PayloadAction<{ listName: string; itemId: string }>) {
      if (state.currentUser) {
        const { listName, itemId } = action.payload;
        const list = state.currentUser.lists[listName];
        if (list) {
          state.currentUser.lists[listName] = list.filter(item => item.id !== itemId);
          // Update localStorage after modifying state
          updateLocalStorage(state.users);
        }
      }
    },

    // Toggle the completion status of a shopping list item
    toggleItemCompletion(state, action: PayloadAction<{ listName: string; itemId: string }>) {
      if (state.currentUser) {
        const { listName, itemId } = action.payload;
        const list = state.currentUser.lists[listName];
        if (list) {
          const item = list.find(i => i.id === itemId);
          if (item) {
            item.completed = !item.completed;
            // Update localStorage after modifying state
            updateLocalStorage(state.users);
          }
        }
      }
    },
  },
});

// Helper function to update localStorage
const updateLocalStorage = (users: User[]) => {
  localStorage.setItem('users', JSON.stringify(users));
};

// Export actions and reducer
export const {
  getUsers,
  registerUser,
  loginUser,
  logoutUser,
  clearLoginError,
  clearRegisterError,
  addListForUser,
  removeListForUser,
  addItemToList,
  removeItemFromList,
  toggleItemCompletion,
} = usersSlice.actions;

export default usersSlice.reducer;
