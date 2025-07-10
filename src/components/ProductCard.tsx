// components/ProductCard.tsx
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {FirestoreContext} from '../firestore/FirestoreContext';
import {Product} from '../types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {addNewCart} from '../utils/cartFunctions';
import toast from '../helpers/toast';
import {AppDispatch, RootState} from '../redux/store';
import FirestoreService from '../firestore/service';
import * as Styling from '../styles/global';
import {handleGetOriginalPrice} from '../utils/convertData';
import {useTranslation} from 'react-i18next';
import i18n from '../i18n/i18n';

type ProductCardProps = {
  item: Product;
  user: any;
};

const ProductCard = ({item}: ProductCardProps) => {
  const navigation = useNavigation<any>();
  // const [convertedPrice, setConvertedPrice] = useState<string>('');
  // const [originalPrice, setOriginalPrice] = useState<string>('');
  const exchangeRate = useSelector(
    (state: RootState) => state.exchangeRate.value,
  );
  const price = exchangeRate * item.price;
  const convertedPrice = useMemo(() => {
    return price.toLocaleString(i18n.language === 'vi' ? 'vi-VN' : 'en-US', {
      style: 'currency',
      currency: 'VND',
    });
  }, [exchangeRate, item.price]);

  const originalPrice = useMemo(() => {
    return handleGetOriginalPrice(price, item.discountPercentage);
  }, [exchangeRate, item.price]);

  // useEffect(() => {
  //   if (exchangeRate !== null) {
  //     const price =
  //       i18n.language === 'vi' ? exchangeRate * item.price : item.price;
  //     const originalPrice = handleGetOriginalPrice(
  //       price,
  //       item.discountPercentage,
  //     );
  //     const formatted = price.toLocaleString(
  //       i18n.language === 'vi' ? 'vi-VN' : 'en-US',
  //       {style: 'currency', currency: 'VND'},
  //     );
  //     setOriginalPrice(originalPrice);
  //     setConvertedPrice(formatted);
  //   }
  // }, [exchangeRate, item.price]);

  useEffect;
  const userCart = useSelector((state: RootState) => state.userCart.value);
  const {t} = useTranslation('productCard');
  const {user, firestore} = useContext(FirestoreContext);
  const dispatch = useDispatch();
  const handleToCart = async (
    item: Product,
    firestore: FirestoreService,
    dispatch: AppDispatch,
  ) => {
    await addNewCart(item, dispatch, userCart!);
  };

  return (
    <TouchableOpacity
      style={Styling.ComponentStyles.productCard}
      onPress={() =>
        navigation.navigate('ProductDetail', {
          product: item,
          exchangeRate: exchangeRate,
        })
      }>
      <Image
        source={{uri: item.thumbnail}}
        style={Styling.ComponentStyles.productCardImageSm}
        resizeMode="cover"
      />
      <View className=" mt-2 ">
        <Text numberOfLines={2} style={Styling.Typography.itemTitle}>
          {item.title}
        </Text>
      </View>
      <View className="mt-auto gap-2">
        <View className="flex-row items-center gap-2">
          <Text className=" mt-2 " style={Styling.Typography.itemPrice}>
            {convertedPrice}
          </Text>
          <Text
            className=" mt-2  "
            style={Styling.Typography.itemDiscountPrice}>
            {originalPrice}
          </Text>
        </View>
        <View style={Styling.ComponentStyles.deliveryDateText}>
          <Ionicons name="car-outline" size={20} />
          <Text className="font-bold text-gray-300">2-3 {t('days')}</Text>
        </View>
        <TouchableOpacity
          style={Styling.ComponentStyles.btnAddToCartSm}
          onPress={() => {
            if (user) {
              toast.cart({message: 'Added!', duration: 5000});
              handleToCart(item, firestore, dispatch);
            } else {
              navigation.navigate('ProfileTab', {reason: 'protected'});
            }
          }}>
          <Text style={Styling.ComponentStyles.btnAddToCartSmText}>
            {t('addToCart')}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
