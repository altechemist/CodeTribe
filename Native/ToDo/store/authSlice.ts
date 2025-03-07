import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define your custom user interface
interface User {
  id: string;
  createdAt: Date | null;  // Allow createdAt to be nullable
  name: string | null;
  avatar: string | null;
  email: string | null;
  password: string | null;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  success: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,  // Simplified, no need to spread `initialState`
  reducers: {
    setLoading(state) {
      state.loading = true;
      // Optional: Don't reset `error` here if you want to keep the error intact while loading
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.loading = false;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
    setSuccess(state, action: PayloadAction<string | null>) {
      state.success = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setUser, setError, setSuccess } = authSlice.actions;

export default authSlice.reducer;
