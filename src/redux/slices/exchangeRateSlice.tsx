import {createSlice} from '@reduxjs/toolkit';

const exchangeRateSlice = createSlice({
  name: 'exchangeRate',
  initialState: {
    value: 0,
  },
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {setValue} = exchangeRateSlice.actions;
export default exchangeRateSlice.reducer;
