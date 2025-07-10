import {
  Alert,
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {FirestoreContext} from '../firestore/FirestoreContext';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {CartStackParamList} from '../routes/AppStack';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  AddToCartType,
  ItemType,
  NewAddressInputType,
  OrderType,
  Product,
  ShippingAddressType,
  UserInfo,
} from '../types';
import CheckBox from '@react-native-community/checkbox';
import {useFocusEffect} from '@react-navigation/native';
import {setReadable} from 'react-native-fs';
import {
  addNewAddress,
  getCurrentAddressList,
} from '../utils/addressListFunctions';
import {useTranslation} from 'react-i18next';
import HeaderView from '../components/HeaderView';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import CustomButton from '../components/subComponents/CustomButton';
import {Colors} from '../styles/colors';
import MainView from '../components/subComponents/MainView';
import ToggleButton from '../components/subComponents/ToggleButton';

type ShippingAddressListPageProp = NativeStackScreenProps<
  CartStackParamList,
  'AddNewShippingAddressPage'
>;
// search queries
const AddNewShippingAddressPage = ({
  navigation,
  route,
}: ShippingAddressListPageProp) => {
  const from = route.params.from;
  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const addressList = useSelector(
    (state: RootState) => state.shippingAddressList.value,
  );
  const [isDefaultSet, setIsDefaultSet] = useState(addressList.length === 0);
  const [errors, setErrors] = useState<NewAddressInputType>({});
  const {t} = useTranslation('addressList');

  const validation = () => {
    const newErrors: typeof errors = {};
    if (!name) {
      newErrors.name = 'Full Name Is Missing';
    } //    return /^[a-zA-Z0-9_]{3,20}$/.test(username);
    else if (!/^[a-zA-Z\s]+$/.test(name)) {
      newErrors.name =
        'Full Name has invalid format. Only normal characters are accepted.';
    }
    if (!phoneNum) {
      newErrors.phoneNum = 'Phone Number Is Missing';
    } //    return /^[a-zA-Z0-9_]{3,20}$/.test(username);
    // 	The input must consist of one or more digits, no letters allowed
    else if (!/^[0-9]{9,10}$/.test(phoneNum.toString())) {
      newErrors.phoneNum = 'Invalid Phone Number.';
    }
    if (!addressDetail) {
      newErrors.detailInfo = 'Address Detail Is Missing';
    } //    return /^[a-zA-Z0-9_]{3,20}$/.test(username);
    else if (/^[a-zA-Z0-9\s,.-]+$/.test(addressDetail)) {
      newErrors.detailInfo =
        'Address Detail has invalid format. Only normal characters and numbers are accepted.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const {setSelectedAddress} = useContext(FirestoreContext);

  const [submitting, setSubmitting] = useState(false);
  const [addressType, setAddressType] = useState('');

  const handleAddNewAddress = async () => {
    if (submitting) return;
    if (!validation()) return;

    setSubmitting(true);

    const newAddress = {
      id: Date.now().toString(),
      receiverName: name,
      phoneNumber: phoneNum,
      address: addressDetail,
      type: addressType,
      isDefault: addressList.length > 0 ? isDefaultSet : true,
    } as ShippingAddressType;

    const response = await addNewAddress(newAddress, setSelectedAddress);

    setSubmitting(false);

    navigation.navigate('OrderPage', {selectedItem: null});
  };

  return (
    <View className="flex  w-full  flex-1 flex-col">
      <HeaderView from={'ShippingAddressPage'} text={t('subTitle')} />
      <View className=" mt-3  rounded-lg mx-3 justify-center flex">
        <MainView>
          <View className="flex flex-col mb-5">
            <TextInput
              id="name"
              placeholder={t('fullName')}
              value={name}
              onChangeText={name => setName(name)}
              className="border-[0.5px]   border-b-gray-400 border-t-0 border-l-0 border-r-0 mx-2"
            />
            {errors.name && (
              <Text className="text-red-500 mt-2 text-xs pl-3">
                {errors.name}
              </Text>
            )}
          </View>
          <View className="flex flex-col mb-5 mt-5">
            <TextInput
              id="phoneNum"
              keyboardType="numeric"
              placeholder={t('phoneNumber')}
              defaultValue=""
              value={phoneNum.toString()}
              onChangeText={phoneNum => setPhoneNum(phoneNum)}
              className="border-[0.5px]    border-b-gray-400 border-t-0 border-l-0 border-r-0 mx-2"
            />
            {errors.phoneNum && (
              <Text className="text-red-500 text-xs mt-2 pl-3">
                {errors.phoneNum}
              </Text>
            )}
          </View>
          <View className="flex flex-col mb-5 mt-5">
            <TextInput
              id="addressDetail"
              placeholder={t('streetName')}
              value={addressDetail}
              onChangeText={addressDetail => setAddressDetail(addressDetail)}
              className="border-[0.5px]   border-b-gray-400 border-t-0 border-l-0 border-r-0 mx-2"
            />
            {errors.detailInfo && (
              <Text className="text-red-500  mt-2 text-xs pl-3">
                {errors.detailInfo}
              </Text>
            )}
          </View>
        </MainView>
        <MainView style={{gap: 15}}>
          <View className="flex flex-row items-center justify-between">
            <Text>{t('setAsDefault')}</Text>
            <ToggleButton
              disable={addressList.length === 0}
              isOn={isDefaultSet}
              onToggle={setIsDefaultSet}
            />
          </View>
          <View className="flex flex-row items-center justify-between">
            <Text>{t('addressType')}</Text>
            <View className="flex flex-row items-center gap-2">
              <TouchableOpacity
                style={{
                  backgroundColor:
                    addressType === t('home') ? Colors.primary : Colors.subdued,
                }}
                className="px-2 py-1 rounded-md"
                onPress={() => setAddressType(t('home'))}>
                <Text>{t('home')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor:
                    addressType === t('workplace')
                      ? Colors.primary
                      : Colors.subdued,
                }}
                className="px-2 py-1 rounded-md"
                onPress={() => setAddressType(t('workplace'))}>
                <Text>{t('workplace')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </MainView>
      </View>
      {/* <TouchableOpacity
        className="mt-auto mb-5 w-[70%] px-5 py-3 rounded-lg flex items-center "
        onPress={handleAddNewAddress}>
        <Text className="text-white text-xl font-semibold">{t('add')}</Text>
      </TouchableOpacity> */}
      <CustomButton
        onPress={handleAddNewAddress}
        title={t('add')}
        style={{marginTop: 'auto', marginBottom: 20, alignSelf: 'center'}}
        textStyle={{color: 'white', fontWeight: 'bold'}}
      />
    </View>
  );
};

export default AddNewShippingAddressPage;
