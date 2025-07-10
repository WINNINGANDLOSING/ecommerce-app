import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {ItemType} from '../../types';
//ItemType
type PriceState = {
  productSubTotal: number;
  shippingSubTotal: number;
};

const initialState: PriceState = {
  productSubTotal: 0,
  shippingSubTotal: 0,
};
/* 
 const total = selectedItems.reduce((acc, item) => {
      const method = selectedShippingMethods[item.productId];
      if (method === 'instant') {
        return acc + item.product.weight * 0.5 + 2;
      }
      return acc + 0;
    }, 0);
*/
const priceSlice = createSlice({
  name: 'totalPrice',
  initialState,
  reducers: {
    setProductSubTotal: (state, action: PayloadAction<ItemType[]>) => {
      const total = action.payload.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
      }, 0);

      state.productSubTotal = total;
    },
    setShippingSubTotal: (state, action: PayloadAction<number>) => {
      state.shippingSubTotal = action.payload;
    },
  },
});

export const selectTotalPrice = (state: RootState) =>
  state.price.productSubTotal + state.price.shippingSubTotal;

export default priceSlice.reducer;
export const {setProductSubTotal, setShippingSubTotal} = priceSlice.actions;
