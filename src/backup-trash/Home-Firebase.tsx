// import React, {useEffect, useState} from 'react';
// import {
//   Button,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
//   FirebaseAuthTypes,
// } from '@react-native-firebase/auth';
// import {useLinkTo, useNavigation} from '@react-navigation/native';
// import firestore from '@react-native-firebase/firestore';
// import {UserProfile} from './Profile';
// import FlatCard from '../../app/flatCard';
// import ElevatedCards from '../../app/elevatedCard';

// const Home = ({}) => {
//   const navigation = useNavigation();
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
//   const [currentUser, setCurrentUser] = useState<UserProfile>();

//   const fetchingUserId = async () => {
//     await onAuthStateChanged(getAuth(), async user => {
//       if (user) {
//         const uid = user.uid;
//         const userData = await firestore().collection('users').doc(uid).get();
//         console.log(userData);
//         setCurrentUser(userData.data());
//       }
//     });
//   };
//   const handleAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
//     setUser(user);
//     if (initializing) setInitializing(false);
//   };

//   useEffect(() => {
//     console.log('user');
//     console.log(user);
//     fetchingUserId();
//   }, [user]);


//   useEffect(() => {
//     console.log('current');
//     console.log(currentUser);
//   }, [currentUser])
//   // Sign out
//   const handleSignOut = async () => {
//     await signOut(getAuth());
//   };

//   // Go to log in page

//   useEffect(() => {
//     const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
//     return subscriber; //
//   }, []);

//   if (initializing) return null;

//   if (!user) {
//     return (
//       <View className="flex-1  " style={styles.body}>
//         <View className="ml-5 mt-36">
//           <Text className="text-5xl">Welcome!</Text>
//           <Text className="mt-2 text-xl">You are not logged in.</Text>
//           <View className="w-[45vw]  mt-5">
//             <Button
//               title="Login"
//               color="#fdba74"
//               onPress={() => navigation.navigate('Register')}></Button>
//           </View>
//         </View>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView className="flex-1" style={styles.body}>
//       <View className="ml-5 mt-36">
//         <Text className="text-5xl ">Welcome!</Text>
//         <Text className=" mt-2 text-xl">
//           You are logged in as&nbsp;
//           <Text className="text-orange-400 text-xl">
//             {currentUser?.displayName}
//           </Text>
//         </Text>
//         {/* <View className="w-[45vw]  mt-5">
//           <Button
//             title="Logout"
//             color="#fdba74"
//             onPress={handleSignOut}></Button>
//         </View> */}
//       </View>
//       <ScrollView>
//         <FlatCard />
//         <ElevatedCards />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   whiteText: {
//     color: '#FFFFFF',
//   },
//   blackText: {
//     color: '#000000',
//   },
//   underlineText: {
//     textDecorationLine: 'underline',
//   },
//   button: {
//     color: '#22C55E',
//   },
//   body: {
//     backgroundColor: '#F0F5FF',
//   },
// });
// export default Home;
