import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {AdditionalOrderInfoType, OrderType} from '../types';
import {
  getFormattedDate,
  handleConvertFromTimestampToDate,
} from '../utils/timestamp';
import {Colors} from '../styles/colors';
import {ComponentStyles, Typography} from '../styles/global';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import i18n from '../i18n/i18n';
import {getFormattedPrice, handleGetOriginalPrice} from '../utils/convertData';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ProfileStackParamList} from '../routes/AppStack';
import MainView from './subComponents/MainView';
import Ionicons from 'react-native-vector-icons/Ionicons';
type NavigationProp = NativeStackNavigationProp<ProfileStackParamList>;

const UserOrderItem = ({order, index}: {order: OrderType; index: number}) => {
  // const [convertedPrice, setConvertedPrice] = useState<string>('');
  // const [originalPrice, setOriginalPrice] = useState<string>('');
  const exChangeRate = useSelector(
    (state: RootState) => state.exchangeRate.value,
  );
  const {t} = useTranslation('userOrder');
  const additionalInfo: AdditionalOrderInfoType = {
    orderId: order.orderId,
    createdAt: order.createdAt,
    paymentMethod: order.paymentMethod,
    shippingAddress: order.shippingAddress!,
  };
  // const getFormattedPrice = (
  //   raw_price: number,
  //   type: 'discount' | 'original',
  //   discountRate?: number,
  // ) => {
  //   const price = i18n.language === 'vi' ? exChangeRate * raw_price : raw_price;
  //   if (type === 'discount') {
  //     const formatted = price.toLocaleString(
  //       i18n.language === 'vi' ? 'vi-VN' : 'en-US',
  //       {style: 'currency', currency: 'VND'},
  //     );
  //     return formatted;
  //   }
  //   const originalPrice = handleGetOriginalPrice(price, discountRate!);
  //   return originalPrice;
  // };

  // const [formattedDate, setFormattedDate] = useState<string>('');
  // useEffect(() => {
  //   const date = handleConvertFromTimestampToDate(item.createdAt);

  //   const time = date.toLocaleTimeString('vi-VN', {
  //     hour: '2-digit',
  //     minute: '2-digit',
  //   });

  //   const day = date.toLocaleDateString('vi-VN', {
  //     day: '2-digit',
  //     month: '2-digit',
  //     year: '2-digit',
  //   });
  //   setFormattedDate(`${day} - ${time}`);
  // }, [item.createdAt]);
  const navigation = useNavigation<NavigationProp>();
  const formattedDate = useMemo(() => {
    const date = handleConvertFromTimestampToDate(order.createdAt);
    return getFormattedDate(date);
  }, [order.createdAt]);
  const defaultVisibleShowMore = Object.fromEntries(
    order.brandOrders.map(order => [order.brand, false]),
  );
  const [isVisibleShowMore, setIsVisibleShowMore] = useState(
    defaultVisibleShowMore,
  );

  const [isShownOrders, setIsShownOrders] = useState(true);

  return (
    <View>
      {/* <MainView style={{flexDirection: 'row', alignItems: 'center'}}>
        <View>
          <View className="flex flex-row items-center  w-full justify-between">
            <Text className="text-lg font-semibold ">
              Order #{order.orderId}
            </Text>
          </View>
          <Text>
            {t('date')}: &nbsp;
            {order.createdAt.toLocaleString()}
          </Text>
        </View>
        <Ionicons
          name={isShownOrders ? 'caret-up-outline' : 'caret-down-outline'}
          size={20}
          onPress={() => setIsShownOrders(!isShownOrders)}
        />
      </MainView> */}
      {isShownOrders &&
        order.brandOrders.map((brand, index) => (
          <MainView
            isTouchable={true}
            onPress={() =>
              navigation.navigate('OrderDetail', {
                additionalInfo: additionalInfo,
                brandOrder: brand,
                from: 'UserOrder',
              })
            }
            key={index}
            style={{gap: 10}}>
            <View className="flex-row items-center flex justify-between">
              <Text style={Typography.brandTitle}>{brand.brand}</Text>
              <Text>{t(order.status)}</Text>
            </View>
            <View>
              {brand.orders
                .slice(
                  0,
                  isVisibleShowMore[brand.brand] ? brand.orders.length : 1,
                )
                .map((order, ind) => (
                  <View key={ind}>
                    <View className="bg-white p-4 gap-3 rounded-xl shadow-sm border border-gray-200 mb-3 ">
                      {/* <View className="flex flex-row items-center justify-between">
                    <Text
                      style={Typography.itemTitle}
                      className={`text-lg font-semibold mb-2 ${
                        order.status === 'pending'
                          ? 'text-gray-500'
                          : order.status === 'processing'
                          ? 'text-orange-400'
                          : order.status === 'in_delivery'
                          ? 'text-yellow-300'
                          : order.status === 'cancelled'
                          ? 'text-red-500'
                          : 'text-green-500'
                      }`}>
                      {t(order.status)}
                    </Text>
                                    </View> */}
                      <View className="flex flex-row  ">
                        <Image
                          source={{uri: order.product.thumbnail}}
                          className="size-20 mr-5  rounded-xl "
                        />
                        <View className=" flex-1 gap-3">
                          <Text style={Typography.itemTitle}>
                            {order.product.title}
                          </Text>
                          <View className="flex flex-row items-center gap-2 justify-between">
                            <View className="flex flex-row items-center">
                              {order.product.tags.map((tag, index) => (
                                <Text
                                  key={index}
                                  style={{color: Colors.subdued}}>
                                  {tag}
                                  {index < order.product.tags.length - 1
                                    ? ', '
                                    : ''}
                                </Text>
                              ))}
                            </View>
                            <Text style={Typography.subCostTitle}>
                              x{order.quantity}
                            </Text>
                          </View>
                          <View className="flex flex-row gap-2 items-center ml-auto">
                            <Text style={Typography.itemDiscountPrice}>
                              {getFormattedPrice(
                                order.product.price,
                                'original',
                                exChangeRate,
                                order.product.discountPercentage,
                              )}
                            </Text>
                            <Text>
                              {getFormattedPrice(
                                order.product.price,
                                'discount',
                                exChangeRate,
                              )}
                            </Text>
                          </View>
                          <View className="ml-auto  mt-3 ">
                            <Text className="font-semibold">
                              {t('totalProduct')} ({order.quantity} {t('item')}
                              ):&nbsp;
                            </Text>
                            <Text className="text-right">
                              {getFormattedPrice(
                                order.product.price * order.quantity,
                                'discount',
                                exChangeRate,
                              )}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    {ind === 0 &&
                      brand.orders.length > 1 &&
                      !isVisibleShowMore[brand.brand] && (
                        <TouchableOpacity
                          onPress={() =>
                            setIsVisibleShowMore(prev => ({
                              ...prev,
                              [brand.brand]: true,
                            }))
                          }>
                          <Text style={Typography.base} className="text-center">
                            Show More...
                          </Text>
                        </TouchableOpacity>
                      )}
                    {ind === brand.orders.length - 1 &&
                      brand.orders.length > 1 &&
                      isVisibleShowMore[brand.brand] && (
                        <TouchableOpacity
                          onPress={() =>
                            setIsVisibleShowMore(prev => ({
                              ...prev,
                              [brand.brand]: false,
                            }))
                          }>
                          <Text style={Typography.base} className="text-center">
                            Hide
                          </Text>
                        </TouchableOpacity>
                      )}
                  </View>
                ))}
            </View>
          </MainView>
        ))}
      {/* <View
        key={item.orderId}
        className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-3 ">
        <View className="flex-row items-center justify-between"></View>
        <View className="flex flex-row items-center"></View>
        <View className="mb-1">
          <Text className="text-sm text-gray-500">Placed on:</Text>
          <Text className="text-sm">
            {handleConvertFromTimestampToDate(item.createdAt).toString()}
          </Text>
        </View>
        <View className="mb-1">
          <Text className="text-sm text-gray-500">Shipping Method:</Text>
          <Text className="text-sm capitalize">
            {Object.values(item.shippingMethods).join(', ')}
          </Text>
        </View>
        <View className="mb-1">
          <Text className="text-sm text-gray-500">Payment:</Text>
          <Text className="text-sm uppercase">{item.paymentMethod}</Text>
        </View>
        <View className="flex flex-row justify-between mt-2">
          <Text className="font-medium">Total:</Text>
          <Text className="font-medium text-green-600">
            ${item.sumPrice.toFixed(2)}
          </Text>
        </View>
      </View> */}
    </View>
  );
};

export default UserOrderItem;

const styles = StyleSheet.create({});
