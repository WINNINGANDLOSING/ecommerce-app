import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomStackParamList, ProfileStackParamList} from '../routes/AppStack';
import HeaderView from '../components/HeaderView';
import {useTranslation} from 'react-i18next';
import {ComponentStyles} from '../styles/components';
import {Colors} from '../styles/colors';
import MainView from '../components/subComponents/MainView';
import {Typography} from '../styles/typography';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getFormattedPrice} from '../utils/convertData';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {
  getFormattedDate,
  handleConvertFromTimestampToDate,
} from '../utils/timestamp';
import CustomButton from '../components/subComponents/CustomButton';
import ConfirmModal from '../components/ConfirmModal';
import {cancelOrder} from '../utils/orderFunctions';
import {BrandOrderType} from '../types';
import {CompositeScreenProps} from '@react-navigation/native';

type OrderDetailPageProp = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, 'OrderDetail'>,
  NativeStackScreenProps<BottomStackParamList>
>;

const OrderDetailPage = ({navigation, route}: OrderDetailPageProp) => {
  const additionalInfo = route.params.additionalInfo;
  const brandOrder = route.params.brandOrder;
  const from = route.params.from;
  const {t} = useTranslation('orderDetail');
  const dispatch = useDispatch();
  const exchangeRate = useSelector(
    (state: RootState) => state.exchangeRate.value,
  );

  const handleCancelOrder = async (
    orderId: string,
    brandOrder: BrandOrderType,
  ) => {
    try {
      // await cancelOrder(dispatch, orderId, brandOrder);
      // setIsShownCancelOrderModal(false);
      navigation.navigate('HomeTab');
    } catch (err) {
      console.log(err);
    }
  };

  const [isShownCancelOrderModal, setIsShownCancelOrderModal] = useState(false);
  // const formattedDate = useMemo(() => {
  //   const date = handleConvertFromTimestampToDate(order.createdAt);
  //   return getFormattedDate(date);
  // }, [order.createdAt]);
  return (
    <View className="flex flex-1">
      <HeaderView from={from} text={t('title')}></HeaderView>
      <ScrollView className="flex-1 mb-3" showsVerticalScrollIndicator={false}>
        <MainView isPadding={false}>
          <View
            className=""
            style={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              padding: 15,
              backgroundColor: Colors.accent,
              justifyContent: 'center',
            }}>
            <Text
              style={{fontWeight: 600, color: Colors.background, fontSize: 18}}>
              {t(brandOrder.orders[0].status)}
            </Text>
          </View>
          <View
            className=""
            style={{
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              padding: 15,
              gap: 5,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Ionicons name="cash-outline" size={20}></Ionicons>
            <Text style={Typography.base}>
              {t('paymentMethod')}&nbsp;
              {t(additionalInfo.paymentMethod)}
            </Text>
          </View>
        </MainView>

        <MainView style={{gap: 10}}>
          <Text style={Typography.bold}>{t('shippingAddress')}</Text>
          <View className="flex flex-row items-center gap-5">
            <Ionicons name="airplane-outline" size={20} />
            <View className="flex  flex-col  gap-2">
              <View className="flex flex-row gap-3  ">
                <Text>
                  {additionalInfo.shippingAddress?.receiverName || ''}
                </Text>
                <Text style={{color: Colors.muted}}>
                  (+84 {additionalInfo.shippingAddress?.phoneNumber.slice(1)})
                </Text>
              </View>
              <Text>{additionalInfo.shippingAddress?.address}</Text>
            </View>
          </View>
        </MainView>
        {brandOrder.orders.map((order, index) => (
          <MainView key={index} style={{gap: 10, paddingTop: 0}}>
            <Text style={Typography.bold}>{order.brand}</Text>
            <View className="flex flex-row  ">
              <Image
                source={{uri: order.product.thumbnail}}
                className="size-20 mr-5 border-[0.5px] rounded-xl border-gray-300"
              />
              <View className=" flex-1 gap-3">
                <Text style={Typography.itemTitle}>{order.product.title}</Text>
                <View className="flex flex-row items-center gap-2 justify-between">
                  <View className="flex flex-row items-center">
                    {order.product.tags.map((tag, index) => (
                      <Text key={index} style={{color: Colors.subdued}}>
                        {tag}
                        {index < order.product.tags.length - 1 ? ', ' : ''}
                      </Text>
                    ))}
                  </View>
                  <Text style={Typography.subCostTitle}>x{order.quantity}</Text>
                </View>
                <View className="flex flex-row gap-2 items-center ml-auto">
                  <Text style={Typography.itemDiscountPrice}>
                    {getFormattedPrice(
                      order.product.price,
                      'original',
                      exchangeRate,
                      order.product.discountPercentage,
                    )}
                  </Text>
                  <Text>
                    {getFormattedPrice(
                      order.product.price,
                      'discount',
                      exchangeRate,
                    )}
                  </Text>
                </View>
                <View className="ml-auto">
                  <Text className="font-semibold text-right">
                    {t('totalProduct')} ({order.quantity} {t('item')}):&nbsp;
                  </Text>
                  <Text className="text-right font-bold pr-2">
                    {getFormattedPrice(
                      order.product.price * order.quantity,
                      'discount',
                      exchangeRate,
                    )}
                  </Text>
                </View>
              </View>
            </View>
          </MainView>
        ))}
        <MainView style={{gap: 10}}>
          <Text style={Typography.bold}>{t('needHelp')}</Text>
          <View className="mt-2 flex flex-row justify-between border-b-[0.5px] pb-5 border-gray-400">
            <View className="flex flex-row gap-5">
              <Ionicons name="document-text-outline" size={25} />
              <Text style={Typography.base}>{t('policies')}</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} />
          </View>
          <View className="mt-2 flex flex-row justify-between ">
            <View className="flex flex-row gap-5">
              <Ionicons name="help-circle-outline" size={25} />
              <Text style={Typography.base}>{t('helpCenter')}</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} />
          </View>
        </MainView>

        <MainView style={{gap: 10}}>
          <Text style={Typography.bold}>{t('details')}</Text>
          <View className=" pb-5 gap-3 ">
            {/* <View className="flex flex-row justify-between">
              <Text>{t('orderId')}</Text>
              <Text>{mainOrder.orderId}</Text>
            </View> */}
            <View className="flex flex-row justify-between">
              <Text>{t('paymentMethod')}</Text>
              <Text>{t(additionalInfo.paymentMethod)}</Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text>{t('orderTime')}</Text>
              <Text>{additionalInfo.createdAt.toLocaleString()}</Text>
            </View>
          </View>
        </MainView>
      </ScrollView>
      <MainView style={{gap: 10}} isMargin={false}>
        <Text className="text-right text-xl pr-5" style={Typography.base}>
          {t('total')}:&nbsp;
          <Text
            className="text-xl"
            style={{color: Colors.accent, fontWeight: 'bold', fontSize: 20}}>
            {getFormattedPrice(brandOrder.brandSumPrice, 'discount', 1)}
          </Text>
        </Text>
        <CustomButton
          title={t('cancelOrder')}
          onPress={() => {
            setIsShownCancelOrderModal(true);
          }}
          style={{
            alignSelf: 'center',
            width: '95%',
            backgroundColor: Colors.primary,
          }}
          textStyle={{color: 'white', fontWeight: 'bold', fontSize: 17}}
        />
        <ConfirmModal
          onCancel={() => setIsShownCancelOrderModal(false)}
          onConfirm={() => {
            handleCancelOrder(additionalInfo.orderId, brandOrder);
          }}
          visible={isShownCancelOrderModal}
          title={t('DeleteMainMsg')}
          message={t('DeleteSecondMsg')}
        />
      </MainView>
    </View>
  );
};

export default OrderDetailPage;
