import {StyleSheet} from 'react-native';
import Config from 'react-native-config';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import React, {
  createContext,
  FC,
  useState,
  PropsWithChildren,
  useEffect,
  useCallback,
} from 'react';
import FirestoreService from './service';
import {ItemType, ShippingAddressType} from '../types';
import {
  FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
} from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../redux/store';
//   const [userCart, setUserCart] = useState<AddToCartType>();
//   const [isSelectAll, setIsSelectAll] = useState(false);

// type of user from firestore.getCurrentUser

type FirestoreContextType = {
  user: FirebaseAuthTypes.User | undefined;
  setUser: (user: FirebaseAuthTypes.User) => void;
  firestore: FirestoreService;
  dispatch: AppDispatch;
  languagePreference: string;
  setLanguagePreference: (languagePreference: string) => void;

  selectedAddress: ShippingAddressType | null;
  setSelectedAddress: (selectedItems: ShippingAddressType) => void;
};

export const FirestoreContext = createContext<FirestoreContextType>({
  user: undefined,
  setUser: (user: FirebaseAuthTypes.User) => {},
  firestore: new FirestoreService(),
  languagePreference: 'English',
  dispatch: (() => {}) as AppDispatch,
  setLanguagePreference: (languagePreference: string) => {},

  selectedAddress: null,
  setSelectedAddress: (selectedItems: ShippingAddressType) => {},
});

export const FirestoreProvider: FC<PropsWithChildren> = ({children}) => {
  const [selectedAddress, setSelectedAddress] =
    useState<ShippingAddressType | null>(null);
  useEffect(() => {
    console.log('selected address', selectedAddress);
  }, [selectedAddress]);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [languagePreference, setLanguagePreference] = useState('');
  const firestore = new FirestoreService();
  const dispatch = useDispatch();
  // Handle user state changes
  const handleAuthStateChanged = (user: any) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };
  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Config.WebClientID,
    });
  }, []);
  //   const fetchCartData = async () => {
  //     const data = await firestore.getCurrentCart();
  //     setUserCart(data);
  //   };
  //   fetchCartData();
  // }, []);

  // const fetchingCurrentUser = async () => {
  //   const user = await firestore.getCurrentUser();
  //   setCurrentUser(user);
  // };

  // useEffect(() => {
  //   fetchingCurrentUser();
  // }, []);

  // useEffect(() => {
  //   const total = selectedItems.reduce(
  //     (acc, item) => acc + item.product.price * item.quantity,
  //     0,
  //   );
  //   setTotalPrice(total);
  // }, [selectedItems]);

  // useEffect(() => {
  //   if (userCart) {
  //     setIsSelectAll(
  //       userCart?.items.length! > 0 &&
  //         userCart?.items.length === selectedItems.length,
  //     );
  //   }
  // }, [userCart, selectedItems]);

  const defaultValue = {
    dispatch,
    user,
    setUser,
    firestore,
    languagePreference,
    setLanguagePreference,

    selectedAddress,
    setSelectedAddress,
  };
  return (
    <FirestoreContext.Provider value={defaultValue}>
      {children}
    </FirestoreContext.Provider>
  );
};
