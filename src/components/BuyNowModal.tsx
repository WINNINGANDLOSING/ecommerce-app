import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React, {useMemo, useState} from 'react';
import {Colors, ComponentStyles, Typography} from '../styles/global';

// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {AppStackParamList} from '../routes/AppStack';
import {useTranslation} from 'react-i18next';
import CustomButton from './subComponents/CustomButton';
import {ItemType, ProductModalType} from '../types';
import {getFormattedPrice} from '../utils/convertData';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../routes/AppStack';
type BuyNowStackNavigation = NativeStackNavigationProp<AppStackParamList>;

const BuyNowModal = ({product, setIsShownPage}: ProductModalType) => {
  const {t} = useTranslation('productDetail');
  const navigation = useNavigation<BuyNowStackNavigation>();
  const exchangeRate = useSelector(
    (state: RootState) => state.exchangeRate.value,
  );

  const handleBuyNow = async () => {
    try {
      const newItem = {
        productId: product.id,
        quantity: itemCount,
        product: product,
      } as ItemType;

      navigation.navigate('OrderPage', {selectedItem: newItem});
    } catch (err) {
      console.log(err);
    }
  };

  const [itemCount, setItemCount] = useState(1);

  return (
    //bg-black/40 — black background with 40% opacity
    <View className=" absolute w-full min-h-full bg-black/40   z-50">
      <View className="bg-white  mt-auto rounded-t-lg w-full min-h-[20%]">
        <View className="h-[30%] flex-1 flex flex-col gap-3">
          <View className="border-b-[0.5px] flex flex-row items-center pb-2 gap-5 border-b-gray-400">
            <Image source={{uri: product.thumbnail}} className="size-48" />
            <View>
              <Text style={Typography.itemPrice}>
                {getFormattedPrice(product.price, 'discount', exchangeRate)}
              </Text>
              <Text style={Typography.subCostTitle}>
                {t('stock')}: {product.stock}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex  items-center  px-5 flex-row justify-between  flex-1 py-8 ">
          <Text style={Typography.base}>{t('amount')}</Text>
          <View className="rounded-xl flex flex-row items-center gap-5 200 border-[0.5px] border-gray-300">
            <Ionicons
              name="remove-outline"
              className="border-r-[0.5px] border-r-gray-300 p-1"
              size={20}
              onPress={() => {
                if (itemCount === 1) {
                  return;
                } else {
                  let itemC = itemCount;
                  itemC -= 1;
                  setItemCount(itemC);
                }
              }}
            />
            <Text>{itemCount}</Text>
            <Ionicons
              name="add-outline"
              size={20}
              className="border-l-[0.5px] border-r-gray-300 p-1"
              onPress={() => {
                let itemC = itemCount;
                itemC += 1;
                setItemCount(itemC);
              }}
            />
          </View>
        </View>

        <CustomButton
          onPress={handleBuyNow}
          title={t('buyNow')}
          textStyle={{color: 'white', fontWeight: 'bold'}}
          style={{
            backgroundColor: Colors.accent,
            marginBottom: '24',
            width: '90%',
            alignSelf: 'center',
          }}
        />
      </View>
    </View>
  );
};

export default BuyNowModal;
