import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDocs, collection, deleteDoc, doc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { AppDispatch } from '../store';

interface Room {
  id?: string;
  amenities: string;
  bed: string;
  beds: number;
  bookedRooms: number;
  description: string;
  guests: number;
  image: string;
  images: string[];
  price: number;
  size: number;
  sofa: string;
  totalRooms: number;
  type: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  userName: string;
  userId: string;
  userPhoto?: string;
}

export interface dbState {
  data: Room[];
  reviews: Review[];
  eventsGallery: string[];
  loading: boolean;
  error: string | null;
  selectedRoom: Room | null;
}

// Initial state
const initialState: dbState = {
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
    setData(state, action: PayloadAction<Room[]>) {
      state.data = action.payload;
      state.loading = false;
    },
    setReviews(state, action: PayloadAction<Review[]>) {
      state.reviews = action.payload;
      state.loading = false;
    },
    setEventsGallery(state, action: PayloadAction<string[]>) {
      state.eventsGallery = action.payload;
      state.loading = false;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
    setSelectedRoom(state, action: PayloadAction<Room | null>) {
      state.selectedRoom = action.payload;
      state.loading = false;
    },
  },
});

// Async actions
export const fetchData = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading());

  try {
    const querySnapshot = await getDocs(collection(db, 'Rooms'));
    const data: Room[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Room));
    dispatch(setData(data));
  } catch (error) {
    dispatch(setError((error as Error).message || 'An error occurred while fetching data'));
  }
};

// Fetch reviews
export const fetchReviews = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading());

  try {
    const querySnapshot = await getDocs(collection(db, 'Reviews'));
    const reviews: Review[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review));
    console.log(reviews)
    dispatch(setReviews(reviews));
  } catch (error) {
    console.error("Error fetching reviews:", error); // Log error for debugging
    dispatch(setError((error as Error).message || 'An error occurred while fetching data'));
  }
};

// Fetch events images
export const getImages = () => async (dispatch: AppDispatch) => {
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
  } catch (error) {
    console.error("Error fetching images:", error); // Log error for debugging
    dispatch(setError((error as Error).message || 'An error occurred while fetching data'));
  }
};



// Adds a new room
export const addRoom = (room: Room) => async (dispatch: AppDispatch) => {
  dispatch(setLoading());

  try {
    await addDoc(collection(db, 'Rooms'), room);
    dispatch(fetchData());
  } catch (error) {
    dispatch(setError((error as Error).message || 'An error occurred while adding the room'));
  }
};


// Updates room information
export const updateRoom = (id: string, updates: Partial<Room>) => async (dispatch: AppDispatch) => {
  // Dispatch loading state before updating
  dispatch(setLoading());
  console.log(updates)

  try {
    // Reference to the room document in Firestore
    const roomRef = doc(db, 'Rooms', id);

    console.log(id)
    // Perform the update operation in Firestore
    await updateDoc(roomRef, updates);

    console.log(id)
    console.log(id)

    // Dispatch fetchData to refresh the room list or room data elsewhere
    dispatch(fetchData());

  } catch (error) {
    // Error handling: Dispatch the error message to update the UI
    dispatch(setError((error as Error).message || 'An error occurred while updating the room'));
  }
};

// Deletes room
export const deleteRoom = (roomId: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading());

  try {
    const roomRef = doc(db, 'Rooms', roomId);
    await deleteDoc(roomRef);
    dispatch(fetchData()); // Fetch updated data after deletion
  } catch (error) {
    dispatch(setError((error as Error).message || 'An error occurred while deleting the room'));
  }
};

// Action creators
export const { setLoading, setData, setReviews, setError, setEventsGallery, setSelectedRoom } = dbSlice.actions;

export default dbSlice.reducer;

