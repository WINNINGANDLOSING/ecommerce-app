// import React, {useContext, useEffect, useState} from 'react';
// import Home from '../screens/Home';

// import Profile from '../screens/Profile';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import EditAccountPage from '../screens/EditAccount';
// import SettingsPage from '../screens/Settings';
// import ChooseLanguagePage from '../screens/ChooseLanguage';
// import {FirestoreContext} from '../firestore/FirestoreContext';
// import TestLan from '../screens/TestLan';
// import ProductDetail from '../screens/ProductDetail';
// import CategoriesPage from '../screens/Categories';
// import {
//   BrandOrderType,
//   ItemType,
//   OrderType,
//   Product,
//   SingleOrderType,
// } from '../types';
// import MoreInfoPage from '../components/MoreInfo';
// import UserCartPage from '../screens/UserCart';
// import OrderPage from '../screens/OrderPage';
// import ShippingAddressPage from '../screens/ShippingAddress';
// import AddNewShippingAddressPage from '../screens/AddNewShippingAddress';
// import UserOrderPage from '../screens/UserOrder';
// import OrderSuccessPage from '../screens/OrderSuccess';
// import SearchResults from '../screens/SearchResults';
// import {useSelector} from 'react-redux';
// import {RootState} from '../redux/store';
// import {Text, View} from 'react-native';
// import {useTranslation} from 'react-i18next';
// import CategoriesResultPage from '../screens/CategoriesResult';
// import OrderDetailPage from '../screens/OrderDetail';
// // import ShippingAddressPage from '../screens/ShippingAddress';
// // import AddNewShippingAddressPage from '../screens/AddNewShippingAddress';

// type ProductProp = {
//   product: Product;
// };
// export type BottomStackParamList = {
//   HomeTab: undefined;
//   ProfileTab: undefined;
//   CartTab: undefined;
//   CategoriesTab: undefined;
// };
// export type AppStackParamList = {
//   Tôi: undefined;
//   Home: undefined;
//   Profile: {reason: 'protected' | ''};
//   ProductDetail: ProductProp;
//   Categories: undefined;
//   Cart: {from?: 'Home' | 'Profile'};
//   OrderPage: {selectedItem?: ItemType | null};
//   ShippingAddressPage: {from?: 'Profile' | 'OrderPage'};
//   AddNewShippingAddressPage: {from?: 'Profile' | 'ShippingAddressPage'};
//   OrderSuccessPage: undefined;
//   SearchResults: {searchTerm?: string};
// };
// export type ProfileStackParamList = {
//   Home: undefined;
//   Profile: undefined;
//   Settings: undefined;
//   ChooseLanguage: undefined;
//   Location: undefined;
//   Cart: {from?: 'Home' | 'Profile'};
//   TestLan: undefined;
//   UserOrder: undefined;
//   OrderDetail: {mainOrder: OrderType; brandOrder: BrandOrderType};
//   ShippingAddressPage: {from?: 'Profile' | 'OrderPage'};
//   AddNewShippingAddressPage: {from?: 'Profile' | 'ShippingAddressPage'};
//   EditAccount: undefined;
// };

// const StackProfile = createNativeStackNavigator<ProfileStackParamList>(); // Profile Stack
// const StackHome = createNativeStackNavigator<AppStackParamList>(); // Home Stack
// export const ProfileStack = () => {
//   return (
//     <StackProfile.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <StackProfile.Screen
//         name="Profile"
//         component={Profile}></StackProfile.Screen>

//       {/* <StackProfile.Screen
//         name="Home"
//         component={HomeStack}></StackProfile.Screen> */}

//       <StackProfile.Screen
//         name="EditAccount"
//         component={EditAccountPage}></StackProfile.Screen>

//       <StackProfile.Screen name="Settings" component={SettingsPage} />
//       <StackProfile.Screen name="Cart" component={UserCartPage} />

//       <StackProfile.Screen name="UserOrder" component={UserOrderPage} />
//       <StackProfile.Screen name="OrderDetail" component={OrderDetailPage} />

//       <StackProfile.Screen
//         name="ShippingAddressPage"
//         component={ShippingAddressPage}
//       />

//       <StackProfile.Screen
//         name="AddNewShippingAddressPage"
//         component={AddNewShippingAddressPage}
//       />

//       <StackProfile.Screen
//         name="ChooseLanguage"
//         component={ChooseLanguagePage}
//       />
//     </StackProfile.Navigator>
//   );
// };

