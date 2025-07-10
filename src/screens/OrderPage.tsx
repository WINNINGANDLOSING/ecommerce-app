import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {CartStackParamList} from '../routes/AppStack';
import {
  Alert,
  Button,
  FlatList,
  Image,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FirestoreContext} from '../firestore/FirestoreContext';
import {BrandOrderType, ItemType, OrderType, SingleOrderType} from '../types';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {setShippingSubTotal} from '../redux/slices/priceSlice';

import HeaderView from '../components/HeaderView';
import {Colors} from '../styles/colors';
import {useTranslation} from 'react-i18next';
import {getFormattedPrice, handleGetOriginalPrice} from '../utils/convertData';
import i18n from '../i18n/i18n';
import {Typography} from '../styles/typography';
import {
  getFormattedDate,
  handleConvertFromTimestampToDate,
} from '../utils/timestamp';
import {addOrder} from '../redux/slices/userOrderSlice';
import {addNewOrder} from '../utils/orderFunctions';
import {getCurrentUser} from '../utils/userFunctions';

type OrderPageScreenProps = NativeStackScreenProps<
  CartStackParamList,
  'OrderPage'
>;
const OrderPage = ({navigation, route}: OrderPageScreenProps) => {
  const {t} = useTranslation('order');
  const isVi = i18n.language === 'vi';

  const addressList = useSelector(
    (state: RootState) => state.shippingAddressList.value,
  );

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const isSelectedItems = useSelector(
    (state: RootState) => state.selectedItems.value.length > 0,
  );

  const selectedItems = isSelectedItems
    ? useSelector((state: RootState) => state.selectedItems.value)
    : [route.params.selectedItem!];
  // dynamic shipping methods for each cart item
  const defaultShippingMethods = Object.fromEntries(
    selectedItems.map(item => [item.product.brand, 'regular']),
  );
  const [selectedShippingMethods, setSelectedShippingMethods] = useState(
    defaultShippingMethods,
  );

  const productSubTotal = useSelector(
    (state: RootState) => state.price.productSubTotal,
  );

  const shippingSubtotal = useSelector(
    (state: RootState) => state.price.shippingSubTotal,
  );

  const exChangeRate = useSelector(
    (state: RootState) => state.exchangeRate.value,
  );

  const dispatch = useDispatch();
  const {firestore, selectedAddress} = useContext(FirestoreContext);

  useEffect(() => {
    console.log('seclted items', selectedItems);
  }, [selectedItems]);
  // selectedItems data structure is still ItemType[]
  // while userCart has changed
  // userCart data structure

  const itemsBySection = useMemo(() => {
    return Object.values(
      selectedItems.reduce((acc, item) => {
        const brand = item.product.brand || 'Unknown';

        if (!acc[brand]) {
          acc[brand] = {
            title: brand,
            data: [],
            total: 0,
            weight: 0,
            shippingCost: 0,
            instantShippingCost: 0,
          };
        }
        const price = item.product.price;
        const quantity = item.quantity;
        const weight = item.product.weight;
        const shippingMethod = (selectedShippingMethods ?? {})[brand];
        const instantShippingCost = weight * 0.5 + 2;

        const shippingCost =
          shippingMethod === 'instant' ? instantShippingCost : 0;
        acc[brand].data.push(item);
        acc[brand].shippingCost = shippingCost;
        acc[brand].instantShippingCost = instantShippingCost;
        acc[brand].total += price * quantity + shippingCost;
        return acc;
      }, {} as Record<string, {title: string; data: ItemType[]; total: number; weight: number; shippingCost: number; instantShippingCost: number}>),
    );
  }, [selectedItems, selectedShippingMethods]);

  const isReadyToOrder = useMemo(() => {
    return selectedAddress !== null && selectedPaymentMethod;
  }, [selectedShippingMethods, selectedPaymentMethod]);
  /* 
  {
   1: 'regular',
   2: 'instant',
   3: 'regular'
   }
  */

  useEffect(() => {
    console.log('in order page');
    console.log(selectedShippingMethods);

    console.log(Object.keys(selectedShippingMethods).length);
    console.log(selectedItems.length);
    console.log(addressList);
    console.log(selectedPaymentMethod);
  }, [selectedShippingMethods, selectedPaymentMethod]);
  useEffect(() => {
    const total = selectedItems.reduce((acc, item) => {
      const method = selectedShippingMethods[item.product.brand!];
      if (method === 'instant') {
        return acc + item.product.weight * 0.5 + 2;
      }
      return acc + 0;
    }, 0);

    dispatch(setShippingSubTotal(total));
  }, [selectedShippingMethods]);

  const sumCost = useMemo(() => {
    return shippingSubtotal + productSubTotal;
  }, [shippingSubtotal]);

  const handleSelectShippingMethods = (
    brand: string,
    type: 'regular' | 'instant',
  ) => {
    setSelectedShippingMethods((prev: any) => ({
      ...prev,
      [brand]: type,
    }));
  };

  /* 
export type OrderType = {
  orderId: string;
  userId: string;

  createdAt: Date;
  shippingAddress: ShippingAddressType;
  paymentMethod: 'cod' | 'cards' | 'momo';
  items: {
    productId: number;
    quantity: number;
    price: number;
  }[];
  shippingPrice: number;
  productPrice: number;
  sumPrice: number;
};
*/

  const handleUploadNewOrder = async () => {
    try {
      const user = await getCurrentUser();
      const userId = user?.userAuthData.uid;
      const brandOrders: {[brand: string]: BrandOrderType} = {};

      selectedItems.forEach((item, index) => {
        const productPrice = item.product.price * exChangeRate;

        const singleOrderItem = {
          createdAt: new Date().toLocaleDateString(),
          updatedAt: new Date().toLocaleDateString(),

          quantity: item.quantity,
          productId: item.productId,
          product: item.product,
          singleOrderProductPrice: productPrice, // price of all products belong to one brand only

          status: 'pending',
        } as SingleOrderType;

        if (!brandOrders[item.product.brand]) {
          brandOrders[item.product.brand] = {
            brand: item.product.brand,
            brandProductsPrice: 0,
            brandShippingPrice: 0,
            brandSumPrice: 0,
            orders: [],
            shippingMethod: '',
          };
        }

        const price = isVi
          ? item.product.price * item.quantity * exChangeRate
          : item.product.price * item.quantity;

        const shippingCost =
          selectedShippingMethods[item.productId] === 'instant'
            ? isVi
              ? (item.product.weight * 0.5 + 2) * exChangeRate
              : item.product.weight * 0.5 + 2
            : 0;
        brandOrders[item.product.brand].brand = item.product.brand;
        brandOrders[item.product.brand].orders.push(singleOrderItem);
        brandOrders[item.product.brand].brandProductsPrice += price;
        brandOrders[item.product.brand].brandShippingPrice += shippingCost; // shipping price of this brand
        brandOrders[item.product.brand].brandSumPrice += price + shippingCost; // price of all products of this brand
        // don't use map here since map return a whole array of the same length, not a single item
        brandOrders[item.product.brand].shippingMethod =
          selectedShippingMethods[item.product.brand];
      });

      // await addNewOrder(dispatch, orderItem);
      console.log('brand order', brandOrders);

      const newOrder: OrderType = {
        userId: userId!,
        sumCost: isVi ? sumCost * exChangeRate : sumCost,
        createdAt: getFormattedDate(new Date()),
        updatedAt: getFormattedDate(new Date()),
        orderId: '',
        brandOrders: Object.values(brandOrders),
        paymentMethod: selectedPaymentMethod,
        shippingAddress: selectedAddress
          ? selectedAddress!
          : addressList.find(address => address.isDefault)!,
        status: 'pending',
      };
      console.log('new order', newOrder);
      await addNewOrder(dispatch, newOrder);
      navigation.navigate('OrderSuccessPage');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View className="flex flex-col h-full flex-1 ">
      <HeaderView from={'Cart'} text={t('title')} />
      {/* User Address */}

      {/* id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
  images: string[]; */}

      {/* List of items */}
      <View className="flex flex-1 ">
        <SectionList
          sections={itemsBySection}
          keyExtractor={item => item.productId.toString()}
          contentContainerStyle={{}}
          className=" shadow-sm flex flex-col "
          renderSectionHeader={({section: {title}}) => (
            <View className="px-5 bg-white  mt-5 rounded-t-lg p-3">
              <Text style={Typography.bold}>{title}</Text>
            </View>
          )}
          ListHeaderComponent={
            <View>
              {selectedAddress && (
                <View className="  bg-red- rounded-lg h-20  justify-center flex">
                  <TouchableOpacity
                    className="flex flex-col rounded-lg p-3 bg-white"
                    onPress={() =>
                      navigation.navigate('ShippingAddressPage', {
                        from: 'OrderPage',
                      })
                    }>
                    <View className="flex flex-row  rounded-lg  items-center  gap-3">
                      <Ionicons
                        name="location-outline"
                        color={'#ef4444'}
                        size={20}
                      />
                      <View className="flex flex-col gap-2">
                        <View className="flex flex-row items-center">
                          <Text className="font-bold  text-lg">
                            {selectedAddress.receiverName}&nbsp;
                          </Text>
                          <Text className="text-gray-500 text-sm">
                            (+84&nbsp;
                            {selectedAddress.phoneNumber.startsWith('0')
                              ? selectedAddress.phoneNumber.slice(1)
                              : selectedAddress.phoneNumber}
                            )
                          </Text>
                        </View>
                        <Text className="text-gray-600 text-sm">
                          {selectedAddress.address}
                        </Text>
                      </View>
                      <Ionicons
                        className="ml-auto"
                        name="chevron-forward-outline"
                        size={20}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              {!selectedAddress && (
                <View className=" bg-white  mt-4  px-3 rounded-xl  h-20  justify-center flex">
                  {addressList.length! > 0 ? (
                    addressList.map(
                      (address, index) =>
                        address.isDefault && (
                          <TouchableOpacity
                            key={index}
                            className="flex flex-col p-3 py"
                            onPress={() =>
                              navigation.navigate('ShippingAddressPage', {
                                from: 'OrderPage',
                              })
                            }>
                            <View className="flex flex-row items-center ">
                              <View className="flex flex-col ">
                                <View className="flex flex-row items-center">
                                  <Ionicons
                                    name="location"
                                    color={'#ef4444'}
                                    size={23}
                                  />
                                  <Text className=" ml-3 font-bold text-xl">
                                    {address.receiverName}&nbsp;
                                  </Text>

                                  <Text className="text-gray-500 text-sm">
                                    (+84&nbsp;
                                    {address.phoneNumber.startsWith('0')
                                      ? address.phoneNumber.slice(1)
                                      : address.phoneNumber}
                                    )
                                  </Text>
                                </View>
                                <Text className="text-gray-600 mt-1 ml-9 text-sm">
                                  {address.address}
                                </Text>
                              </View>
                              <Ionicons
                                className="ml-auto"
                                name="chevron-forward-outline"
                                size={20}
                              />
                            </View>
                          </TouchableOpacity>
                        ),
                    )
                  ) : (
                    <TouchableOpacity
                      className="flex items-center w-full rounded-lg justify-between flex-row"
                      onPress={() => {
                        navigation.navigate('ShippingAddressPage', {
                          from: 'OrderPage',
                        });
                      }}>
                      <Text>No Shipping Address Found</Text>
                      <Ionicons name="chevron-forward-outline" size={20} />
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          }
          renderItem={({item, section}) => (
            <View className="gap-3 bg-white p-3 rounded-xl ">
              <View className="flex flex-row items-center w-full gap-3 border-[0.5px] border-gray-200 rounded-xl ">
                <Image
                  source={{uri: item.product.thumbnail}}
                  className="size-24 rounded-md mr-3"
                  resizeMode="cover"
                />
                <View className="flex flex-col  flex-1">
                  <Text
                    numberOfLines={2}
                    className="text-base font-semibold text-gray-800">
                    {item.product.title}
                  </Text>
                  <View className="flex items-center flex-row justify-between">
                    <Text>
                      {getFormattedPrice(
                        item.product.price,
                        'discount',
                        exChangeRate,
                      )}
                    </Text>
                    <Text className="text-sm text-gray-500 mt-1 mr-3">
                      x{item.quantity}
                    </Text>
                  </View>
                </View>
              </View>

              {/* (item.product.weight * 0.5 + 2) */}
            </View>
          )}
          renderSectionFooter={({section}) => (
            <View className="gap-3 pt-5 flex-col justify-between  bg-white pr-5 pl-5 pb-5 rounded-xl ">
              <View className="">
                <Text className="font-semibold mt-2 pl-2">
                  {t('shippingOptions')}
                </Text>
                <View className="flex flex-col gap-3 mt-4">
                  <TouchableOpacity
                    className={`gap-3  rounded-xl border-[1px] border-gray-200 p-3 `}
                    onPress={() =>
                      handleSelectShippingMethods(section.title, 'regular')
                    }
                    style={{
                      backgroundColor:
                        selectedShippingMethods[section.title] === 'regular'
                          ? '#dcfce7'
                          : 'white',
                    }}>
                    <View className="flex flex-row justify-between">
                      <Text className="font-semibold text-lg">
                        {t('regularShipping')}
                      </Text>
                      <Text className="">{t('free')}</Text>
                    </View>
                    <Text> {t('regularShippingDate')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={`border-[1px] gap-3 rounded-xl  border-gray-200 p-3`}
                    style={{
                      backgroundColor:
                        selectedShippingMethods[section.title] === 'instant'
                          ? '#dcfce7'
                          : 'white',
                    }}
                    onPress={() =>
                      handleSelectShippingMethods(section.title, 'instant')
                    }>
                    <View className="flex flex-row justify-between">
                      <Text className="font-semibold text-lg ">
                        {t('instantShipping')}
                      </Text>
                      <Text className="">
                        {getFormattedPrice(
                          section.instantShippingCost,
                          'discount',
                          exChangeRate,
                        )}
                      </Text>
                    </View>
                    <Text> {t('instantShippingDate')}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View className="flex flex-row justify-between pr-1 pl-1 mt-2">
                <Text style={Typography.bold}>{t('total')}</Text>
                <Text style={Typography.itemUserCartPrice}>
                  {getFormattedPrice(section.total, 'discount', exChangeRate)}
                </Text>
              </View>
            </View>
          )}
          ListFooterComponent={
            <View>
              {/* Payment Method */}
              <View className="gap-3 bg-white p-3 rounded-xl mt-4 pb-5 ">
                <Text className="font-semibold text-lg">
                  {t('paymentMethod')}
                </Text>
                <TouchableOpacity
                  className={`flex items-center flex-row   border-gray-400  rounded-xl p-3  pb-5`}
                  onPress={() => setSelectedPaymentMethod('cod')}>
                  <Ionicons
                    name="cash"
                    className="mr-3 text-gray-500"
                    size={20}
                    color={'#22c55e'}
                  />
                  <Text>COD ( {t('cod')}) </Text>
                  {selectedPaymentMethod === 'cod' && (
                    <Ionicons
                      className="ml-auto"
                      color="#22c55e"
                      name="checkmark-circle"
                      size={20}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  className={`flex items-center flex-row  border-gray-400  rounded-xl  pb-3 `}
                  onPress={() => setSelectedPaymentMethod('momo')}>
                  <Image
                    source={require('../../assets/icons/momo.png')}
                    resizeMode="cover"
                    className="size-10 mr-1 ml-1 self-center"
                  />
                  <Text>Momo </Text>
                  {selectedPaymentMethod === 'momo' && (
                    <Ionicons
                      className="ml-auto"
                      color="#22c55e"
                      name="checkmark-circle"
                      size={20}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  className={`flex items-center flex-row  border-gray-400  rounded-xl p-3 pb-5`}
                  onPress={() => setSelectedPaymentMethod('cards')}>
                  <Ionicons
                    name="card"
                    className="mr-3"
                    size={20}
                    color={'#60a5fa'}
                  />
                  <Text> {t('onlineBankings')}</Text>
                  {selectedPaymentMethod === 'cards' && (
                    <Ionicons
                      className="ml-auto"
                      color="#22c55e"
                      name="checkmark-circle"
                      size={20}
                    />
                  )}
                </TouchableOpacity>
              </View>

              {/* Payment Detail */}
              <View className=" bg-white mb-10 p-3 rounded-xl mt-4 pb-5">
                <Text className="font-semibold text-lg">
                  {t('paymentDetails')}
                </Text>
                <View className="flex flex-col gap-5 mt-5   pb-5 ">
                  <View className="flex items-center flex-row    ">
                    <Ionicons
                      name="bag-remove-outline"
                      className="mr-3"
                      size={20}
                      color="#f97316"
                    />
                    <View className="flex  flex-1 items-center flex-row justify-between">
                      <Text>{t('productSubtotal')} </Text>
                      <Text>
                        {getFormattedPrice(
                          productSubTotal,
                          'discount',
                          exChangeRate,
                        )}
                      </Text>
                    </View>
                  </View>
                  <View className="flex items-center flex-row    ">
                    <Ionicons
                      name="boat-outline"
                      className="mr-3"
                      size={20}
                      color="#6366f1"
                    />
                    <View className="flex  flex-1 items-center flex-row justify-between">
                      <Text>{t('shippingSubtotal')} </Text>
                      <Text>
                        {getFormattedPrice(
                          shippingSubtotal,
                          'discount',
                          exChangeRate,
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          }></SectionList>
      </View>
      <View className="mt-auto flex-row justify-between  border-t-lg   bg-white p-3 ">
        <View className="flex flex-row items-center  mr-5">
          <Text
            className="text-lg mr-3 font-bold"
            style={{color: Colors.muted}}>
            {t('total')}:
          </Text>
          {Object.keys(selectedShippingMethods).length ===
            selectedItems.length && (
            <Text
              className="font-bold text-3xl "
              style={{color: Colors.accent}}>
              {getFormattedPrice(sumCost, 'discount', exChangeRate, 0, false)}
            </Text>
          )}
        </View>
        <TouchableOpacity
          className={`${
            isReadyToOrder ? `` : 'bg-gray-400'
          } w-[35%] flex items-center rounded-lg py-3`}
          style={{backgroundColor: isReadyToOrder ? Colors.primary : 'gray'}}
          disabled={!isReadyToOrder && !addressList && !selectedPaymentMethod}
          onPress={handleUploadNewOrder}>
          <Text className="text-white font-semibold">{t('placeOrder')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderPage;
