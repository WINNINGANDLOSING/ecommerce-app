import {useContext} from 'react';
import firestore from '@react-native-firebase/firestore';

import {AddToCartType, ItemType, Product} from '../types';
import {AppDispatch, RootState} from '../redux/store';
import {handleClearCart, setUserCart} from '../redux/slices/userCartSlice';
import {Alert} from 'react-native';
import FirestoreService from '../firestore/service';
import {handleConvertFromTimestampToDate} from './timestamp';
import {getAuth} from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';
import {handleSelectItems} from '../redux/slices/selectedItemsSlice';
import {getCurrentUser} from './userFunctions';
// firestore
export const getCurrentCartFromFirestore = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    const response = await firestore().collection('carts').doc(user?.uid).get();
    const data = response.data() as AddToCartType;
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const fetchUserCart = async (dispatch: AppDispatch) => {
  try {
    const cart = await getCurrentCartFromFirestore();
    if (
      !cart ||
      !cart.userId ||
      !cart.items ||
      !cart.creationDate ||
      !cart.updatedAt
    ) {
      dispatch(handleClearCart()); // IMPORTANT!, is user is undefined (meaning user's cart is empty) then update Redux of userCart slice
      return; // This will stop the updating Redux of userCart slice if the above line is not there
    }
    console.log('succeed passing conditions');
    let updatedAt = new Date(cart.updatedAt);
    let creationDate = new Date(cart.creationDate);

    const newCart: AddToCartType = {
      ...cart,
      updatedAt: handleConvertFromTimestampToDate(updatedAt).toISOString(),
      creationDate:
        handleConvertFromTimestampToDate(creationDate).toISOString(),
    };
    console.log(newCart);
    dispatch(setUserCart(newCart));
    return newCart;
  } catch (err) {
    console.log(err);
  }
};

export const handleRemoveItem = async (
  dispatch: AppDispatch,
  brand: string,
  itemId: number,
  selectedItems: ItemType[],
) => {
  try {
    const cartData = await fetchUserCart(dispatch);
    const updatedItems = cartData?.items.brand.filter(
      item => item.productId !== itemId,
    );
    const updatedSelectedItems = selectedItems.filter(
      item => item.productId !== itemId,
    );

    const newCartData = {
      ...cartData,
      items: {...cartData?.items, [brand]: updatedItems},
    } as AddToCartType;
    dispatch(setUserCart(newCartData!));
    dispatch(handleSelectItems(updatedSelectedItems));
    addCartItemToFirestore(newCartData!);
  } catch (err) {
    console.log(err);
  }
};

export const handleChangeItemQuantity = async (
  itemId: number,
  dispatch: AppDispatch,
  brand: string,
  type: 'increment' | 'decrement',
) => {
  try {
    const cartData = await fetchUserCart(dispatch);

    const updatedItems = cartData?.items[brand].map(item => {
      if (item.productId === itemId) {
        return {
          ...item,
          quantity:
            type === 'increment' ? (item.quantity += 1) : (item.quantity -= 1),
        };
      }
      return item;
    });
    const newCartData = {
      ...cartData,
      items: {...cartData?.items, [brand]: updatedItems},
    } as AddToCartType;
    dispatch(setUserCart(newCartData!));
    addCartItemToFirestore(newCartData!);
  } catch (err) {}
};

// export const addCartItemToFirestore = async (cartItems: AddToCartType) => {
//   try {
//     const auth = getAuth();
//     const user = auth.currentUser;
//     // if (!user) throw new Error('No user found');
//     if (!user) {
//       return null;
//     }
//     // const cartRef = firestore().collection('carts').doc(user.uid);
//     // const doc = await cartRef.get();
//     // each user has only one cart
//     // if the current logged in user already has a cart
//     const cartItemDoc = await firestore()
//       .collection('carts')
//       .doc(user.uid)
//       .get();
//     let updatedItems = [...cartItems.items];

//     let creationDate = new Date();
//     if (cartItemDoc.exists) {
//       const existingCart = cartItemDoc.data() as AddToCartType;

//       // updatedItems = [...existingCart.items];

//       // cartItem.items.forEach(item => {
//       //   const index = updatedItems.findIndex(
//       //     item => item.productId === item.productId,
//       //   );

//       //   if (index !== -1) {
//       //     // Product exists — increase quantity
//       //     updatedItems[index].quantity += item.quantity;
//       //   } else {
//       //     // Product not in cart — add it
//       //     updatedItems.push(item);
//       //   }
//       // });
//      updatedItems = [...existingCart.items]; // don't put let here. So when you later access updatedItems outside the if, you’re still using the original one, not the updated one.

//       // check if the passed item already exist, if yes update quantity by 1, if not add that to db
//       // updatedItems is the old, cartItem is the new item pushed from the param
//       // take the old (updatedItems) and find if a product  already exists in it based on the id the input
//       cartItems.items.forEach(newItem => {
//         let itemIndex = existingCart.items.findIndex(
//           item => item.productId === newItem.productId,
//         );
//         /*
//         find here return a whole new object item
//         item: {
//           productId:
//           quantity:
//           product:
//         }[]

