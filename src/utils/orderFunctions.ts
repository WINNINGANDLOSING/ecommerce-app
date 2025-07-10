import {getAuth} from '@react-native-firebase/auth';
import FirestoreService from '../firestore/service';
import {AppDispatch} from '../redux/store';
import firestore from '@react-native-firebase/firestore';
import {BrandOrderType, NotificationType, OrderType} from '../types';
import {addOrder, setUserOrder} from '../redux/slices/userOrderSlice';
import {getFormattedDate, handleConvertFromTimestampToDate} from './timestamp';
import {addNewNotification} from './notificationsFunction';

export const handleBuyNow = async () => {};

export const getUserOrderFromFirestore = async () => {
  try {
    const auth = getAuth();
    const user = await auth.currentUser;
    console.log(auth.currentUser?.uid);
    // const response = await firestore().collection('orders').doc().get();
    // console.log('response', response);
    // const data = response.data() as OrderType[];
    // const filteredData = data.filter(order => order.userId === user?.uid);
    const snapshot = await firestore()
      .collection('orders')
      .where('userId', '==', user?.uid)
      .get();

    const filteredData = snapshot.docs.map(doc => doc.data() as OrderType);
    return filteredData;
  } catch (err) {
    console.log(err);
  }
};

export const fetchUserOrder = async (dispatch: AppDispatch) => {
  try {
    const userOrder = await getUserOrderFromFirestore();
    console.log('user order in fetching', userOrder);
    /* 
      order => ({ ... })
      Returns an object

      order => { return { ... } }
      Same, but more verbose
      
      order => { ... }
      Block body, not an object return

    */

    console.log('new user order', userOrder);
    dispatch(setUserOrder(userOrder!));
  } catch (err) {
    console.log(err);
  }
};

export const addOrderToFirestore = async (orderItem: OrderType) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      return null;
    }
    //   orderId: Date.now().toString(),

    const response = await firestore()
      .collection('orders')
      .doc(orderItem.orderId)
      .set(orderItem);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const addNewOrder = async (
  dispatch: AppDispatch,
  orderItem: OrderType,
) => {
  try {
    // const newOrderItem = {
    //   ...orderItem,
    //   createdAt: newCreatedAt,
    //   updatedAt: newUpdatedAt,
    // };
    const orderRef = await firestore().collection('orders').doc();
    const orderId = orderRef.id;
    const newOrderItem = {...orderItem, orderId};
    dispatch(addOrder(newOrderItem));
    await addOrderToFirestore(newOrderItem);
    const user = getAuth();

    //orderItem.brandOrders.forEach(async brandOrder => {});
    // Don't use forEach here as async cannot be used with it, use for

    for (const brandOrder of orderItem.brandOrders) {
      const newNotif: NotificationType = {
        id: '',
        userId: user.currentUser?.uid!,
        title: 'pending',
        body: 'pending_text',
        type: 'order_update',
        metadata: {
          orderId: orderId,
          brand: brandOrder.brand,
          status: 'pending',
          brandOrder: brandOrder,
          createdAt: orderItem.createdAt,
          paymentMethod: orderItem.paymentMethod,
          shippingAddress: orderItem.shippingAddress!,
        },
        createdAt: getFormattedDate(new Date()),
        read: false,
      };
      await addNewNotification(dispatch, newNotif);
    }
  } catch (err) {
    console.log(err);
  }
  // set Redux before adding to firestore for performance
};

export const cancelOrder = async (
  dispatch: AppDispatch,
  orderId: string,
  brandOrderToDel: BrandOrderType,
) => {
  try {
    const userOrder = await getUserOrderFromFirestore();
    const userOrderToDel = userOrder?.find(order => order.orderId === orderId);
    console.log(brandOrderToDel.brand);
    const newBrandOrders = userOrderToDel?.brandOrders.filter(
      brandOrder => brandOrderToDel.brand !== brandOrder.brand,
    );
    console.log(newBrandOrders);
    if (newBrandOrders?.length === 0) {
      await firestore().collection('orders').doc(orderId).delete();
    } else {
      await firestore()
        .collection('orders')
        .doc(orderId)
        .update({
          updatedAt: getFormattedDate(new Date()),
          brandOrders: newBrandOrders,
        });
    }
  } catch (err) {
    console.log(err);
  }
};
