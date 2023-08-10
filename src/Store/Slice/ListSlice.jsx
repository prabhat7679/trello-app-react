
import { createSlice } from '@reduxjs/toolkit';

const listSlice = createSlice({
  name: 'list',
  initialState: {
    listData:[]
  },
  reducers: {
    setList: (state, action) => {
      state.listData = action.payload;
    },
    addToList: (state, action) => {
      state.listData.push(action.payload);
    },
    removeFromList: (state, action) => {
       state.listData = action.payload
    },
  },
});

export const { setList, addToList, removeFromList } = listSlice.actions;
export default listSlice.reducer;
