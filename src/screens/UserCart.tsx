import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CartStackParamList} from '../routes/AppStack';
import {ComponentStyles, Colors, Spacing, Typography} from '../styles/global';

import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
// import {
//   handleDeSelectAllItems,
//   setSelectedItems,
//   handleSelectItems,
// } from '../redux/slices/selectedItemsSlice';

import {
  handleDeSelectAllItems,
  handleSelectItem,
  handleSelectItems,
} from '../redux/slices/selectedItemsSlice';

import HeaderView from '../components/HeaderView';
import UserCartList from '../components/UserCartList';
import UserCartBottomView from '../components/UserCartBottomView';
import {useTranslation} from 'react-i18next';
import {getFormattedPrice} from '../utils/convertData';

type UserCartScreenProp = NativeStackScreenProps<CartStackParamList, 'Cart'>;

// search queries
const UserCartPage = ({navigation, route}: UserCartScreenProp) => {
  const dispatch = useDispatch();
  const exChangeRate = useSelector(
    (state: RootState) => state.exchangeRate.value,
  );
  const {t} = useTranslation('cart');
  const from = route?.params?.from || 'Home';
  const userCart = useSelector((state: RootState) => state.userCart.value);
  useEffect(() => {
    if (userCart) {
      console.log('user cart', userCart);
    }
  }, [userCart]);
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.value,
  );

  const handleSelectAll = async () => {
    dispatch(handleSelectItems(Object.values(userCart?.items ?? {}).flat()));
  };
  const productSubTotal = useSelector(
    (state: RootState) => state.price.productSubTotal,
  );

  if (!userCart)
    return (
      <View
        className="flex flex-col  flex-1  "
        style={ComponentStyles.bodyView}>
        <HeaderView from={from} text={t('title')} isShownBackBtn={false} />

        <View className="bg-gray-200 flex items-center justify-center w-full p-5">
          <Text className="font-semibold text-xl">Your Cart Is Empty</Text>
        </View>
      </View>
    );

  return (
    <View className="flex flex-col  flex-1  " style={ComponentStyles.bodyView}>
      <HeaderView from={from} text={t('title')} isShownBackBtn={false} />
      {/* {userCart && <ClearAllButton />} */}

      <View className="flex mb-3 flex-row w-full px-2 mt-5 justify-between  ">
        <View className="flex flex-row items-center gap-3   ">
          <View style={{transform: [{scale: 1.5}]}} className="pl-6">
            <CheckBox
              value={
                Object.values(userCart?.items!).flat().length ===
                Object.values(selectedItems).flat().length
              }
              onValueChange={async () => {
                const isAllSelected =
                  Object.values(userCart?.items!).flat().length ===
                  Object.values(selectedItems).flat().length; // if the number of cart items match the number of selected items
                // if yes, deselect all,
                // if no, select all
                if (isAllSelected) {
                  dispatch(handleDeSelectAllItems());
                } else {
                  handleSelectAll();
                }
              }}
              tintColors={{true: Colors.accent, false: '#999999'}}
            />
          </View>
          <Text className="text-xl">{t('selectAll')}</Text>
        </View>
        <View className="flex items-center flex-row  mr-3 gap-3 ">
          <Text className="text-xl font-medium text-gray-700 ">
            {t('total')}
          </Text>
          <Text className="text-2xl  font-bold " style={{color: Colors.accent}}>
            {getFormattedPrice(productSubTotal, 'discount', exChangeRate)}
          </Text>
        </View>
      </View>

      <UserCartList userCart={userCart!} />
      {/* The bottom view, total product price  */}
      {userCart && <UserCartBottomView userCart={userCart!} />}
    </View>
  );
};

export default UserCartPage;
