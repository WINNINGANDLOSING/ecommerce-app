import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {AdditionalOrderInfoType, NotificationType, OrderType} from '../types';
import MainView from './subComponents/MainView';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NotificationCenterStackParamList} from '../routes/AppStack';
import {useTranslation} from 'react-i18next';
import {Typography} from '../styles/typography';
import {getFormattedDate} from '../utils/timestamp';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Notificaiton = NativeStackNavigationProp<NotificationCenterStackParamList>;
const NotificationCenterItems = ({notif}: {notif: NotificationType}) => {
  const navigation = useNavigation<Notificaiton>();
  const additionalInfo: AdditionalOrderInfoType = {
    orderId: notif.metadata?.orderId!,
    createdAt: notif.metadata?.createdAt!,
    paymentMethod: notif.metadata?.paymentMethod!,
    shippingAddress: notif.metadata?.shippingAddress!,
  };
  const {t} = useTranslation('notificationCenter');
  const [isShownAllOrders, setIsShownAllOrders] = useState(false);
  const getStatusMessage = (status: string, productName: string) => {
    return t(`${status}_text`, {productName: productName});
  };
  /* 

export type NotificationType = {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: 'order_update' | 'promotion' | 'reminder';
  metadata?: {
    brandOrder: BrandOrderType;
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
  createdAt: Timestamp | Date | string;
};


  type BrandOrderType = {
    brand: string;
    orders: SingleOrderType[];
    brandShippingPrice: number;
    brandProductsPrice: number;
    brandSumPrice: number;
    shippingMethod: string;
}
  /*/
  return (
    <View className="py-1">
      <MainView
        isTouchable={true}
        style={{
          gap: 12,
          minHeight: 180,
          alignItems: 'normal',
          position: 'relative',
        }}
        isMargin={false}
        isPadding={true}
        onPress={() =>
          navigation.navigate('OrderDetail', {
            from: 'NotificationCenter',
            brandOrder: notif.metadata?.brandOrder!,
            additionalInfo: additionalInfo,
          })
        }>
        {notif.metadata?.brandOrder?.orders?.length! > 1 &&
          (!isShownAllOrders ? (
            <Ionicons
              onPress={() => setIsShownAllOrders(true)}
              className="absolute bottom-1 left-1/2"
              name="caret-down-outline"
              size={20}
            />
          ) : (
            <Ionicons
              onPress={() => setIsShownAllOrders(false)}
              className="absolute bottom-1 left-1/2"
              name="caret-up-outline"
              size={20}
            />
          ))}
        <View className="flex flex-row justify-between">
          <Text style={Typography.bold}> {notif?.metadata?.brand}</Text>
          <Text style={Typography.semiBold}>{t(notif.metadata?.status!)}</Text>
        </View>
        {(isShownAllOrders
          ? notif?.metadata?.brandOrder?.orders!
          : notif?.metadata?.brandOrder?.orders.slice(0, 1)!
        ).map((order, index) => (
          <View
            key={index}
            className={`gap-3 py-5 flex flex-1 rounded-lg  pb-3 flex-row `}>
            <Image
              source={{uri: order.product.thumbnail}}
              className="size-20"></Image>
            <View className="flex flex-col gap-2  flex-1">
              <Text>{getStatusMessage(order.status, order.product.title)}</Text>
              <Text style={Typography.semiBold}>
                {t('date')}
                {notif.createdAt.toString()}
              </Text>
            </View>
          </View>
        ))}
      </MainView>
      {/* {notif?.metadata?.brandOrder..map((brand, ind) => (
        <MainView
          isTouchable={true}
          style={{minHeight: 120}}
          isMargin={false}
          isPadding={false}
          key={ind}>
          <View>
            {brand.orders.map((brandOrder, index) => (
              <Pressable
                className=" flex-1 h-full min-h-[120px]  "
                key={index}
                onPress={() =>
                  navigation.navigate('OrderDetail', {
                    mainOrder: order,
                    brandOrder: brand,
                    from: 'NotificationCenter',
                  })
                }
                style={{
                  flexDirection: 'row',

                  gap: 10,
                }}>
                <Image
                  source={{uri: brandOrder.product.thumbnail}}
                  className="size-16 rounded-md self-center  "
                />
                <View className="gap-1 py-5  pr-10 w-[70%] ">
                  <Text style={Typography.semiBold}>{t(order.status)}</Text>

                  <Text style={Typography.smallGrey}>
                    {getStatusMessage(order.status, order.orderId)}
                  </Text>
                  <Text className="text-xs text-gray-400 mt-auto">
                    {order.createdAt.toString()}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </MainView>
      ))} */}
    </View>
  );
};

export default NotificationCenterItems;
