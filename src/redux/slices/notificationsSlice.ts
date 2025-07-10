import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NotificationType} from '../../types';
type NotificationState = {
  value: NotificationType[];
};

const initialState: NotificationState = {
  value: [],
};

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<NotificationType[]>) => {
      state.value = action.payload;
    },
    markNotificationRead: (state, action: PayloadAction<NotificationType>) => {
      state.value = state.value.map(notif => {
        if (notif.id === action.payload.id) {
          return {...notif, read: true};
        }
        return notif;
      });
    },
    addNotification: (state, action: PayloadAction<NotificationType>) => {
      state.value.unshift(action.payload); // insert at the top, first in first out
    },
  },
});

export const {setNotifications, markNotificationRead, addNotification} =
  notificationSlice.actions;

export default notificationSlice.reducer;
