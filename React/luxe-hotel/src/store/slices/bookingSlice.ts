import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDocs, collection, doc, deleteDoc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { AppDispatch } from '../store';
import axios from 'axios';

interface Reservation {
  id?: string;
  checkInDate: string;
  checkOutDate: string;
  guestName: string;
  guestEmail: string;
  guests: number;
  roomId: string;
  roomType: string;
  status: boolean;
}

interface Room {
  id: string;
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

interface BookingData {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  totalGuests: number;
  subtotal: number;
}

export interface BookingState {
  data: Room[];
  reservations: Reservation[];
  bookingData: BookingData | null;
  loading: boolean;
  error: string | null;
  success: string | null;
  selectedRoom: Room | null;
  duration: number;
  checkIn: string | null;
  checkOut: string | null;
  children: number;
  adults: number;
  guests: number;
  subtotal: number;
}

const initialState: BookingState = {
  data: [],
  reservations: [],
  bookingData: null,
  loading: false,
  error: null,
  success: null,
  selectedRoom: null,
  duration: 0,
  checkIn: null,
  checkOut: null,
  children: 0,
  adults: 0,
  guests: 0,
  subtotal: 0,
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setLoading(state) {
      state.loading = true;
      state.error = null; // Reset any previous errors when loading starts
    },
    setData(state, action: PayloadAction<Room[]>) {
      state.data = action.payload;
      state.loading = false;
    },
    setBookingData(state, action: PayloadAction<BookingData | null>) {
      state.bookingData = action.payload;
      state.loading = false;
    },
    setReservations(state, action: PayloadAction<Reservation[]>) {
      state.reservations = action.payload;
      state.loading = false;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
    setSuccess(state, action: PayloadAction<string | null>) {
      state.success = action.payload;
      state.loading = false;
    },
    setSelectedRoom(state, action: PayloadAction<Room | null>) {
      state.selectedRoom = action.payload;
      state.loading = false;
    },
    setDuration(state, action: PayloadAction<number>) {
      state.duration = action.payload;
    },
    setCheckIn(state, action: PayloadAction<string | null>) {
      state.checkIn = action.payload;
    },
    setCheckOut(state, action: PayloadAction<string | null>) {
      state.checkOut = action.payload;
    },
    setChildren(state, action: PayloadAction<number>) {
      state.children = action.payload;
    },
    setAdults(state, action: PayloadAction<number>) {
      state.adults = action.payload;
    },
    setSubtotal(state, action: PayloadAction<number>) {
      state.subtotal = action.payload;
    },
    setGuests(state, action: PayloadAction<number>) {
      state.guests = action.payload;
    },
  },
});

// Fetch all rooms from Firestore and dispatch the data to the Redux store
export const fetchData = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading());

  try {
    const querySnapshot = await getDocs(collection(db, 'Rooms'));
    const data: Room[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Room));
    dispatch(setData(data));
  } catch (error) {
    dispatch(setError((error as Error).message || 'An error occurred while fetching rooms'));
  }
};

export const fetchReservations = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading());

  try {
    const querySnapshot = await getDocs(collection(db, 'Reservations'));
    const data: Reservation[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Reservation));
    dispatch(setReservations(data));
  } catch (error) {
    dispatch(setError((error as Error).message || 'An error occurred while fetching reservations'));
  }
};

// Adds a reservation
export const addReservation = (reservation: Reservation) => async (dispatch: AppDispatch, getState) => {
  dispatch(setLoading());

  try {
    const docRef = await addDoc(collection(db, 'Reservations'), reservation);
    const newReservation = { id: docRef.id, ...reservation };

    // Use current reservations from the store and append the new reservation
    const state = getState();
    dispatch(setReservations([...state.booking.reservations, newReservation]));

    // Send a confirmation email
    const emailPayload = {
      name: newReservation.guestName,
      email: newReservation.guestEmail,
      roomType: newReservation.roomType,
      checkInDate: newReservation.checkInDate,
      checkOutDate: newReservation.checkOutDate,
    };

    try {
      const response = await axios.post('https://sendemail-xnue.onrender.com/send-email', emailPayload);
      if (response.status === 200) {
        dispatch(setSuccess('Confirmation email sent successfully.'));
      } else {
        dispatch(setError('Failed to send confirmation email.'));
      }
    } catch (emailError) {
      dispatch(setError((emailError as Error).message || 'An error occurred while sending the confirmation email'));
    }
  } catch (error) {
    dispatch(setError((error as Error).message || 'An error occurred while adding the reservation'));
  }
};

// Updates a reservation
export const updateReservation = (reservationId: string, updates: Partial<Reservation>) => async (dispatch: AppDispatch) => {
  dispatch(setLoading());

  try {
    const reservationRef = doc(db, 'Reservations', reservationId);
    await updateDoc(reservationRef, updates);
    dispatch(fetchReservations());
  } catch (error) {
    dispatch(setError((error as Error).message || 'An error occurred while updating the reservation'));
  }
};

// Deletes a reservation
export const deleteReservation = (reservationId: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading());

  try {
    const reservationRef = doc(db, 'Reservations', reservationId);
    await deleteDoc(reservationRef);
    dispatch(fetchReservations());
  } catch (error) {
    dispatch(setError((error as Error).message || 'An error occurred while deleting the reservation'));
  }
};

// Action creators are generated for each case reducer function
export const {
  setLoading,
  setData,
  setError,
  setSuccess,
  setSelectedRoom,
  setDuration,
  setCheckIn,
  setCheckOut,
  setAdults,
  setChildren,
  setGuests,
  setSubtotal,
  setReservations,
  setBookingData,
} = bookingSlice.actions;

export default bookingSlice.reducer;
