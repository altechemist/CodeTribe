import { createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, FacebookAuthProvider, TwitterAuthProvider, GoogleAuthProvider, signOut, } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, addDoc, collection, arrayRemove, } from "firebase/firestore";
import Swal from "sweetalert2";
const initialState = {
    user: null,
    loading: false,
    error: null,
};
// Load user from local storage
const loadUserFromLocalStorage = () => {
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
        setUser(state, action) {
            state.user = action.payload;
            state.loading = false;
            if (action.payload) {
                localStorage.setItem("user", JSON.stringify(action.payload));
            }
            else {
                localStorage.removeItem("user");
            }
        },
        setError(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
    },
});
// Create user profile in Firestore
const createUserProfile = async (user) => {
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
    }
    catch (error) {
        console.error("Error creating user profile:", error);
    }
};
// Register action
export const register = (email, password, fullname, phoneNumber) => async (dispatch) => {
    dispatch(setLoading());
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const customUser = {
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
    }
    catch (error) {
        handleAuthError(error, dispatch);
    }
};
// Login action
export const login = (email, password) => async (dispatch) => {
    dispatch(setLoading());
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userDoc = await getDoc(doc(db, "Users", user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            await dispatch(setUser({ ...userData, uid: user.uid }));
        }
        else {
            dispatch(setError("User data not found."));
        }
    }
    catch (error) {
        handleAuthError(error, dispatch);
    }
};
// Updates user profile
export const updateUserProfile = (uid, updates) => async (dispatch, getState) => {
    console.log("updating...", uid);
    dispatch(setLoading());
    try {
        // Fetch the current user from the Redux store
        const currentUser = getState().auth.user;
        if (!currentUser) {
            dispatch(setError("User is not logged in."));
            console.error("User is not logged in.");
            return;
        }
        // Merge the updates with current user data
        const updatedUserData = { ...currentUser, ...updates };
        // Update only the fields provided in the `updates` object
        const userRef = doc(db, "Users", uid);
        await updateDoc(userRef, updates);
        // Dispatch the updated user data to Redux
        dispatch(setUser(updatedUserData));
        console.log("User profile updated successfully");
    }
    catch (error) {
        console.error("Error updating user profile:", error);
        dispatch(setError("Error updating user profile."));
    }
};
// Like a room
export const addToFavorites = (userId, roomId) => async (dispatch) => {
    if (!userId || !roomId)
        return;
    try {
        const userRef = doc(db, "Users", userId);
        await updateDoc(userRef, { favorites: arrayUnion(roomId) });
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            const updatedUserData = userDoc.data();
            dispatch(setUser(updatedUserData));
        }
    }
    catch (error) {
        handleAuthError(error, dispatch);
    }
};
// Remove liked room
export const removeFavorite = (userId, roomId) => async (dispatch) => {
    if (!userId || !roomId)
        return;
    try {
        const userRef = doc(db, "Users", userId);
        await updateDoc(userRef, { favorites: arrayRemove(roomId) });
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            const updatedUserData = userDoc.data();
            dispatch(setUser(updatedUserData));
        }
    }
    catch (error) {
        handleAuthError(error, dispatch);
    }
};
// Add review action
export const addReview = (userId, reviewData) => async (dispatch) => {
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
            const updatedUserData = userDoc.data();
            dispatch(setUser(updatedUserData));
        }
    }
    catch (error) {
        handleAuthError(error, dispatch);
    }
};
// Logout action
export const logout = () => async (dispatch) => {
    dispatch(setLoading());
    try {
        await signOut(auth);
        dispatch(setUser(null));
    }
    catch (error) {
        handleAuthError(error, dispatch);
    }
};
// Social login actions
export const facebookLogin = () => async (dispatch) => {
    dispatch(setLoading());
    const provider = new FacebookAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const customUser = {
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
    }
    catch (error) {
        handleAuthError(error, dispatch);
    }
};
// Google login
export const googleLogin = () => async (dispatch) => {
    dispatch(setLoading());
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const customUser = {
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
    }
    catch (error) {
        handleAuthError(error, dispatch);
    }
};
// Send Message
export const sendMessage = async (firstName, lastName, email, message) => {
    try {
        const messageData = {
            firstName,
            lastName,
            email,
            message,
            timestamp: new Date(),
        };
        await addDoc(collection(db, "Messages"), messageData);
        Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "Thank you for reaching out. We'll get back to you soon.",
        });
    }
    catch (error) {
        console.error("Error sending message:", error);
    }
};
// Twitter login
export const twitterLogin = () => async (dispatch) => {
    dispatch(setLoading());
    const provider = new TwitterAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const user = result.user;
        // Ensure we handle the case where credential might be null
        if (!credential) {
            throw new Error("Credential is null. Login might not have completed successfully.");
        }
        const customUser = {
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
            const userData = userDoc.data();
            dispatch(setUser({ ...userData, uid: user.uid }));
        }
        else {
            await setDoc(doc(db, "Users", user.uid), customUser);
            dispatch(setUser(customUser));
        }
    }
    catch (error) {
        const errorMessage = error.message;
        console.error("Twitter login error:", errorMessage);
        dispatch(setError(errorMessage));
    }
};
// User-Friendly Error Handler
const handleAuthError = (error, dispatch) => {
    const errorMessage = getUserFriendlyError(error.message);
    dispatch(setError(errorMessage));
};
// Map Firebase error codes to user-friendly messages
const getUserFriendlyError = (error) => {
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
export const resetPassword = (email) => async (dispatch) => {
    dispatch(setLoading());
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset email sent!");
    }
    catch (error) {
        dispatch(setError(error.message));
    }
};
export const { setLoading, setUser, setError } = authSlice.actions;
export default authSlice.reducer;
