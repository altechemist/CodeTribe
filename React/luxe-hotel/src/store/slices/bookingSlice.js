import { createSlice } from '@reduxjs/toolkit';
import { getDocs, collection, doc, deleteDoc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import axios from 'axios';
const initialState = {
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
            state.loading = false;
            state.error = action.payload;
        },
        setSuccess(state, action) {
            state.success = action.payload;
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
export const fetchData = () => async (dispatch) => {
    dispatch(setLoading());
    try {
        const querySnapshot = await getDocs(collection(db, 'Rooms'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        dispatch(setData(data));
    }
    catch (error) {
        dispatch(setError(error.message || 'An error occurred while fetching rooms'));
    }
};
export const fetchReservations = () => async (dispatch) => {
    dispatch(setLoading());
    try {
        const querySnapshot = await getDocs(collection(db, 'Reservations'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        dispatch(setReservations(data));
    }
    catch (error) {
        dispatch(setError(error.message || 'An error occurred while fetching reservations'));
    }
};
// Adds a reservation
export const addReservation = (reservation) => async (dispatch, getState) => {
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
            }
            else {
                dispatch(setError('Failed to send confirmation email.'));
            }
        }
        catch (emailError) {
            dispatch(setError(emailError.message || 'An error occurred while sending the confirmation email'));
        }
    }
    catch (error) {
        dispatch(setError(error.message || 'An error occurred while adding the reservation'));
    }
};
// Updates a reservation
export const updateReservation = (reservationId, updates) => async (dispatch) => {
    dispatch(setLoading());
    try {
        const reservationRef = doc(db, 'Reservations', reservationId);
        await updateDoc(reservationRef, updates);
        dispatch(fetchReservations());
    }
    catch (error) {
        dispatch(setError(error.message || 'An error occurred while updating the reservation'));
    }
};
// Deletes a reservation
export const deleteReservation = (reservationId) => async (dispatch) => {
    dispatch(setLoading());
    try {
        const reservationRef = doc(db, 'Reservations', reservationId);
        await deleteDoc(reservationRef);
        dispatch(fetchReservations());
    }
    catch (error) {
        dispatch(setError(error.message || 'An error occurred while deleting the reservation'));
    }
};
// Action creators are generated for each case reducer function
export const { setLoading, setData, setError, setSuccess, setSelectedRoom, setDuration, setCheckIn, setCheckOut, setAdults, setChildren, setGuests, setSubtotal, setReservations, setBookingData, } = bookingSlice.actions;
export default bookingSlice.reducer;
