import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../routes/AuthStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FirestoreContext} from '../firestore/FirestoreContext';

type ResetPasswordPageProp = NativeStackScreenProps<
  AuthStackParamList,
  'ResetPassword'
>;
const ResetPassword = ({navigation}: ResetPasswordPageProp) => {
  const {isValidEmail, firestore} = useContext(FirestoreContext);
  const [resetEmail, setResetEmail] = useState<string>('');
  const [errors, setErrors] = useState<string>('');
  const handleClickNext = async () => {
    if (!resetEmail) {
      setErrors('Please enter your email.');
    } else if (!isValidEmail(resetEmail)) {
      setErrors('Invalid email format!.');
    } else {
      try {
        await firestore.sendResetEmailLink(resetEmail);
        navigation.navigate('ResetPasswordStage2');
      } catch (error) {
        setErrors('Failed to send reset email. Please try again.');
      }
    }
  };
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
        <View className="w-6" /> {/* Placeholder for spacing */}
      </View>

      <View className="items-center mt-28">
        <Image
          source={require('../../assets/images/General/lock.png')}
          className="w-36 h-36"
          resizeMode="contain"
        />
      </View>

      <View className="items-center mt-8 px-6">
        <Text
          style={{fontFamily: 'Poppins-Black'}}
          className="text-4xl text-gray-800">
          Forgot Password
        </Text>
        <Text className="text-center text-base text-gray-600 mt-2 leading-6">
          Just drop your email below — we will send you a password reset link if
          it matches our records
        </Text>
      </View>

      <View className="items-center mt-12">
        <TextInput
          id="email"
          value={resetEmail}
          onChangeText={setResetEmail}
          placeholder="Email"
          placeholderTextColor="#6b7280"
          className="w-[80%] border-b-[0.5px] bg-gray-200 rounded-md px-4 py-3 text-base text-gray-800"
        />
      </View>

      <TouchableOpacity
        className={` w-[80%] mx-auto mt-6 py-3 rounded-lg items-center ${
          !resetEmail ? 'bg-gray-300' : 'bg-orange-500'
        }`}
        disabled={!resetEmail}
        onPress={handleClickNext}>
        <Text className={`text-white font-bold text-lg`}>NEXT</Text>
      </TouchableOpacity>
      {errors && (
        <Text className="text-center text-red-500 text-sm mt-3">{errors} </Text>
      )}
    </View>
  );
};

export default ResetPassword;
