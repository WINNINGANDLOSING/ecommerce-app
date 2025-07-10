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

import React from 'react';
import {Colors, ComponentStyles} from '../styles/global';

// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {AppStackParamList} from '../routes/AppStack';
import {useTranslation} from 'react-i18next';
import CustomButton from './subComponents/CustomButton';
import {ProductModalType} from '../types';
const MoreInfoPage = ({product, setIsShownPage}: ProductModalType) => {
  const {t} = useTranslation('productDetail');
  return (
    //bg-black/40 — black background with 40% opacity
    <View className=" absolute w-full min-h-full bg-black/40   z-50">
      <View className="bg-white p-3  mt-auto rounded-t-lg w-full min-h-[30%]">
        <View className="h-[30%] flex-1 flex flex-col gap-3">
          <View className="border-b-[0.5px] pb-2 border-b-gray-400">
            <Text className="text-xl  font-semibold self-center ">
              Product Detail
            </Text>
          </View>
          <View className="flex flex-row items-center justify-between">
            <Text className="text-lg">SKU </Text>
            <Text className="text-lg">{product.sku}</Text>
          </View>
          <View className="flex flex-row items-center justify-between">
            <Text className="text-lg">{t('weight')} </Text>
            <Text className="text-lg">{product.weight}</Text>
          </View>
          <View className="flex flex-row items-center justify-between">
            <Text className="text-lg">{t('dimensions')} </Text>
            <Text className="text-lg">
              H: {product.dimensions.height} x D: {product.dimensions.depth} x
              W: {product.dimensions.width} cm
            </Text>
          </View>
        </View>

        <TouchableOpacity
          className="   px-4 py-2 mt-auto mb-6 rounded-md"
          onPress={() => setIsShownPage(false)}>
          <Text className="text-white text-center font-semibold">
            {t('close')}
          </Text>
        </TouchableOpacity>
        <CustomButton
          onPress={() => setIsShownPage(false)}
          title={t('close')}
          textStyle={{color: 'white', fontWeight: 'bold'}}
          style={{
            backgroundColor: Colors.accent,
            marginBottom: '24',
            alignSelf: 'center',
          }}
        />
      </View>
    </View>
  );
};

export default MoreInfoPage;

const styles = StyleSheet.create({});
