// import {useNavigation} from '@react-navigation/native';
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
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
// } from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// import * as ImagePicker from 'react-native-image-picker';

// // import {createUserWithEmailAndPassword} from 'firebase/auth';
// // import {FIREBASE_AUTH} from '../firebaseConfig';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import supabase from '../supabaseClient';

// const RegisterPage = () => {
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [pass, setPass] = useState('');
//   const [avatar, setAvatar] = useState<string | null>(null);
//   const isDarkmode = useColorScheme() === 'dark';
//   const [user, setUser] = useState('');
//   const navigation = useNavigation();
//   const [isShownPass, setIsShownPass] = useState(false);
//   const usersCollection = firestore().collection('Users');


//   const handleRegister = async () => {
//     try {
//       if (username !== '' && email !== '' && pass !== '') {
//         // Cannot use firebaseConfig variables like 'db' at all cuz of some weird interactions
//         // avoid firebase or firebase/firestore at once, use react-native-firebase instead
//         // ref: https://rnfirebase.io/firestore/usage#writing-data
//         const userCredential = await createUserWithEmailAndPassword(
//           getAuth(),
//           email,
//           pass,
//         );
//         const user = userCredential.user;
//         firestore()
//           .collection('users')
//           .doc(user.uid)
//           .set({
//             displayName: username,
//             email: email,
//             password: pass,
//           })
//           .then(() => {
//             console.log('User added!');
//           });

//         Alert.alert('Success', 'User registered successfully', [{text: 'OK'}]);
//       } else {
//         Alert.alert('Missing Fields', '', [{text: 'OK.'}]);
//         return null;
//       }
//     } catch (err) {
//       Alert.alert('Fail to register a new user', err.message, [{text: 'OK'}]);
//       return null;
//     }
//   };

//   // Image Picker
//   // const openGallery = () => {
//   //   const options = {
//   //     mediaType: 'photo' as MediaType,
//   //     cameraType: 'back' as CameraType,

//   //     saveToPhotos: true,
//   //   };
//   //   launchImageLibrary(options, response => {
//   //     if (response.didCancel) {
//   //       console.log('User cancelled image picker');
//   //     } else if (response.error) {
//   //       console.log('ImagePicker Error: ', response.error);
//   //     } else {
//   //       const source = {uri: response.uri};
//   //       this.setState({
//   //         avatarSource: source,
//   //       });
//   //     }
//   //   });
//   // };

//   const openImagePicker = () => {
//     let options = {
//       mediaType: 'photo' as ImagePicker.MediaType,
//       cameraType: 'back' as ImagePicker.CameraType,
//       allowsEditing: true,

//       saveToPhotos: true,
//     };

//     ImagePicker.launchImageLibrary(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.errorCode) {
//         console.log(response.errorMessage);
//       } else {
//         //let image = response.assets?.[0]?.uri;
//         let uri = response.assets?.[0]?.uri;
//         if (uri) {
//           setAvatar(uri);
//         }
//       }
//     });
//   };

//   const openCamera = () => {
//     let options = {
//       mediaType: 'photo' as ImagePicker.MediaType,
//       cameraType: 'back' as ImagePicker.CameraType,
//       allowsEditing: true,
//     };
//     ImagePicker.launchCamera(options, response => {
//       if (response.didCancel) {
//         console.log('user cancelled camera');
//       } else if (response.errorCode) {
//         console.log(response.errorMessage);
//       } else {
//         let uri = response.assets?.[0].uri;
//         if (uri) {
//           setAvatar(uri);
//         }
//       }
//     });
//   };
//   type PickerMode = 'camera' | 'library';

//   // combined two functions into one
//   const handleImagePick = (mode: PickerMode) => {
//     let options = {
//       mediaType: 'photo' as ImagePicker.MediaType,
//       cameraType: 'back' as ImagePicker.CameraType,
//       allowsEditing: true,
//     };
//     const callBack = (response: ImagePicker.ImagePickerResponse) => {
//       if (response.didCancel) {
//         console.log('User cancel image picking');
//       } else if (response.errorCode) {
//         console.log(response.errorMessage);
//       } else {
//         const uri = response.assets?.[0]?.uri;
//         if (uri) {
//           setAvatar(uri);
//         }
//       }
//     };

//     // ImagePicker.launchCamera(options, (response) => {

//     // })

//     if (mode === 'camera') {
//       ImagePicker.launchCamera(options, callBack);
//     } else {
//       ImagePicker.launchImageLibrary(options, callBack);
//     }
//   };
//   return (
//     <SafeAreaView
//       className="flex-1  items-center  rounded-xl  "
//       style={styles.body}
//       // style={isDarkmode ? styles.bodyDark : styles.bodyLight}
//     >
//       <View className="mt-12">
//         <Image
//           source={require('../assets/images/bgSignin.png')}
//           className="size-80"
//           resizeMode="contain"></Image>
//       </View>
//       <Text className="text-4xl font-bold dark:text-white mb-6">Sign Up</Text>
//       <View className="bg-gray-200 w-[90vw] p-3 mb-6 rounded-md flex pl-3 flex-row items-center ">
//         <Ionicons name={'person-outline'} size={20} />
//         <TextInput
//           placeholder="Username"
//           placeholderTextColor={'#aaa'}
//           value={username}
//           className=" max-w-[80vw] flex-1 text-lg"
//           onChangeText={setUsername}></TextInput>
//       </View>
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

//       <Text>Select an avatar:</Text>
//       {avatar == null ? (
//         <View className="p-2 flex flex-row">
//           <TouchableOpacity
//             className="w-[30vw] mr-2 p-2 border-[0.5px] rounded-md flex items-center mb-3 bg-yellow-50 border-dashed"
//             onPress={() => handleImagePick('library')}>
//             <Ionicons name="image-outline" size={15} />
//             <Text className="text-xs">Pick from library</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             className="w-[30vw] p-2 border-[0.5px] rounded-md flex items-center mb-3 bg-yellow-50 border-dashed"
//             onPress={() => handleImagePick('camera')}>
//             <Ionicons name="camera-outline" size={15} />
//             <Text className="text-xs">Take a photo</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <View className="flex items-center">
//           <Image
//             source={{uri: avatar}}
//             resizeMode="cover"
//             className="h-20 w-20 mb-1"></Image>
//           <TouchableOpacity
//             className="bg-blue-200 rounded-md flex  p-2 "
//             onPress={() => setAvatar(null)}>
//             <Text className="text-xs">Remove Image</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       <TouchableOpacity
//         className="w-[90vw] bg-[#8080e0]  mt-3 p-5 rounded-md flex items-center "
//         onPress={handleRegister}>
//         <Text className="font-bold text-white">SIGN UP</Text>
//       </TouchableOpacity>
//       <View className="flex flex-row items-center justify-center mt-2">
//         <Text className="text-xs">Already have an account ?&nbsp;</Text>
//         <TouchableOpacity
//           className=""
//           onPress={() => navigation.navigate('Login')}>
//           <Text className="text-blue-500 text-xs" style={styles.underlineText}>
//             Login now.
//           </Text>
//         </TouchableOpacity>
//       </View>
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
//     height: 10,
//     width: 10,
//   },
//   body: {
//     backgroundColor: '#F0F5FF',
//   },
// });
// export default RegisterPage;
