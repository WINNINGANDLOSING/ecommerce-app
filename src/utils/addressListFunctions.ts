import {getAuth} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {ShippingAddressType, UserInfo} from '../types';
import FirestoreService from '../firestore/service';
import {AppDispatch} from '../redux/store';
import {setShippingAddressList} from '../redux/slices/shippingAddressListSlice';
import {handleConvertFromTimestampToDate} from './timestamp';
import {getCurrentUser} from './userFunctions';
import {useContext} from 'react';
import {FirestoreContext} from '../firestore/FirestoreContext';

export const getSelectedAddress = async () => {
  try {
    const auth = getAuth();
    const user = await auth.currentUser;
    const response = await firestore().collection('users').doc(user?.uid).get();

    const data = response.data() as UserInfo;
    let addressList = data?.shippingAddress;
    let address = addressList.find(address => address.isDefault);

    return address;
  } catch (err) {
    console.log(err);
  }
};
export const fetchingAddressList = async (dispatch: AppDispatch) => {
  const data = await getCurrentAddressList();
  console.log('address list', data);
  const newData = {
    ...data,
  };
  dispatch(setShippingAddressList(data!));
};

export const getCurrentAddressList = async () => {
  try {
    const auth = getAuth();
    const user = await auth.currentUser;
    const response = await firestore().collection('users').doc(user?.uid).get();

    const data = response.data();
    const addressList = data?.shippingAddress;

    return addressList as ShippingAddressType[];
  } catch (err) {
    console.log(err);
  }
};
export const delAddress = async (selectedAddress: ShippingAddressType) => {
  try {
    const auth = getAuth();
    const user = await auth.currentUser;
    const addressList = await getCurrentAddressList();
    const newAddressList = [...addressList!];
    newAddressList.filter((address, index) => {
      address.id !== selectedAddress.id;
    });
    const response = await firestore()
      .collection('users')
      .doc(user?.uid)
      .update({
        shippingAddress: newAddressList,
      });
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const addNewAddress = async (
  newAddress: ShippingAddressType,
  setSelectedAddress: (address: ShippingAddressType) => void,
) => {
  try {
    const addressList = await getCurrentAddressList();

    // flow
    // if the new address shall be the default shipping address
    // clone the original address list
    // set the isDefault field of every address to false
    // add the new address to the cloned address list
    // update the shiping address list with the new address list
    const auth = getAuth();
    const user = await auth.currentUser;
    let updatedAddresses = [...addressList!];
    if (newAddress.isDefault) {
      updatedAddresses = addressList!.map((address: any) => ({
        ...address,
        isDefault: false,
      }));
    }

    updatedAddresses.push(newAddress);
    setSelectedAddress(newAddress);
    const response = await firestore()
      .collection('users')
      .doc(user?.uid)
      .update({
        shippingAddress: updatedAddresses,
      });

    //return response;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const setNewDefaultAddress = async (
  fs: FirestoreService,
  newDefaultIndex: number,
) => {
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  if (!uid) return;
  const user = await getCurrentUser();
  const data = user?.userInfoData.data();
  const addressList = data?.shippingAddress;

  const updatedAddresses = addressList.map((addr: any, index: any) => ({
    ...addr,
    isDefault: index === newDefaultIndex,
  }));
  const response = await firestore()
    .collection('users')
    .doc(user?.userAuthData.uid)
    .update({
      shippingAddress: updatedAddresses,
    });
  return response;
};
