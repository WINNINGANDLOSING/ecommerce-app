// // import {
// //   FirebaseAuthTypes,
// //   getAuth,
// //   onAuthStateChanged,
// //   signOut,
// // } from '@react-native-firebase/auth';

// import React, {useCallback, useContext, useEffect, useState} from 'react';
// import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
// import firestore from '@react-native-firebase/firestore';

// import Ionicons from 'react-native-vector-icons/Ionicons';

// import {FirestoreContext} from '../firestore/FirestoreContext';
// import {ProfileStackParamList} from '../routes/AppStack';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {useFocusEffect} from '@react-navigation/native';
// import LoadingIndicator from '../../app/LoadingIndicator';
// import LoadingIndicatorSub from '../../app/LoadingIndicatorSub';
// type UserProfile = {
//   name?: string;
//   email?: string;
//   avatarUrl?: string;
// };
// type ProfileScreenProps = NativeStackScreenProps<
//   ProfileStackParamList,
//   'TestLan'
// >;

// const TestLan = ({navigation}: ProfileScreenProps) => {
//   const {
//     setIsLoggedIn,
//     isLoggedIn,
//     firestore,
//     setLanguagePreference,
//     languagePreference,
//   } = useContext(FirestoreContext);
//   const [userData, setUserData] = useState<UserProfile | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   const handleSignOut = () => {
//     // await signOut(getAuth());
//     firestore.logOut().then(_ => {
//       setIsLoggedIn(false);
//     });
//     navigation.navigate('Home');
//   };

//   const [languagePref, setLanguagePref] = useState('');

//   useFocusEffect(
//     useCallback(() => {
//       setIsLoading(true); // You manually reset it now
//       firestore.getCurrentUser().then(response => {
//         if (response) {
//           const detailedUser = response.userProfileData.data();
//           setLanguagePref(detailedUser?.languagePreference);
//         }
//         setIsLoading(false);
//       });
//     }, []),
//   );
//   if (isLoading) {
//     return <LoadingIndicatorSub></LoadingIndicatorSub>;
//   }

//   return (
//     <View className="flex flex-1 items-center justify-center">
//       <Text className="text-4xl">FAIL</Text>
//     </View>
//   );
// };

// export default TestLan;
