import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loginError: '',
    registerError: '',
  },
  reducers: {
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
    registerUser(state, action) {
      const { name, email, password, password2 } = action.payload;
      if (!email || !password || !password2 || !name){
        state.registerError = 'All fields are required.';
        return;
      }
      if (password !== password2) {
        state.registerError = 'Passwords do not match.';
        return;
      }
      let users = [...state.users];
      if (users.find(user => user.email === email)) {
        state.registerError = 'Email already registered.';
        return;
      }
      const lists = [];
      users.push({ name, email, password, lists });
      state.users = users;
      localStorage.setItem('users', JSON.stringify(users));
      state.registerError = '';
    },
    loginUser(state, action) {
      const { email, password } = action.payload;
      if (!email && !password) {
        state.loginError = 'All fields are required.';
        return;
      }
      const user = state.users.find(user => user.email === email && user.password === password);
      if (user) {
        state.loginError = '';
      } else {
        state.loginError = 'Invalid email or password.';
      }
    },
    clearLoginError(state) {
      state.loginError = '';
    },
    clearRegisterError(state) {
      state.registerError = '';
    },
  },
});

export const {
  getUsers,
  registerUser,
  loginUser,
  clearLoginError,
  clearRegisterError,
} = usersSlice.actions;

export default usersSlice.reducer;
