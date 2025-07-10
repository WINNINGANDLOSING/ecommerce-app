// src/redux/slices/counterSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AddToCartType} from '../../types';
type UserCartState = {
  value: AddToCartType | null;
};
const initialState: UserCartState = {
  value: null,
};
const userCartSlice = createSlice({
  name: 'userCart',
  initialState,
  reducers: {
    setUserCart: (state, action: PayloadAction<AddToCartType>) => {
      state.value = action.payload;
    },
    handleClearCart: state => {
      state.value = null;
    },
  },
});

export const {setUserCart, handleClearCart} = userCartSlice.actions;
export default userCartSlice.reducer;
