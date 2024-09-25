import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth, db } from '../../config/firebaseConfig';
import { AppDispatch } from '../store';
import { doc, getDoc, setDoc } from 'firebase/firestore';


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


// Async actions for user registration
export const register = (email: string, password: string, fullname: string, phoneNumber: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading());
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Use setDoc to create a document with the user's UID as the ID
    await setDoc(doc(db, "Users", user.uid), {
      uid: user.uid,
      userName: email,
      displayName: fullname,
      phone: phoneNumber,
      email: user.email,
      role: 'client', // Default role
    });

    alert("User registered successfully!");
    console.log("User registered successfully!", user);
    dispatch(setUser(user));
  } catch (error) {
    handleAuthError(error, dispatch);
  }
};


// Async actions for user login
export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading());
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Fetch user role from Firestore
    const userDoc = await getDoc(doc(db, "Users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const role = userData?.role;

      alert(`User signed in successfully! Role: ${role}`);
      console.log("User signed in successfully!", { ...user, role });

      // Dispatch the user along with their role
      dispatch(setUser({ ...user, role }));
      
    } else {
      alert("User data not found. Please contact support.");
      console.error("No user data found in Firestore for UID:", user.uid);
      dispatch(setError("User data not found."));
    }
  } catch (error) {
    handleAuthError(error, dispatch);
  }
};

// User Friendly Error Handler
const handleAuthError = (error: any, dispatch: AppDispatch) => {
  const errorMessage = getUserFriendlyError(error.message);
  dispatch(setError(errorMessage));
};

const getUserFriendlyError = (error: string) => {
  switch (error) {
    case 'auth/email-already-in-use':
      return 'This email is already in use. Please try another.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/user-not-found':
      return 'No user found with this email.';
    default:
      return 'An unexpected error occurred. Please try again later.';
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
