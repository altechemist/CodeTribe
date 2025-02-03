import { createSlice } from '@reduxjs/toolkit';
import { getDocs, collection, deleteDoc, doc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
// Initial state
const initialState = {
    data: [],
    reviews: [],
    eventsGallery: [],
    loading: false,
    error: null,
    selectedRoom: null,
};
export const dbSlice = createSlice({
    name: 'db',
    initialState,
    reducers: {
        setLoading(state) {
            state.loading = true;
            state.error = null;
        },
        setData(state, action) {
            state.data = action.payload;
            state.loading = false;
        },
        setReviews(state, action) {
            state.reviews = action.payload;
            state.loading = false;
        },
        setEventsGallery(state, action) {
            state.eventsGallery = action.payload;
            state.loading = false;
        },
        setError(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
        setSelectedRoom(state, action) {
            state.selectedRoom = action.payload;
            state.loading = false;
        },
    },
});
// Async actions
export const fetchData = () => async (dispatch) => {
    dispatch(setLoading());
    try {
        const querySnapshot = await getDocs(collection(db, 'Rooms'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        dispatch(setData(data));
    }
    catch (error) {
        dispatch(setError(error.message || 'An error occurred while fetching data'));
    }
};
// Fetch reviews
export const fetchReviews = () => async (dispatch) => {
    dispatch(setLoading());
    try {
        const querySnapshot = await getDocs(collection(db, 'Reviews'));
        const reviews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(reviews);
        dispatch(setReviews(reviews));
    }
    catch (error) {
        console.error("Error fetching reviews:", error); // Log error for debugging
        dispatch(setError(error.message || 'An error occurred while fetching data'));
    }
};
// Fetch events images
export const getImages = () => async (dispatch) => {
    dispatch(setLoading());
    try {
        const querySnapshot = await getDocs(collection(db, 'Gallery'));
        // Extract images from the documents
        const images = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data() // Assuming the data contains an image field
        }));
        console.log("gallery");
        console.log(images); // Log the extracted images
        // Dispatch the images to the store
        dispatch(setEventsGallery(images));
    }
    catch (error) {
        console.error("Error fetching images:", error); // Log error for debugging
        dispatch(setError(error.message || 'An error occurred while fetching data'));
    }
};
// Adds a new room
export const addRoom = (room) => async (dispatch) => {
    dispatch(setLoading());
    try {
        await addDoc(collection(db, 'Rooms'), room);
        dispatch(fetchData());
    }
    catch (error) {
        dispatch(setError(error.message || 'An error occurred while adding the room'));
    }
};
// Updates room information
export const updateRoom = (id, updates) => async (dispatch) => {
    // Dispatch loading state before updating
    dispatch(setLoading());
    console.log(updates);
    try {
        // Reference to the room document in Firestore
        const roomRef = doc(db, 'Rooms', id);
        console.log(id);
        // Perform the update operation in Firestore
        await updateDoc(roomRef, updates);
        console.log(id);
        console.log(id);
        // Dispatch fetchData to refresh the room list or room data elsewhere
        dispatch(fetchData());
    }
    catch (error) {
        // Error handling: Dispatch the error message to update the UI
        dispatch(setError(error.message || 'An error occurred while updating the room'));
    }
};
// Deletes room
export const deleteRoom = (roomId) => async (dispatch) => {
    dispatch(setLoading());
    try {
        const roomRef = doc(db, 'Rooms', roomId);
        await deleteDoc(roomRef);
        dispatch(fetchData()); // Fetch updated data after deletion
    }
    catch (error) {
        dispatch(setError(error.message || 'An error occurred while deleting the room'));
    }
};
// Action creators
export const { setLoading, setData, setReviews, setError, setEventsGallery, setSelectedRoom } = dbSlice.actions;
export default dbSlice.reducer;
