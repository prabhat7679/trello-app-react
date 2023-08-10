// loadingErrorSlice.js
import { createSlice } from "@reduxjs/toolkit";

const LoadingErrorSlice = createSlice({
  name: 'LoadingError',
  initialState: {
    isLoading: true,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setError } = LoadingErrorSlice.actions;
export default LoadingErrorSlice.reducer;
