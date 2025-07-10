// import {getAuth, signInWithEmailAndPassword} from '@react-native-firebase/auth';
// import {useNavigation} from '@react-navigation/native';
// import {colorScheme} from 'nativewind';
// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   SafeAreaView,
//   StyleSheet,
//   Button,
//   useColorScheme,
//   Alert,
//   Image,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const LoginPage = () => {
//   const [isLogin, setIsLogin] = useState();
//   const [email, setEmail] = useState('');
//   const [pass, setPass] = useState('');

//   const navigation = useNavigation();
//   const isDarkMode = useColorScheme() === 'dark';
//   const [isShownPass, setIsShownPass] = useState(false);

//   // Login Logic (With Google)
//   // const handleLoginWGoogle = async () => {
//   //   await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
//   //   // Get the users ID token
//   //   const signInResult = await GoogleSignin.signIn();

//   //   // Try the new style of google-sign in result, from v13+ of that module
//   //   let idToken = signInResult.data?.idToken;
//   //   if (!idToken) {
//   //     // if you are using older versions of google-signin, try old style result
//   //     idToken = signInResult.idToken;
//   //   }
//   //   if (!idToken) {
//   //     throw new Error('No ID token found');
//   //   }

//   //   // Create a Google credential with the token
//   //   const googleCredential = GoogleAuthProvider.credential(
//   //     signInResult?.data?.idToken,
//   //   );

//   //   // Sign-in the user with the credential
//   //   return signInWithCredential(getAuth(), googleCredential);
//   // };

//   // Login Logic (email && pass)
//   const handleLogin = async () => {
//     try {
//       if (email !== '' && pass !== '') {
//         const response = await signInWithEmailAndPassword(
//           getAuth(),
//           email,
//           pass,
//         );
//         Alert.alert('Successfully Login', '', [{text: 'OK.'}]);
//         navigation.navigate('Home');
//       } else {
//         Alert.alert(
//           'Missing fields',
//           `Please complete the missing fields: email: ${email}, pass: ${pass}`,
//           [{text: 'OK'}],
//         );
//         return null;
//       }
//     } catch (err) {
//       Alert.alert(
//         'Wrong email/password combination',
//         'Please check your email/password',
//         [{text: 'OK'}],
//       );
//       return null;
//     }
//   };

//   return (
//     <SafeAreaView
//       className="flex-1  items-center  rounded-xl  "
//       style={styles.body}
//       // style={isDarkmode ? styles.bodyDark : styles.bodyLight}
//     >
//       <View className="mt-12 mb-6">
//         <Image
//           source={require('../assets/images/bgSignin.png')}
//           className="size-80"
//           resizeMode="contain"></Image>
//       </View>
//       <Text className="text-4xl font-bold dark:text-white mb-6">Log In</Text>
//       <View className="bg-gray-200 w-[90vw] p-3 mb-6 rounded-md flex pl-3 flex-row items-center">
//         <Ionicons name={'mail-outline'} size={20} />
//         <TextInput
//           placeholder="Email"
//           placeholderTextColor={'#aaa'}
//           value={email}
//           className=" max-w-[80vw] flex-1 text-lg"
//           onChangeText={setEmail}></TextInput>
//       </View>

//       <View className="bg-gray-200 w-[90vw] p-3 mb-6 rounded-md flex pl-3 flex-row items-center">
//         <Ionicons name={'lock-closed-outline'} size={20} />
//         <TextInput
//           placeholder="Password"
//           placeholderTextColor={'#aaa'}
//           value={pass}
//           onChangeText={setPass}
//           className=" max-w-[80vw] flex-1 text-lg"
//           secureTextEntry={!isShownPass}></TextInput>
//         <TouchableOpacity onPress={() => setIsShownPass(!isShownPass)}>
//           <Ionicons
//             name={`${isShownPass ? 'eye-off-outline' : 'eye-outline'}`}
//             className=""
//             size={20}
//           />
//         </TouchableOpacity>
//       </View>
//       <TouchableOpacity
//         className="w-[90vw] bg-[#8080e0]  p-5 rounded-md flex items-center "
//         onPress={handleLogin}>
//         <Text className="font-bold text-white">SIGN IN</Text>
//       </TouchableOpacity>
//       <View className="flex flex-row items-center justify-center mt-2">
//         <Text className="text-xs">Don't have an account ?&nbsp;</Text>
//         <TouchableOpacity
//           className=""
//           onPress={() => navigation.navigate('Register')}>
//           <Text className="text-blue-500 text-xs" style={styles.underlineText}>
//             Register here.
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* <View className="w-[45vw] mt-2">
//         <Button title="Log In" color="" onPress={handleLoginWGoogle} />
//       </View> */}
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
// export default LoginPage;
