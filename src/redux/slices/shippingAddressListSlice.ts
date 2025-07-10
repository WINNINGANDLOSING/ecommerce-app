// src/redux/slices/counterSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ShippingAddressType} from '../../types';

type ShippingAdressState = {
  value: ShippingAddressType[];
};

const initialState: ShippingAdressState = {
  value: [],
};

const shippingAddressListSlice = createSlice({
  name: 'shippingAddressList',
  initialState,
  reducers: {
    setShippingAddressList: (
      state,
      action: PayloadAction<ShippingAddressType[]>,
    ) => {
      state.value = action.payload;
    },
  },
});
export const {setShippingAddressList} = shippingAddressListSlice.actions;
export default shippingAddressListSlice.reducer;
