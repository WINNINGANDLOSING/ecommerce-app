// src/redux/store.ts
import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import selectedItemsReducer from './slices/selectedItemsSlice';
import userCartReducer from './slices/userCartSlice';
import categoriesReducer from './slices/categoriesSlice';
import currentUserReducer from './slices/currentUserSlice';
import priceReducer from './slices/priceSlice';
import isSelectAllReducer from './slices/isSelectAllSlice';
import userOrderSliceReducer from './slices/userOrderSlice';
import shippingAddressListSliceReducer from './slices/shippingAddressListSlice';
import exchangeRateSliceReducer from './slices/exchangeRateSlice';
import productsSliceReducer from './slices/productsSlice';
import notificationSliceReducer from './slices/notificationsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    selectedItems: selectedItemsReducer,
    userCart: userCartReducer,
    category: categoriesReducer,
    currentUser: currentUserReducer,
    price: priceReducer,
    isSelectAll: isSelectAllReducer,
    userOrder: userOrderSliceReducer,
    shippingAddressList: shippingAddressListSliceReducer,
    exchangeRate: exchangeRateSliceReducer,
    products: productsSliceReducer,
    notifications: notificationSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