//         but findIndex return the index of the object item
//         so if we use findIndex
//         do
//         if(index!==1){
//           updatedItems[index].quantity += 1
//         }
//         */

//         if (itemIndex !== -1) {
//           updatedItems[itemIndex].quantity =
//             updatedItems[itemIndex].quantity + 1;
//         } else {
//           updatedItems.push(newItem);
//         }
//       });
//       // if user's cart already exists, creationDate remains the same
//       creationDate =
//         typeof existingCart.creationDate === 'string'
//           ? new Date(existingCart.creationDate)
//           : existingCart.creationDate;
//     }
//     let newCartItem = {
//       ...cartItems,
//       items: updatedItems,
//       updatedAt: new Date(),
//       creationDate: creationDate,
//     };

//     const response = await firestore()
//       .collection('carts')
//       .doc(user.uid)
//       .set(cartItems);

//     // Alert.alert('Successfully uploading new cart item', '', [{text: 'OK'}]);

//     return response;
//   } catch (err) {
//     Alert.alert('Fail to upload to carts', String(err), [{text: 'OK'}]);
//     return null;
//   }
// };

export const addCartItemToFirestore = async (cartItems: AddToCartType) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    // if (!user) throw new Error('No user found');
    if (!user) {
      return null;
    }
    const response = await firestore()
      .collection('carts')
      .doc(user.uid)
      .set(cartItems);

    return response;
  } catch (err) {
    Alert.alert('Fail to upload to carts', String(err), [{text: 'OK'}]);
    return null;
  }
};

export const clearCart = async () => {
  try {
    const auth = getAuth();
    const user = await auth.currentUser;
    const response = await firestore()
      .collection('carts')
      .doc(user?.uid)
      .delete();
    // dispatch(handleClearCart());
    return response;
  } catch (err) {
    console.log(err);
  }
};

// export const clearCart = async (firestore: FirestoreService) => {
//   try {
//     await firestore.clearCart();
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const addNewCart = async (
//   userCart: AddToCartType,
//   product: Product,
//   firestore: FirestoreService,
//   dispatch: AppDispatch,
// ) => {
//   try {
//     const user = await firestore.getCurrentUser();
//     const id = user?.userAuthData.uid;

//     // --- Optimistically update Redux state first
//     let existingItems = userCart?.items || [];

//     const existingIndex = existingItems.findIndex(
//       item => item.productId === product.id,
//     );

//     if (existingIndex !== -1) {
//       existingItems[existingIndex].quantity += 1;
//     } else {
//       existingItems.push({
//         productId: product.id,
//         quantity: 1,
//         product: product,
//       });
//     }

//     const updatedCart: AddToCartType = {
//       userId: id || '0',
//       items: existingItems,
//       updatedAt: new Date().toISOString(),
//       creationDate: userCart?.creationDate || new Date().toISOString(),
//     };

//     dispatch(setUserCart(updatedCart!));

//     // add new cart item to firestore collectin 'carts'

//     //await addCartItemToFirestore(updatedCart);
//     // let updatedCart = (await getCurrentCartFromFirestore()) as AddToCartType;
//     // updatedCart = {
//     //   ...updatedCart,
//     //   updatedAt: new Date().toISOString(),
//     //   creationDate: new Date().toISOString(),
//     // };
//     // add new cart item to cart slice
//   } catch (err) {
//     Alert.alert('Something wrong', String(err), [
//       {
//         text: 'OK',
//       },
//     ]);
//   }
// };

export const addNewCart = async (
  product: Product,
  dispatch: AppDispatch,
  userCart: AddToCartType | null,
) => {
  try {
    const user = await getCurrentUser();
    const id = user?.userAuthData.uid;
    const brand = product.brand || 'unknown';

    // Clone existing itemsByBrand deeply
    const clonedItemsByBrand: {[brand: string]: ItemType[]} = {};

    if (userCart?.items) {
      for (const brandKey in userCart.items) {
        clonedItemsByBrand[brandKey] = userCart.items[brandKey].map(item => ({
          ...item,
        }));
      }
    }

    const brandItems = clonedItemsByBrand[brand] || [];

    const existingIndex = brandItems.findIndex(
      item => item.productId === product.id,
    );

    if (existingIndex !== -1) {
      brandItems[existingIndex].quantity += 1;
    } else {
      brandItems.push({
        productId: product.id,
        quantity: 1,
        product,
      });
    }

    clonedItemsByBrand[brand] = brandItems;

    const updatedCart: AddToCartType = {
      userId: id || '0',
      items: clonedItemsByBrand,
      updatedAt: new Date().toISOString(),
      creationDate: userCart?.creationDate || new Date().toISOString(),
    };

    dispatch(setUserCart(updatedCart));
    await addCartItemToFirestore(updatedCart);
  } catch (err) {
    Alert.alert('Something wrong', String(err), [{text: 'OK'}]);
  }
};
