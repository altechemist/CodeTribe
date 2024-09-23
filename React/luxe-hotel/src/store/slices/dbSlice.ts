import { createSlice } from '@reduxjs/toolkit';
import { getDocs, collection, } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { AppDispatch } from '../store';

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


// Action creators are generated for each case reducer function
export const { setLoading, setData, setError, setSelectedRoom } = dbSlice.actions;

export default dbSlice.reducer;
