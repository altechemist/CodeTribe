import { createSlice } from '@reduxjs/toolkit';
import { getDocs, collection, } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { AppDispatch } from '../store';

export interface bookingState {
  data: [];
  loading: boolean;
  error: null | string;
  selectedRoom: [];
  duration: number;
  checkIn: null | string;
  checkOut: null | string;
  children: null | number;
  adults: null | number;
  subtotal: number,
}

const initialState: bookingState = {
  data: [],
  loading: false,
  error: null,
  selectedRoom: [],
  duration: 0,
  checkIn: null,
  checkOut: null,
  children: 0,
  adults: 0,
  subtotal: 0,
};

export const bookingSlice = createSlice({
  name: 'booking',
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
    setDuration(state, action) {
      state.duration = action.payload;
    },
    setCheckIn(state, action) {
      state.checkIn = action.payload;
    },
    setCheckOut(state, action) {
      state.checkOut = action.payload;
    },
    setChildren(state, action) {
      state.children = action.payload;
    },
    setAdults(state, action) {
      state.adults = action.payload;
    },
    setSubtotal(state, action) {
      state.subtotal = action.payload;
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


// Action creators are generated for each case reducer function
export const { setLoading, setData, setError, setSelectedRoom, setDuration, setCheckIn, setCheckOut, setAdults, setChildren, setSubtotal } = bookingSlice.actions;

export default bookingSlice.reducer;
