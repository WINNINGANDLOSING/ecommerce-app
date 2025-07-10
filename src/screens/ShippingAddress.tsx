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
import React, {useContext} from 'react';

import {FirestoreContext} from '../firestore/FirestoreContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { CartStackParamList} from '../routes/AppStack';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {ShippingAddressType} from '../types';
import CheckBox from '@react-native-community/checkbox';

import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import HeaderView from '../components/HeaderView';
import {useTranslation} from 'react-i18next';
import {Colors} from '../styles/colors';

type ShippingAddressListPageProp = NativeStackScreenProps<
  CartStackParamList,
  'ShippingAddressPage'
>;
// search queries
const ShippingAddressPage = ({
  route,
  navigation,
}: ShippingAddressListPageProp) => {
  const {t} = useTranslation('addressList');
  const {selectedAddress, setSelectedAddress} = useContext(FirestoreContext);
  const handleSelectAddress = (address: ShippingAddressType) => {
    setSelectedAddress(address);
    navigation.navigate('OrderPage', {selectedItem: null});
  };
  const addressList = useSelector(
    (state: RootState) => state.shippingAddressList.value,
  );

  return (
    <View className="flex flex-1 flex-col ">
      <HeaderView from={'OrderPage'} text={t('title')} />

      {addressList.length! > 0 &&
        addressList.map((address, index) => (
          <TouchableOpacity
            key={index}
            className="flex bg-white mt-3 h-24 w-full  flex-row items-center gap-3 p-3 py"
            onPress={() => handleSelectAddress(address)}>
            <CheckBox
              className="text-red-400"
              value={selectedAddress?.id === address.id}
              onValueChange={() => handleSelectAddress(address)}
              tintColors={{true: '#f87171', false: '#999999'}}></CheckBox>
            <View className="flex flex-col">
              <View className="flex flex-row items-center">
                <Text className="font-bold text-lg">
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
              <Text className="text-gray-600 text-sm">{address.address}</Text>
            </View>
          </TouchableOpacity>
        ))}

      <TouchableOpacity
        className={`flex mt-auto bg-white p-5  items-center w-full rounded-lg justify-between flex-row`}
        disabled={addressList.length >= 5}
        onPress={() => {
          navigation.navigate('AddNewShippingAddressPage', {
            from: 'ShippingAddressPage',
          });
        }}>
        <Text
          className={` font-bold text-lg`}
          style={{
            color: addressList.length >= 5 ? Colors.muted : Colors.accent,
          }}>
          {t('subTitle')}
        </Text>
        <Ionicons
          name="add-outline"
          size={23}
          color={addressList.length >= 5 ? Colors.muted : Colors.accent}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ShippingAddressPage;
