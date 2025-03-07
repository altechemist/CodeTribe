import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Types for restaurants
export interface Restaurant {
  _id: string;
  name: string;
  description: string;
  address: string;
  cuisine: string;
  availableSlots: string[];
  rating: number;
  admin: string;
  reviews: number;
  image: string;
}

interface RestaurantState {
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
}

// Initial state for the restaurants
const initialState: RestaurantState = {
  restaurants: [],
  loading: false,
  error: null,
};

// Define API base URL
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const API_BASE_URL = `${apiUrl}/restaurants`;

// Fetch all restaurants
export const fetchRestaurants = createAsyncThunk<Restaurant[]>(
  'restaurants/fetchRestaurants',
  async () => {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  }
);

// Add a new restaurant
export const addRestaurant = createAsyncThunk<Restaurant, Restaurant>(
  'restaurants/addRestaurant',
  async (restaurant) => {
    const response = await axios.post(`${API_BASE_URL}`, restaurant);
    return response.data;
  }
);

// Update an existing restaurant
export const updateRestaurant = createAsyncThunk<Restaurant, Restaurant>(
  'restaurants/updateRestaurant',
  async (restaurant) => {
    const response = await axios.put(`${API_BASE_URL}/${restaurant._id}`, restaurant);
    return response.data;
  }
);

// Delete a restaurant
export const deleteRestaurant = createAsyncThunk<string, string>(
  'restaurants/deleteRestaurant',
  async (id) => {
    await axios.delete(`${API_BASE_URL}/${id}`);
    return id;
  }
);

// Restaurant slice
const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch restaurants
    builder.addCase(fetchRestaurants.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRestaurants.fulfilled, (state, action: PayloadAction<Restaurant[]>) => {
      state.loading = false;
      state.restaurants = action.payload;
    });
    builder.addCase(fetchRestaurants.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch restaurants';
    });

    // Add a restaurant
    builder.addCase(addRestaurant.fulfilled, (state, action: PayloadAction<Restaurant>) => {
      state.restaurants.push(action.payload);
    });

    // Update a restaurant
    builder.addCase(updateRestaurant.fulfilled, (state, action: PayloadAction<Restaurant>) => {
      const updatedRestaurantIndex = state.restaurants.findIndex((rest) => rest._id === action.payload._id);
      if (updatedRestaurantIndex !== -1) {
        state.restaurants[updatedRestaurantIndex] = action.payload;
      }
    });

    // Delete a restaurant
    builder.addCase(deleteRestaurant.fulfilled, (state, action: PayloadAction<string>) => {
      state.restaurants = state.restaurants.filter((restaurant) => restaurant._id !== action.payload);
    });
  },
});

// Export actions
export default restaurantSlice.reducer;
