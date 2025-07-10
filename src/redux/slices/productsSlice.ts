import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {ItemType, Product} from '../../types';
//ItemType
type ProductState = {
  value: Product[];
};

const initialState: ProductState = {
  value: [],
};
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.value = action.payload;
    },
  },
});

export default productsSlice.reducer;
export const {setProducts} = productsSlice.actions;
