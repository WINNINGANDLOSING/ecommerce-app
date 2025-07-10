import {useContext} from 'react';
import firestore from '@react-native-firebase/firestore';

import {AddToCartType, ItemType, NotificationType, Product} from '../types';
import {AppDispatch, RootState} from '../redux/store';
import {handleClearCart, setUserCart} from '../redux/slices/userCartSlice';
import {Alert} from 'react-native';
import FirestoreService from '../firestore/service';
import {handleConvertFromTimestampToDate} from './timestamp';
import {getAuth} from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';
import {handleSelectItems} from '../redux/slices/selectedItemsSlice';
import {getCurrentUser} from './userFunctions';
import {
  addNotification,
  markNotificationRead,
  setNotifications,
} from '../redux/slices/notificationsSlice';
// firestore
export const getUserNotifications = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    const snapshot = await firestore()
      .collection('notifications')
      .where('userId', '==', user?.uid)
      .get();

    const filteredData = snapshot.docs.map(
      doc => doc.data() as NotificationType,
    );
    return filteredData;
  } catch (err) {
    console.log(err);
  }
};
/* 

export type NotificationType = {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: 'order_update' | 'promotion' | 'reminder';
  metadata?: {
    orderId?: string;
    brand?: string;
    status?:
      | 'pending'
      | 'processing'
      | 'in_delivery'
      | 'cancelled'
      | 'completed';
  };
  read: boolean;
  createdAt: Timestamp;
};
*/

export const fetchUserNotifications = async (dispatch: AppDispatch) => {
  try {
    let notifs = await getUserNotifications();

    console.log('notifs from firestore', notifs);
    if (!notifs) {
      return;
    }

    console.log(notifs);
    dispatch(setNotifications(notifs));
    return notifs;
  } catch (err) {
    console.log(err);
  }
};

export const handleMarkNotifRead = async (
  dispatch: AppDispatch,
  notif: NotificationType,
) => {
  try {
    dispatch(markNotificationRead(notif));
    await firestore()
      .collection('notifications')
      .doc(notif.id)
      .update({read: true});
  } catch (err) {
    console.log(err);
  }
};

export const addNewNotification = async (
  dispatch: AppDispatch,
  notif: NotificationType,
) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    // if (!user) throw new Error('No user found');
    if (!user) {
      return null;
    }
    const notifRef = await firestore().collection('notifications').doc();
    const newNotif = {...notif, id: notifRef.id};
    dispatch(addNotification(newNotif));

    const response = await firestore()
      .collection('notifications')
      .doc(notifRef.id)
      .set(newNotif);
    return response;
  } catch (err) {
    console.log(err);
  }
};
