import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Types for reservation data
export interface Reservation {
  _id: string;
  user_id: string;
  restaurant_id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  date: string;
  time: string;
  numberOfPeople: number;
  specialRequests: string;
}

interface ReservationState {
  reservations: Reservation[];
  reservation: Reservation | null;
  loading: boolean;
  error: string | null;
}

// Initial state for reservations
const initialState: ReservationState = {
  reservations: [],
  reservation: null,
  loading: false,
  error: null,
};

// Define API base URL
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const API_BASE_URL = `${apiUrl}/reservations`;

// Create a reservation
export const createReservation = createAsyncThunk<Reservation, Reservation>(
  'reservations/createReservation',
  async (reservationData) => {
    const response = await axios.post(`${API_BASE_URL}`, reservationData);
    return response.data;
  }
);

// Fetch all reservations
export const fetchReservations = createAsyncThunk<Reservation[]>(
  'reservations/fetchReservations',
  async () => {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  }
);

// Fetch a single reservation by ID
export const fetchReservationById = createAsyncThunk<Reservation, string>(
  'reservations/fetchReservationById',
  async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  }
);

// Update a reservation
export const updateReservation = createAsyncThunk<Reservation, { id: string; data: Reservation }>(
  'reservations/updateReservation',
  async ({ id, data }) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, data);
    return response.data;
  }
);

// Delete a reservation
export const deleteReservation = createAsyncThunk<string, string>(
  'reservations/deleteReservation',
  async (id) => {
    await axios.delete(`${API_BASE_URL}${id}`);
    return id;
  }
);

// Reservation slice
const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create reservation
    builder.addCase(createReservation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createReservation.fulfilled, (state, action: PayloadAction<Reservation>) => {
      state.loading = false;
      state.reservations.push(action.payload);
    });
    builder.addCase(createReservation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to create reservation';
    });

    // Fetch all reservations
    builder.addCase(fetchReservations.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchReservations.fulfilled, (state, action: PayloadAction<Reservation[]>) => {
      state.loading = false;
      state.reservations = action.payload;
      console.log(action.payload);
    });
    builder.addCase(fetchReservations.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch reservations';
    });

    // Fetch reservation by ID
    builder.addCase(fetchReservationById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchReservationById.fulfilled, (state, action: PayloadAction<Reservation>) => {
      state.loading = false;
      state.reservation = action.payload;
    });
    builder.addCase(fetchReservationById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch reservation';
    });

    // Update reservation
    builder.addCase(updateReservation.fulfilled, (state, action: PayloadAction<Reservation>) => {
      const index = state.reservations.findIndex((reservation) => reservation._id === action.payload._id);
      if (index !== -1) {
        state.reservations[index] = action.payload;
      }
    });

    // Delete reservation
    builder.addCase(deleteReservation.fulfilled, (state, action: PayloadAction<string>) => {
      state.reservations = state.reservations.filter((reservation) => reservation._id !== action.payload);
    });
  },
});

// Export reducer
export default reservationSlice.reducer;
