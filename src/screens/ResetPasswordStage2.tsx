import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../routes/AuthStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FirestoreContext} from '../firestore/FirestoreContext';

type ResetPasswordPageProp = NativeStackScreenProps<
  AuthStackParamList,
  'ResetPasswordStage2'
>;
const ResetPasswordStage2 = ({navigation}: ResetPasswordPageProp) => {
  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 pt-14 pb-4 border-b border-gray-300 bg-white">
        <Ionicons
          name="arrow-back-outline"
          size={24}
          color="#f97316"
          onPress={() => navigation.navigate('Login')}
        />
        <Text className="text-xl font-semibold text-gray-700">
          Reset Password
        </Text>
        <View className="w-6" />
      </View>

      <View className="items-center mt-28">
        <Image
          source={require('../../assets/images/General/lock.png')}
          className="w-36 h-36"
          resizeMode="contain"
        />
      </View>

      <View className="items-center mt-10 px-6">
        <Text
          style={{fontFamily: 'Poppins-Black'}}
          className="text-4xl text-gray-800">
          Check Your Email
        </Text>
        <Text className="text-center text-base text-gray-600 mt-3 ">
          {
            "We've sent a link to your email address.\nPlease check your inbox to reset your password.\n\nCan't find it? Make sure to check your spam or junk folder."
          }
        </Text>
      </View>
      <View className="flex flex-col mt-auto bg-gray-100  rounded-2xl shadow-sm items-center w-full p-3">
        <Text className="text-gray-700 text-lg font-semibold mb-2">
          Finished changing your password?
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          className="mt-1 bg-orange-400 px-5  py-2 rounded-full">
          <Text className="text-white font-semibold">Return to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResetPasswordStage2;
