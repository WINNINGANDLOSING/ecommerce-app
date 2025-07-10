import {ActivityIndicator, Text, View} from 'react-native';
import React from 'react';

const LoadingIndicator = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <ActivityIndicator size="large" color="#1d9bf0" />
      <Text className="mt-4 text-base text-gray-500">Please wait...</Text>
    </View>
  );
};

export default LoadingIndicator;
