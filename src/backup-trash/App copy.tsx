// import './global.css';
// import React, {useEffect, useState} from 'react';
// import {View, StyleSheet} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// import LoginPage from './screens/Login';
// import RegisterPage from './screens/Register';
// import Home from './screens/Home';
// import {
//   FirebaseAuthTypes,
//   getAuth,
//   onAuthStateChanged,
// } from '@react-native-firebase/auth';
// import ProfilePage from './screens/Profile';

// const Stack = createNativeStackNavigator();
// const BottomTab = createBottomTabNavigator();

// const RegisterStack = () => (
//   <Stack.Navigator screenOptions={{headerShown: false}}>
//     <Stack.Screen name="Register" component={RegisterPage} />
//     <Stack.Screen name="Login" component={LoginPage} />
//   </Stack.Navigator>
// );

// // const RegisterTabs = () => {
// //   <BottomTab.Navigator
// //     screenOptions={({route}) => ({
// //       headerShown: false,
// //       tabBarIcon: ({color, size}) => {
// //         // let iconName = 'home-outline';
// //         // if (route.name === 'Home') {
// //         //   iconName = 'home-outline';
// //         // } else if (route.name === 'Register') {
// //         //   iconName = 'person-add-outline';
// //         // }

// //         return (
// //           <Ionicons
// //             name={`${
// //               route.name === 'Home' ? 'home-outline' : 'person-add-outline'
// //             }`}
// //             size={size}
// //             color={color}
// //           />
// //         );
// //       },
// //     })}>
// //     <BottomTab.Screen name="Home" component={Home} />
// //     <BottomTab.Screen name="Register" component={RegisterStack} />
// //   </BottomTab.Navigator>;
// // };

// // const Tabs = () => (
// //   <BottomTab.Navigator
// //     screenOptions={({route}) => ({
// //       headerShown: false,
// //       tabBarIcon: ({color, size}) => (
// //         <Ionicons
// //           name={route.name === 'Home' ? 'home-outline' : 'person-add-outline'}
// //           size={size}
// //           color={color}
// //         />
// //       ),
// //     })}>
// //     <BottomTab.Screen name="Home" component={Home} />
// //     <BottomTab.Screen name="Register" component={RegisterPage} />
// //   </BottomTab.Navigator>
// // );

// const AppDD = () => {
//   const [initializing, setInitializing] = useState(true);
//   const [userId, setUserID] = useState();
//   const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
//   const handleAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
//     setUser(user);
//     if (initializing) setInitializing(false);
//   };

//   useEffect(() => {
//     const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
//     return subscriber; //
//   }, []);

//   // if (initializing) return null;

//   // if user is not logged, the ..
//   if (!user) {
//     return (
//       <View className="flex-1 bg-orange-500" style={styles.body}>
//         <NavigationContainer>
//           {/* <Stack.Navigator screenOptions={{headerShown: false}}>
//           <Stack.Screen name="MainTabs" component={Tabs} />
//           <Stack.Screen name="Login" component={LoginPage} />
//         </Stack.Navigator> */}
//           <BottomTab.Navigator
//             screenOptions={({route}) => ({
//               headerShown: false,
//               tabBarIcon: ({color, size}) => (
//                 <Ionicons
//                   name={
//                     route.name === 'Home'
//                       ? 'home-outline'
//                       : 'person-add-outline'
//                   }
//                   size={size}
//                   color={color}
//                 />
//               ),
//             })}>
//             <BottomTab.Screen name="Home" component={Home} />
//             <BottomTab.Screen name="Register" component={RegisterStack} />
//           </BottomTab.Navigator>
//         </NavigationContainer>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 bg-orange-500" style={styles.body}>
//       <NavigationContainer>
//         <BottomTab.Navigator
        //   screenOptions={({route}) => ({
        //     headerShown: false,
        //     tabBarIcon: ({color, size}) => (
        //       <Ionicons
        //         name={
        //           route.name === 'Home' ? 'home-outline' : 'person-add-outline'
        //         }
        //         size={size}
        //         color={color}
        //       />
        //     ),
        //   })}>
//           <BottomTab.Screen name="Home" component={Home} />
//           <BottomTab.Screen name="Profile" component={ProfilePage} />
//           {/* //<Stack.Screen name="Login" component={LoginPage} /> */}
//         </BottomTab.Navigator>
//       </NavigationContainer>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   body: {
//     backgroundColor: '#DAAEF7',
//   },
// });
// export default AppDD;
