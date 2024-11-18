import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GoogleAuthProvider,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { AppDispatch } from "../store";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  addDoc,
  collection,
  arrayRemove,
} from "firebase/firestore";

// Define your custom user interface
interface CustomUser {
  uid: string;
  userName: string | null;
  displayName: string | null;
  phoneNumber: string | null;
  email: string | null;
  photoURL: string | null;
  role: string;
  favorites: string[];
  reservations: string[];
  reviews: string[];
}

interface Review {
  rating: number;
  comment: string;
  userName: string;
  userId: string;
  userPhoto: string;
}

export interface AuthState {
  user: CustomUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// Load user from local storage
const loadUserFromLocalStorage = (): CustomUser | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    ...initialState,
    user: loadUserFromLocalStorage(),
  },
  reducers: {
    setLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setUser(state, action: PayloadAction<CustomUser | null>) {
      state.user = action.payload;
      state.loading = false;
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Create user profile in Firestore
const createUserProfile = async (user: CustomUser) => {
  try {
    await setDoc(doc(db, "Users", user.uid), {
      uid: user.uid,
      userName: user.userName,
      displayName: user.displayName || "",
      phoneNumber: user.phoneNumber || null,
      email: user.email,
      photoURL: user.photoURL || null,
      role: "client",
      favorites: [],
      reservations: [],
      reviews: [],
    });
  } catch (error) {
    console.error("Error creating user profile:", error);
  }
};

// Register action
export const register =
  (
    email: string,
    password: string,
    fullname: string,
    phoneNumber: string | null
  ) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading());
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const customUser: CustomUser = {
        uid: user.uid,
        userName: email,
        displayName: fullname,
        phoneNumber: phoneNumber,
        email: user.email,
        photoURL: user.photoURL || null,
        role: "client",
        favorites: [],
        reservations: [],
        reviews: [],
      };

      await createUserProfile(customUser);
      dispatch(setUser(customUser));
    } catch (error) {
      handleAuthError(error as Error, dispatch);
    }
  };

// Login action
export const login =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading());
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "Users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data() as CustomUser;
        await dispatch(setUser({ ...userData, uid: user.uid }));
      } else {
        dispatch(setError("User data not found."));
      }
    } catch (error) {
      handleAuthError(error as Error, dispatch);
    }
  };

// Like a room
export const addToFavorites =
  (userId: string, roomId: string) => async (dispatch: AppDispatch) => {
    if (!userId || !roomId) return;
    try {
      const userRef = doc(db, "Users", userId);
      await updateDoc(userRef, { favorites: arrayUnion(roomId) });

      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const updatedUserData = userDoc.data() as CustomUser;
        dispatch(setUser(updatedUserData));
      }
    } catch (error) {
      handleAuthError(error as Error, dispatch);
    }
  };

// Remove liked room
export const removeFavorite =
  (userId: string, roomId: string) => async (dispatch: AppDispatch) => {
    if (!userId || !roomId) return;
    try {
      const userRef = doc(db, "Users", userId);
      await updateDoc(userRef, { favorites: arrayRemove(roomId) });

      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const updatedUserData = userDoc.data() as CustomUser;
        dispatch(setUser(updatedUserData));
      }
    } catch (error) {
      handleAuthError(error as Error, dispatch);
    }
  };

// Add review action
export const addReview =
  (
    userId: string,
    reviewData: Review & { userName: string; userPhoto: string }
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      // Add review to Firestore
      const reviewRef = await addDoc(collection(db, "Reviews"), {
        ...reviewData,
        userId,
        createdAt: new Date().toLocaleDateString("en-GB"),
      });

      // Update the user document with the new review ID
      const userRef = doc(db, "Users", userId);
      await updateDoc(userRef, { reviews: arrayUnion(reviewRef.id) });

      // Get the updated user data and dispatch it
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const updatedUserData = userDoc.data() as CustomUser;
        dispatch(setUser(updatedUserData));
      }
    } catch (error) {
      handleAuthError(error as Error, dispatch);
    }
  };

// Logout action
export const logout = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading());
  try {
    await signOut(auth);
    dispatch(setUser(null));
  } catch (error) {
    handleAuthError(error as Error, dispatch);
  }
};

// Social login actions
export const facebookLogin = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading());
  const provider = new FacebookAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const customUser: CustomUser = {
      uid: user.uid,
      userName: user.email,
      displayName: user.displayName || "",
      phoneNumber: null,
      email: user.email,
      photoURL: user.photoURL || null,
      role: "client",
      favorites: [],
      reservations: [],
      reviews: [],
    };

    await createUserProfile(customUser);
    dispatch(setUser(customUser));
  } catch (error) {
    handleAuthError(error as Error, dispatch);
  }
};

// Google login
export const googleLogin = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading());
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const customUser: CustomUser = {
      uid: user.uid,
      userName: user.email,
      displayName: user.displayName || "",
      phoneNumber: null,
      email: user.email,
      photoURL: user.photoURL || null,
      role: "client",
      favorites: [],
      reservations: [],
      reviews: [],
    };

    await createUserProfile(customUser);
    dispatch(setUser(customUser));
  } catch (error) {
    handleAuthError(error as Error, dispatch);
  }
};

// Twitter login
export const twitterLogin = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading());
  const provider = new TwitterAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);

    const credential = TwitterAuthProvider.credentialFromResult(result);
    const user = result.user as FirebaseUser;

    // Ensure we handle the case where credential might be null
    if (!credential) {
      throw new Error(
        "Credential is null. Login might not have completed successfully."
      );
    }

    const customUser: CustomUser = {
      uid: user.uid,
      userName: user.email,
      displayName: user.displayName || "",
      phoneNumber: null,
      email: user.email,
      photoURL: user.photoURL || null,
      role: "client",
      favorites: [],
      reservations: [],
      reviews: [],
    };

    await createUserProfile(customUser);

    const userDoc = await getDoc(doc(db, "Users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data() as CustomUser;
      dispatch(setUser({ ...userData, uid: user.uid }));
    } else {
      await setDoc(doc(db, "Users", user.uid), customUser);
      dispatch(setUser(customUser));
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.error("Twitter login error:", errorMessage);
    dispatch(setError(errorMessage));
  }
};

// User-Friendly Error Handler
const handleAuthError = (error: Error, dispatch: AppDispatch) => {
  const errorMessage = getUserFriendlyError(error.message);
  dispatch(setError(errorMessage));
};

// Map Firebase error codes to user-friendly messages
const getUserFriendlyError = (error: string) => {
  switch (error) {
    case "auth/email-already-in-use":
      return "This email is already in use. Please try another.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/user-not-found":
      return "No user found with this email.";
    case "auth/operation-not-allowed":
      return "This operation is not allowed. Please contact support.";
    case "auth/weak-password":
      return "The password is too weak. Please choose a stronger password.";
    default:
      return "An unexpected error occurred. Please try again later.";
  }
};

// Reset password
export const resetPassword =
  (email: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading());
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };



export const { setLoading, setUser, setError } = authSlice.actions;

export default authSlice.reducer;
