// src/redux/slices/counterSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ItemType} from '../../types';
type SelectedItemsState = {
  value: ItemType[];
};
const initialState: SelectedItemsState = {
  value: [],
};
const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    handleSelectItem: (state, action: PayloadAction<ItemType>) => {
      const exists = state.value.some(
        i => i.productId === action.payload.productId,
      );
      if (exists) {
        state.value = state.value.filter(
          i => i.productId !== action.payload.productId,
        );
      } else {
        state.value.push(action.payload);
      }
    },
    handleSelectItems: (state, action: PayloadAction<ItemType[]>) => {
      state.value = action.payload;
    },
    handleDeSelectAllItems: state => {
      state.value = [];
    },
  },
});

export const {handleSelectItem, handleSelectItems, handleDeSelectAllItems} =
  selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
