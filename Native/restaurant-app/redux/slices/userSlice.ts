import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Helper function to determine storage method
const isWeb = Platform.OS === 'web';
const storage = {
  setItem: async (key: string, value: string) => {
    console.log(`Saving ${key} in ${isWeb ? 'localStorage' : 'AsyncStorage'}`);
    if (isWeb) {
      localStorage.setItem(key, value);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  },
  getItem: async (key: string) => {
    console.log(`Retrieving ${key} from ${isWeb ? 'localStorage' : 'AsyncStorage'}`);
    return isWeb ? Promise.resolve(localStorage.getItem(key)) : AsyncStorage.getItem(key);
  },
  removeItem: async (key: string) => {
    console.log(`Removing ${key} from ${isWeb ? 'localStorage' : 'AsyncStorage'}`);
    if (isWeb) {
      localStorage.removeItem(key);
    } else {
      await AsyncStorage.removeItem(key);
    }
  },
};

// Types for user data
export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

interface UserState {
  users: User[];
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// Initial state
const initialState: UserState = {
  users: [],
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// Define API base URL
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const API_BASE_URL = `${apiUrl}/users`;

// Register user
export const registerUser = createAsyncThunk<User, { name: string; email: string; password: string }>(
  'users/registerUser',
  async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    await storage.setItem('token', response.data.token); // Save token
    return { ...response.data, token: response.data.token };
  }
);

// Login user
export const loginUser = createAsyncThunk<User, { email: string; password: string }>(
  'users/loginUser',
  async (loginData) => {
    const response = await axios.post(`${API_BASE_URL}/login`, loginData);
    await storage.setItem('token', response.data.token); // Save token
    return { ...response.data, token: response.data.token };
  }
);

// Fetch all users
export const fetchUsers = createAsyncThunk<User[]>('users/fetchUsers', async () => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data;
});

// Get a specific user
export const fetchUserById = createAsyncThunk<User, string>('users/fetchUserById', async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
});

// Update user profile
export const updateUser = createAsyncThunk<User, { id: string; name: string; email: string }>(
  'users/updateUser',
  async ({ id, name, email }) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, { name, email });
    return response.data.updatedUser;
  }
);

// Update user password
export const updatePassword = createAsyncThunk<void, { id: string; oldPassword: string; newPassword: string }>(
  'users/updatePassword',
  async ({ id, oldPassword, newPassword }) => {
    await axios.put(`${API_BASE_URL}/${id}/password`, { oldPassword, newPassword });
  }
);

// Delete a user
export const deleteUser = createAsyncThunk<string, string>('users/deleteUser', async (id) => {
  await axios.delete(`${API_BASE_URL}/${id}`);
  return id;
});

// User slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      storage.removeItem('token'); // Clear token when logging out
    },
  },
  extraReducers: (builder) => {
    builder
      // Register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to register user';
      })

      // Login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload.user; // Save user data in state
        state.isAuthenticated = true;
        storage.setItem('token', action.payload.token); // Save token in storage
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to login user';
      })

      // Fetch all users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })

      // Fetch user by ID
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user';
      })

      // Update user
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      })

      // Delete user
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
  },
});


// Export actions
export const { setUser, logoutUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
