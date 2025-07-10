import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState, useTransition} from 'react';
import {AddToCartType} from '../types';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../routes/AppStack';
import {setProductSubTotal} from '../redux/slices/priceSlice';
import {Colors} from '../styles/global';
import {useTranslation} from 'react-i18next';
type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

const UserCartBottomView = ({userCart}: {userCart: AddToCartType}) => {
  const navigation = useNavigation<NavigationProp>();
  const [isSelectAll, setIsSelectAll] = useState(false);

  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.value,
  );

  useEffect(() => {
    if (userCart) {
      setIsSelectAll(
        Object.values(userCart.items).length === selectedItems.length,
      );
      dispatch(setProductSubTotal(selectedItems));
    }
  }, [userCart, selectedItems]);

  const dispatch = useDispatch();

  const {t} = useTranslation('cart');
  return (
    <View className="bg-white mt-auto rounded-t-md w-full h-24 shadow-l items-center justify-center">
      <TouchableOpacity
        className={` py-4 font-bold rounded-xl w-[90%]`}
        style={{
          backgroundColor:
            selectedItems.length > 0 ? Colors.primary : '#d1d5db', // gray-300
        }}
        onPress={() => navigation.navigate('OrderPage', {selectedItem: null})}
        disabled={selectedItems.length == 0}>
        <Text className="text-white text-center text-2xl font-semibold">
          {t('checkout')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserCartBottomView;

const styles = StyleSheet.create({});
