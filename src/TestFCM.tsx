import messaging from '@react-native-firebase/messaging';

import {Alert, PermissionsAndroid, Platform} from 'react-native';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

const TestFCM = () => {
  const getUserPermissions = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('authorization status', authStatus);
    }
  };
  const getToken = async () => {
    const token = await messaging().getToken();
    console.log(token);
  };

  useEffect(() => {
    getUserPermissions();
    getToken();
  }, []);

  return (
    <View>
      <Text>TestFCM</Text>
    </View>
  );
};

export default TestFCM;

const styles = StyleSheet.create({});
