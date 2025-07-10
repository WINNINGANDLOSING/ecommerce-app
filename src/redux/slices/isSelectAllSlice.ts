import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type IsSelectAllState = {
  value: boolean;
};

const initialState: IsSelectAllState = {
  value: false,
};

const isSelectAllSlice = createSlice({
  name: 'IsSelectAll',
  initialState,
  reducers: {
    setSelectAll: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const {setSelectAll} = isSelectAllSlice.actions;

export default isSelectAllSlice.reducer;
