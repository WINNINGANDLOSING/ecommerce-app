import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Home from '../screens/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from '../screens/Register';
import Login from '../screens/Login';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RegisterOptions from '../screens/RegisterOptions';
import {NavigatorScreenParams} from '@react-navigation/native';
import ResetPassword from '../screens/ResetPassword';
import ResetPasswordStage2 from '../screens/ResetPasswordStage2';
import SearchResultsPage from '../screens/SearchResults';
import {Product, ProductCardProps} from '../types';
import CategoriesPage from '../screens/Categories';
import CategoriesResultPage from '../screens/CategoriesResult';
import ProductDetail from '../screens/ProductDetail';
import {useTranslation} from 'react-i18next';

export type AuthProfileStackParamList = {
  Home: undefined;
  RegisterOptions: {reason: 'protected' | ''};
  Register: {reason?: string};
  Login: undefined;
  ResetPassword: undefined;
  ResetPasswordStage2: undefined;
  SearchResults: {searchTerm?: string; from: string};
};
export type AuthBottomStackParamList = {
  HomeTab: undefined;
  ProfileTab: {
    screen: keyof AuthProfileStackParamList;
    params?: AuthProfileStackParamList[keyof AuthProfileStackParamList];
  };// do this so if we are in 
};

type ProductProp = {
  product: Product;
};
export type AuthHomeStackParamList = {
  Tôi: undefined;
  Home: undefined;
  ProfileTab: {reason: 'protected' | ''};
  SearchResults: {searchTerm?: string; from: string};
  Categories: undefined;
  ProductDetail: ProductProp;
};

export type AuthCategoriesStackParamList = {
  Categories: undefined;
  SearchResults: {searchTerm?: string; from: string};
};
const CategoriesStack = () => {
  const StackCategories =
    createNativeStackNavigator<AuthCategoriesStackParamList>(); // Home Stack
  return (
    <StackCategories.Navigator screenOptions={{headerShown: false}}>
      <StackCategories.Screen
        name="Categories"
        component={CategoriesPage}></StackCategories.Screen>
      <StackCategories.Screen
        name="SearchResults"
        component={CategoriesResultPage}></StackCategories.Screen>
    </StackCategories.Navigator>
  );
};
export const RegisterTabs = () => {
  const StackProfile = createNativeStackNavigator<AuthProfileStackParamList>();
  return (
    <StackProfile.Navigator screenOptions={{headerShown: false}}>
      <StackProfile.Screen
        name="RegisterOptions"
        component={RegisterOptions}></StackProfile.Screen>
      <StackProfile.Screen
        name="Register"
        component={Register}></StackProfile.Screen>

      <StackProfile.Screen name="Login" component={Login}></StackProfile.Screen>
      <StackProfile.Screen
        name="SearchResults"
        component={SearchResultsPage}></StackProfile.Screen>

      <StackProfile.Screen
        name="ResetPassword"
        component={ResetPassword}></StackProfile.Screen>
      <StackProfile.Screen
        name="ResetPasswordStage2"
        component={ResetPasswordStage2}></StackProfile.Screen>
    </StackProfile.Navigator>
  );
};

export const HomeTabs = () => {
  const StackHome = createNativeStackNavigator<AuthHomeStackParamList>(); // Home Stack
  return (
    <StackHome.Navigator screenOptions={{headerShown: false}}>
      <StackHome.Screen name="Home" component={Home}></StackHome.Screen>

      <StackHome.Screen
        name="ProductDetail"
        component={ProductDetail}></StackHome.Screen>
      <StackHome.Screen
        name="Categories"
        component={CategoriesStack}></StackHome.Screen>

      <StackHome.Screen
        name="SearchResults"
        component={SearchResultsPage}></StackHome.Screen>
    </StackHome.Navigator>
  );
};

const AuthStack = () => {
  const Stack = createBottomTabNavigator<AuthBottomStackParamList>();
  const {t} = useTranslation('bottomTabs');

  return (
    <Stack.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color, size}) => (
          <Ionicons
            name={
              route.name === 'HomeTab' ? 'home-outline' : 'person-add-outline'
            }
            size={size}
            color={color}
          />
        ),
      })}>
      <Stack.Screen
        name="HomeTab"
        component={HomeTabs}
        options={{title: t('home')}}></Stack.Screen>

      {/* <Stack.Screen name="Profile" component={RegisterTabs}></Stack.Screen> */}
      <Stack.Screen
        name="ProfileTab"
        component={RegisterTabs}
        options={{title: t('profile')}}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthStack;
