import { createSlice } from '@reduxjs/toolkit';
import { getDocs, collection, deleteDoc, doc, updateDoc, addDoc, } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { AppDispatch } from '../store';

interface Room {
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
} ;

export interface dbState {
  data: [];
  loading: boolean;
  error: null | string;
  selectedRoom: [];
}

const initialState: dbState = {
  data: [],
  loading: false,
  error: null,
  selectedRoom: [],
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

export const fetchData = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading());

  try {
    const querySnapshot = await getDocs(collection(db, 'Rooms'));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    dispatch(setData(data));
  } catch (error) {
    dispatch(setError(error.message || 'An error occurred'));
  }
};

// Adds a new room
export const addRoom = (room: Room) => async (dispatch: AppDispatch) => {
  dispatch(setLoading());

  try {
    const docRef = await addDoc(collection(db, 'Rooms'), room);
    dispatch(setData({ id: docRef.id, ...room }));
    fetchData();
  } catch (error) {
    dispatch(setError(error.message || 'An error occurred while adding the room'));
  }
};

// Updates room information
export const updateRoom = (roomId: string, updates: Partial<Room>) => async (dispatch: AppDispatch) => {
  dispatch(setLoading());

  try {
    const roomRef = doc(db, 'Rooms', roomId);
    await updateDoc(roomRef, updates);
    dispatch(setData({ id: roomId, ...updates }));
    fetchData();
  } catch (error) {
    dispatch(setError(error.message || 'An error occurred while updating the room'));
  }
};

// Deletes room
export const deleteRoom = (roomId: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading());

  try {
    const roomRef = doc(db, 'Rooms', roomId);
    await deleteDoc(roomRef);
    dispatch(setData({ id: roomId, deleted: true }));
  } catch (error) {
    dispatch(setError(error.message || 'An error occurred while deleting the room'));
  }
};

// Action creators are generated for each case reducer function
export const { setLoading, setData, setError, setSelectedRoom } = dbSlice.actions;

export default dbSlice.reducer;