// export const HomeStack = () => {
//   return (
//     <StackHome.Navigator screenOptions={{headerShown: false}}>
//       <StackHome.Screen name="Home" component={Home}></StackHome.Screen>
//       <StackHome.Screen
//         name="ProductDetail"
//         component={ProductDetail}></StackHome.Screen>

//       {/* <StackHome.Screen name="Cart" component={UserCartPage}></StackHome.Screen> */}
//       {/* <StackHome.Screen
//         name="OrderPage"
//         component={OrderPage}></StackHome.Screen> */}

//       <StackHome.Screen
//         name="ShippingAddressPage"
//         component={ShippingAddressPage}></StackHome.Screen>

//       <StackHome.Screen
//         name="AddNewShippingAddressPage"
//         component={AddNewShippingAddressPage}></StackHome.Screen>
//       <StackHome.Screen
//         name="SearchResults"
//         component={SearchResults}></StackHome.Screen>
//       <StackHome.Screen
//         name="OrderSuccessPage"
//         component={OrderSuccessPage}></StackHome.Screen>
//     </StackHome.Navigator>
//   );
// };
// const CategoriesStack = () => (
//   <StackHome.Navigator screenOptions={{headerShown: false}}>
//     <StackHome.Screen
//       name="Categories"
//       component={CategoriesPage}></StackHome.Screen>
//     <StackHome.Screen
//       name="SearchResults"
//       component={CategoriesResultPage}></StackHome.Screen>
//   </StackHome.Navigator>
// );
// const CartStack = () => (
//   <StackHome.Navigator screenOptions={{headerShown: false}}>
//     <StackHome.Screen name="Cart" component={UserCartPage}></StackHome.Screen>
//     <StackHome.Screen name="OrderPage" component={OrderPage}></StackHome.Screen>
//     <StackHome.Screen
//       name="ShippingAddressPage"
//       component={ShippingAddressPage}></StackHome.Screen>
//     <StackHome.Screen
//       name="AddNewShippingAddressPage"
//       component={AddNewShippingAddressPage}></StackHome.Screen>
//     <StackHome.Screen
//       name="OrderSuccessPage"
//       component={OrderSuccessPage}></StackHome.Screen>
//   </StackHome.Navigator>
// );
// const AppStack = () => {
//   const {t} = useTranslation('bottomTabs');

//   const userCart = useSelector((state: RootState) => state.userCart.value);
//   const cartItemCount = Object.values(userCart?.items || {}).length || 0;
//   const Stack = createBottomTabNavigator<BottomStackParamList>();
//   const {firestore} = useContext(FirestoreContext);
//   const [pageLan, setPageLan] = useState('');
//   useEffect(() => {
//     firestore.getCurrentUser().then(response => {
//       // get current logged in user from appwrite and assign it to const userData
//       if (response) {
//         const {userAuthData, userProfileData} = response;
//         const language = userProfileData.data()?.languagePreference;
//         setPageLan(language);
//       }
//     });
//   }, [firestore]);
//   return (
//     <Stack.Navigator
//       // Badges for keeping track of user cart items list
//       screenOptions={({route}) => ({
//         headerShown: false,
//         tabBarIcon: ({color, size}) => {
//           const iconName =
//             route.name === 'HomeTab'
//               ? 'home'
//               : route.name === 'CategoriesTab'
//               ? 'pricetags'
//               : route.name === 'CartTab'
//               ? 'cart'
//               : 'person-add';

//           return (
//             <View className="size-8  ">
//               <Ionicons name={iconName} size={size} color={color} />
//               {route.name === 'CartTab' && cartItemCount > 0 && (
//                 <View className="absolute right-[-4] top-[-7] rounded-full size-6 justify-center items-center bg-black ">
//                   <Text className="text-white font-bold text-sm">
//                     {cartItemCount}
//                   </Text>
//                 </View>
//               )}
//             </View>
//           );
//         },
//         tabBarActiveTintColor: '#A5D0CF',
//         tabBarInactiveTintColor: '#999999',
//       })}>
//       <Stack.Screen
//         name="HomeTab"
//         component={HomeStack}
//         options={{title: t('home')}} // This is what user sees in header
//       />
//       <Stack.Screen
//         name="CategoriesTab"
//         component={CategoriesStack}
//         options={{title: t('categories')}}
//       />
//       <Stack.Screen
//         name="CartTab"
//         component={CartStack}
//         options={{title: t('cart')}}
//       />
//       <Stack.Screen
//         name="ProfileTab"
//         component={ProfileStack}
//         options={{title: t('profile')}}
//       />
//     </Stack.Navigator>
//   );
// };

// export default AppStack;
