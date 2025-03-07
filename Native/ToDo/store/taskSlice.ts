import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define your custom task interface
interface Task {
  id: string;
  createdAt: Date | string; // Handle both Date or string if you're dealing with ISO strings
  uid: string | null;
  name: string | null;
  dueDate: string | null;
  content: string | null;
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  success: null,
};

// Define the async getTasks function
export const getTasks = () => async (dispatch: any) => {
  try {
    dispatch(setLoading()); // Set loading before the API call
    const response = await axios.get(
      `https://67403d2fd0b59228b7ef3345.mockapi.io/api/tasks`
    );
    dispatch(setTasks(response?.data)); // Dispatch tasks data to store
  } catch (error) {
    dispatch(setError(error.message || 'Failed to fetch tasks')); // Dispatch error if the API call fails
  }
};

// Add tasks
export const addTask = (name: string, content: string) => async (dispatch: any) => {
  const status: boolean = false;
  try {
    dispatch(setLoading()); // Set loading before the API call
    const response = await axios.post(
      `https://67403d2fd0b59228b7ef3345.mockapi.io/api/tasks`, {name, content, status}
    );
    dispatch(getTasks()); // Refresh the list
  } catch (error) {
    dispatch(setError(error.message || 'Failed to fetch tasks')); // Dispatch error if the API call fails
  }
}

// Update tasks
export const updateTask = (id: string) => async (dispatch: any) => {
  const status: boolean = true;

  try {
    dispatch(setLoading()); // Set loading before the API call
    const response = await axios.put(
      `https://67403d2fd0b59228b7ef3345.mockapi.io/api/tasks${id}`, status
    );
    dispatch(getTasks()); // Refresh the list
  } catch (error) {
    dispatch(setError(error.message || 'Failed to fetch tasks')); // Dispatch error if the API call fails
  }
}

// Delete task
export const deleteTask = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading()); // Set loading before the API call
    const response = await axios.delete(
      `https://67403d2fd0b59228b7ef3345.mockapi.io/api/tasks/${id}`
    );
    dispatch(getTasks()); // Refresh the list
  } catch (error) {
    dispatch(setError(error.message || 'Failed to fetch tasks')); // Dispatch error if the API call fails
  }
}

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setTasks(state, action: PayloadAction<Task[] | null>) {
      state.tasks = action.payload ?? [];
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
  },
});

export const { setLoading, setTasks, setError, setSuccess } = taskSlice.actions;

export default taskSlice.reducer;
