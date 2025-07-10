import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import LoadingIndicator from '../../app/LoadingIndicator';
import {FirestoreContext} from '../firestore/FirestoreContext';
import {Linking} from 'react-native';
const linking = {
  prefixes: ['khoajack://'],
  config: {
    screens: {
      ResetPasswordScreen: 'reset-password',
    },
  },
};
const Router = () => {
  // getting
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {firestore, user, languagePreference, setLanguagePreference} =
    useContext(FirestoreContext);
  // useEffect(() => {
  //   getCurrentUser()
  //     .then(response => {
  //       // console.log(response);

  //       setIsLoading(false);
  //     })
  //     .catch(_ => {
  //       setIsLoading(false);
  //     });
  //   return () => {};
  // }, [firestore, user]);

  // if (isLoading) {
  //   return <LoadingIndicator></LoadingIndicator>;
  // }

  return (
    <NavigationContainer linking={linking}>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Router;
