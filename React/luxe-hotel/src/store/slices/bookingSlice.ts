import { createSlice } from '@reduxjs/toolkit';
import { getDocs, collection, doc, deleteDoc, updateDoc, addDoc, } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { AppDispatch } from '../store';

interface Reservation {
  checkInDate: string;
  checkOutDate: string;
  guestName: string;
  guests: number;
  roomId: string;
  roomType: string;
  status: boolean;
}

export interface bookingState {
  data: [];
  reservations: Reservation[];
  bookingData: object;
  loading: boolean;
  error: null | string;
  selectedRoom: [];
  duration: number;
  checkIn: null | string;
  checkOut: null | string;
  children: null | number;
  adults: null | number;
  guests: null | number;
  subtotal: number,
}

const initialState: bookingState = {
  data: [],
  reservations: [],
  bookingData: {},
  loading: false,
  error: null,
  selectedRoom: [],
  duration: 0,
  checkIn: null,
  checkOut: null,
  children: 0,
  adults: 0,
  guests: 0,  // Total guests (adults + children)
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
    setBookingData(state, action) {
      state.bookingData = action.payload;
      state.loading = false;
    },
    setReservations(state, action) {
      state.reservations = action.payload;
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
    setGuests(state, action) {
      state.guests = action.payload;
    },
    
  },
});

// Fetch all rooms from Firestore and dispatch the data to the Redux store
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

export const fetchReservations = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading());

  try {
    const querySnapshot = await getDocs(collection(db, 'Reservations'));
    const data: Reservation[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Reservation)); // Type assertion
    dispatch(setReservations(data));
  } catch (error) {
    dispatch(setError(error.message || 'An error occurred while fetching reservations'));
  }
};

// Adds a reservation
export const addReservation = (reservation: Reservation) => async (dispatch: AppDispatch) => {
  dispatch(setLoading());

  try {
    const docRef = await addDoc(collection(db, 'Reservations'), reservation);
    dispatch(setReservations([...reservation, { id: docRef.id, ...reservation }])); // Update this line
  } catch (error) {
    dispatch(setError(error.message || 'An error occurred while adding the reservation'));
  }
};

// Updates a reservation
export const updateReservation = (reservationId: string, updates: Partial<Reservation>) => async (dispatch: AppDispatch) => {
  dispatch(setLoading());

  try {
    const reservationRef = doc(db, 'Reservations', reservationId);
    await updateDoc(reservationRef, updates);
    dispatch(setData({ id: reservationId, ...updates }));
  } catch (error) {
    dispatch(setError(error.message || 'An error occurred while updating the reservation'));
  }
};

// Deletes a reservation
export const deleteReservation = (reservationId: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading());

  try {
    const reservationRef = doc(db, 'Reservations', reservationId);
    await deleteDoc(reservationRef);
    dispatch(setData({ id: reservationId, deleted: true }));
  } catch (error) {
    dispatch(setError(error.message || 'An error occurred while deleting the reservation'));
  }
};




// Action creators are generated for each case reducer function
export const { setLoading, setData, setError, setSelectedRoom, setDuration, setCheckIn, setCheckOut, setAdults, setChildren, setGuests, setSubtotal, setReservations, setBookingData } = bookingSlice.actions;

export default bookingSlice.reducer;
