import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CategoryType} from '../../types';

type CategoryState = {
  value: CategoryType[] | null;
};

const initialState: CategoryState = {
  value: [],
};

const categoriesSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<CategoryType[]>) => {
      state.value = action.payload;
    },
  },
});

export const {setCategory} = categoriesSlice.actions;
export default categoriesSlice.reducer;
