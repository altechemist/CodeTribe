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
} from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { AppDispatch } from "../store";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, addDoc, collection, arrayRemove } from "firebase/firestore";

// Define custom user type
type inputValue = string | null;
interface User {
  uid: string;
  userName: inputValue;
  displayName: string;
  phoneNumber: string;
  email: inputValue;
  photoURL: string;
  role: string;
  favorites: string[];
  reservations: string[];
  reviews: string[];
}

interface Room {
  id: string;
  bed: string;
  size: number;
  amenities: string;
  beds: number;
  description: string;
  guests: number;
  image: string;
  images: string[];
  price: number;
  sofa: string;
  type: string;
}

interface Review {
  rating: number;
  comment: string;
}

export interface AuthState {
  user: null | User;
  loading: boolean;
  error: null | string;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// Function to retrieve user from local storage
const loadUserFromLocalStorage = (): User | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    ...initialState,
    user: loadUserFromLocalStorage(), // Check local storage on app load
  },
  reducers: {
    setLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.loading = false;
      // Save user to localStorage
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

// Function to create a user profile in Firestore
const createUserProfile = async (user: User) => {
  try {
    await setDoc(doc(db, "Users", user.uid), {
      uid: user.uid,
      userName: user.email,
      displayName: user.displayName || "",
      phoneNumber: user.phoneNumber || "No number",
      email: user.email,
      photoURL: user.photoURL || "",
      role: "client", // Default role
      favorites: [],
      reservations: [],
      reviews: [],
    });
    console.log("User profile created successfully:", user.uid);
  } catch (error) {
    console.error("Error creating user profile:", error);
  }
};

// Register action
export const register = (email: string, password: string, fullname: string, phoneNumber: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading());
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await createUserProfile({
      uid: user.uid,
      userName: email,
      displayName: fullname,
      phoneNumber,
      email: user.email,
      photoURL: user.photoURL || "",
      role: "client",
      favorites: [],
      reservations: [],
      reviews: [],
    });

    alert("User registered successfully!");
    dispatch(setUser({ ...user, role: "client" }));
  } catch (error) {
    handleAuthError(error, dispatch);
  }
};

// Login action
export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading());
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "Users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const role = userData?.role;

      alert(`User signed in successfully! Role: ${role}`);
      dispatch(setUser({ ...user, role }));
    } else {
      alert("User data not found. Please contact support.");
      dispatch(setError("User data not found."));
    }
  } catch (error) {
    handleAuthError(error, dispatch);
  }
};

// Like a room
export const addToFavorites = (userId: string, roomId: Room) => async (dispatch: AppDispatch) => {
  if (!userId || !roomId) {
    console.error("User ID or room ID is undefined.");
    return;
  }
  try {
    // Reference to the user's document
    const userRef = doc(db, "Users", userId); 
    await updateDoc(userRef, {
      favorites: arrayUnion(roomId), 
    });

    // Fetch the updated user data
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const updatedUserData = userDoc.data();
      dispatch(setUser({ ...updatedUserData, uid: userId }));
    }
  } catch (error) {
    console.error("Error adding to favorites:", error);
    handleAuthError(error, dispatch);
  }
};

// Remove liked room
export const removeFavorite = (userId: string, roomId: string) => async (dispatch: AppDispatch) => {
  if (!userId || !roomId) {
    console.error("User ID or room ID is undefined.");
    return;
  }
  try {
    // Reference to the user's document
    const userRef = doc(db, "Users", userId); 

    // Remove the room ID from favorites
    await updateDoc(userRef, {
      favorites: arrayRemove(roomId), 
    });

    // Fetch the updated user data
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const updatedUserData = userDoc.data();
      dispatch(setUser({ ...updatedUserData, uid: userId })); // Update Redux state
    }
  } catch (error) {
    console.error("Error removing from favorites:", error);
    handleAuthError(error, dispatch);
  }
};

// Add review action
export const addReview = (userId: string, reviewData: Review) => async (dispatch: AppDispatch) => {
  try {
    // Add the review to the Reviews collection
    const reviewRef = await addDoc(collection(db, "Reviews"), {
      ...reviewData,
      userId,
      createdAt: new Date(), // add timestamp
    });

    console.log("Review added with ID:", reviewRef.id);

    // Update the user's reviews in their profile
    const userRef = doc(db, "Users", userId);
    
    await updateDoc(userRef, {
      reviews: arrayUnion(reviewRef.id),
    });

    // Fetch the updated user data
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const updatedUserData = userDoc.data();
      dispatch(setUser({ ...updatedUserData, uid: userId }));
    }
  } catch (error) {
    console.error("Error adding review:", error);
    handleAuthError(error, dispatch);
  }
};


// Logout action
export const logout = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading());
  try {
    await signOut(auth);
    dispatch(setUser(null)); // Clear user data from Redux state
    alert("User logged out successfully!");
  } catch (error) {
    handleAuthError(error, dispatch);
  }
};

// Social login actions
export const facebookLogin = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading());

  const provider = new FacebookAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await createUserProfile({
      uid: user.uid,
      userName: user.email,
      displayName: user.displayName || "",
      phoneNumber: "",
      email: user.email,
      photoURL: user.photoURL || "",
      role: "client",
      favorites: [],
      reservations: [],
      reviews: [],
    });

    const userDoc = await getDoc(doc(db, "Users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const role = userData?.role;

      alert(`User signed in successfully! Role: ${role}`);
      dispatch(setUser({ ...user, role }));
    } else {
      alert("User data not found. Please contact support.");
      dispatch(setError("User data not found."));
    }
  } catch (error) {
    handleAuthError(error, dispatch);
  }
};

export const googleLogin = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading());

  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await createUserProfile({
      uid: user.uid,
      userName: user.email,
      displayName: user.displayName || "",
      phoneNumber: "",
      email: user.email,
      photoURL: user.photoURL || "",
      role: "client",
      favorites: [],
      reservations: [],
      reviews: [],
    });

    const userDoc = await getDoc(doc(db, "Users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const role = userData?.role;

      alert(`User signed in successfully! Role: ${role}`);
      dispatch(setUser({ ...user, role }));
    } else {
      alert("User data not found. Please contact support.");
      dispatch(setError("User data not found."));
    }
  } catch (error) {
    handleAuthError(error, dispatch);
  }
};

export const twitterLogin = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading());

  const provider = new TwitterAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userDoc = await getDoc(doc(db, "Users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const role = userData?.role;

      alert(`User signed in successfully! Role: ${role}`);
      dispatch(setUser({ ...user, role }));
    } else {
      alert("User data not found. Please contact support.");
      dispatch(setError("User data not found."));
    }
  } catch (error) {
    handleAuthError(error, dispatch);
  }
};

// User-Friendly Error Handler
const handleAuthError = (error: any, dispatch: AppDispatch) => {
  const errorMessage = getUserFriendlyError(error.message);
  dispatch(setError(errorMessage));
};

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
    default:
      return "An unexpected error occurred. Please try again later.";
  }
};

// Reset password
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
