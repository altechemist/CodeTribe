import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { AppDispatch } from '../store';

export interface AuthState {
  user: null | object;
  loading: boolean;
  error: null | string;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setUser(state, action: PayloadAction<object | null>) {
      state.user = action.payload;
      state.loading = false;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Async actions
export const register = (email: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading());
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    alert("User registered successfully!");
    console.log("User registered successfully!", user);
    dispatch(setUser(user));
  } catch (error) {
    const errorMessage = error.message;
    dispatch(setError(errorMessage));
  }
};

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading());
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    alert("User signed in successfully!");
    console.log("User signed in successfully!", user);
    dispatch(setUser(user));
  } catch (error) {
    const errorMessage = error.message;
    dispatch(setError(errorMessage));
  }
};

export const resetPassword = (email: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading());
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent!");
  } catch (error) {
    const errorMessage = error.message;
    dispatch(setError(errorMessage));
  }
};

export const { setLoading, setUser, setError } = authSlice.actions;

export default authSlice.reducer;
