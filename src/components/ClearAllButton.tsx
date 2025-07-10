import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ComponentStyles} from '../styles/components';

import {clearCart} from '../utils/cartFunctions';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../routes/AppStack';
type NavigationProp = NativeStackNavigationProp<AppStackParamList>;
// NativeStackScreenProp
const ClearAllButton = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleDelAll = async () => {
    await clearCart();
    navigation.navigate('Home');
  };
  return (
    <TouchableOpacity
      style={ComponentStyles.btnClearAll}
      onPress={handleDelAll}>
      <Text className="text-white font-semibold">Clear all</Text>
    </TouchableOpacity>
  );
};

export default ClearAllButton;
