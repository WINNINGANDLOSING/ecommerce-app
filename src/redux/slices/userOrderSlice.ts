import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {OrderType} from '../../types';

type OrderState = {
  value: OrderType[];
};

const initialState: OrderState = {
  value: [],
};

const userOrderSlice = createSlice({
  name: 'userOrder',
  initialState,
  reducers: {
    setUserOrder: (state, action: PayloadAction<OrderType[]>) => {
      state.value = action.payload;
    },
    addOrder: (state, action: PayloadAction<OrderType>) => {
      state.value.push(action.payload);
    },
    removeOrder: (
      state,
      action: PayloadAction<{orderId: string; brand: string}>,
    ) => {
      let {orderId, brand} = action.payload;
      // find the index of the userOrder to modify its brandOrders
      // the index in the redux not the firestore
      const userOrderIndex = state.value.findIndex(
        order => order.orderId === orderId,
      );

      // find the userOrder to be deleted in the redux store by using the index
      const userOrder = state.value[userOrderIndex];
      // in this userOrder
      // remove the required brand order among other brand orders
      const updatedBrandOrders = userOrder.brandOrders.filter(
        brandOrder => brandOrder.brand !== brand,
      );
      // if there is nothing left in the updatedBrandOrders, meaning it is now an empty list after the last brand order is removed
      // just remove the order altogether
      if (!updatedBrandOrders) {
        state.value.splice(userOrderIndex, 1);
      }
      // if there is indeed some brand order left in the brandOrder of that order
      // update that field
      state.value[userOrderIndex] = {
        ...userOrder,
        brandOrders: updatedBrandOrders,
      };
    },
    updateOrder: (state, action: PayloadAction<OrderType>) => {
      state.value.map(order =>
        order.orderId === action.payload.orderId ? action.payload : order,
      );
    },
  },
});

export const {addOrder, setUserOrder, removeOrder, updateOrder} =
  userOrderSlice.actions;
export default userOrderSlice.reducer;
