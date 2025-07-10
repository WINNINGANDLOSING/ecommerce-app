import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Alert,
  Image,
  ToastAndroid,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import * as ImagePicker from 'react-native-image-picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Config from 'react-native-config';
import {FirestoreContext} from '../firestore/FirestoreContext';
import {getAuth} from 'firebase/auth';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {avatarType, registerInputType} from '../types';
import {
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from '../utils/formValidation';
6;
import {uploadToCloudinary} from '../utils/cloudinaryFunctions';
import {createNewAccount} from '../utils/userFunctions';
import {
  AuthBottomStackParamList,
  AuthHomeStackParamList,
  AuthProfileStackParamList,
} from '../routes/AuthStack';
import {CompositeScreenProps} from '@react-navigation/native';

type SignupScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AuthProfileStackParamList, 'Register'>,
  NativeStackScreenProps<AuthBottomStackParamList>
>;

const Register = ({navigation, route}: SignupScreenProps) => {
  const {user, firestore} = useContext(FirestoreContext);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [avatarPhoto, setAvatarPhoto] = useState<avatarType | null>(null);
  const [isShownPass, setIsShownPass] = useState(false);
  const [errors, setErrors] = useState<registerInputType>({});

  // validation function
  const validate = () => {
    const newErrors: typeof errors = {};
    console.log(pass);
    console.log(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(pass));
    if (!username) {
      newErrors.username = 'Username field is missing';
    } else if (!isValidUsername(username)) {
      newErrors.username = 'Invalid username format';
    }
    if (!email) {
      newErrors.email = 'Email field is missing';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!pass) {
      newErrors.password = 'Password field is missing';
    } else if (!isValidPassword(pass)) {
      newErrors.password = 'Invalid password format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // if somehow user is logged in and still get to this page, redirect them to Home immediately
  if (user) {
    navigation.navigate('Home');
  }
  const handleSignUp = async () => {
    try {
      if (validate()) {
        const user = {avatarPhoto, email, username, pass};
        const response = await createNewAccount(user);
        if (response) {
          navigation.navigate('Home');
          uploadToCloudinary(email, avatarPhoto!);
          Alert.alert('Successfully creating an account', '', [
            {
              text: 'OK',
            },
          ]);
          navigation.navigate('HomeTab');
        }
      } else {
        Alert.alert('Some fields are missing', '', [
          {
            text: 'OK',
          },
        ]);
        setUsername('');
        setEmail('');
        setPass('');
      }
    } catch (err) {
      Alert.alert('Something wrong', String(err), [
        {
          text: 'OK',
        },
      ]);
    }
  };

  type PickerMode = 'camera' | 'library';
  // const prepareImageFile = async (imageFile: any) => {
  //   try {
  //     let newUrl = new URL(imageFile.uri);

  //     return {
  //       name: newUrl.pathname.split('/').pop(),
  //       //size: imageFile.fileSize,
  //       type: mime.getType(imageFile.uri),
  //       uri: newUrl.href,
  //     } as any;
  //   } catch (err) {
  //     console.log('ERROR preparing image file');
  //     console.log('imageFile:', imageFile);
  //     console.log(err);
  //   }
  // };
  // combined two functions into one
  const handleImagePick = (mode: PickerMode) => {
    let options = {
      mediaType: 'photo' as ImagePicker.MediaType,
      cameraType: 'back' as ImagePicker.CameraType,
      allowsEditing: true,
    };
    const callBack = async (response: ImagePicker.ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancel image picking');
      } else if (response.errorCode) {
        console.log(response.errorMessage);
      } else {
        const image = response.assets?.[0];
        //console.log(image.fileName);
        if (image) {
          setImagePreview(image.uri!);
          //
          /* 
          ||

          Falls back when the left side is falsy, which includes:
	        •	undefined
	        •	null
	        •	0
	        •	'' (empty string)
	        •	false
	        •	NaN
          =================================================================================
          ??

          Only falls back when the left side is null or undefined — not 0, '', or false.
          */
          const uri = image.uri ?? '';
          const type = 'image/jpg';
          const name = image.fileName ?? '';
          const source = {uri, type, name};
          setAvatarPhoto(source);
        }
      }
    };

    if (mode === 'camera') {
      ImagePicker.launchCamera(options, callBack);
    } else {
      ImagePicker.launchImageLibrary(options, callBack);
    }
  };

  return (
    <SafeAreaView
      className="flex flex-1  items-center "
      //style={styles.body}
      // style={isDarkmode ? styles.bodyDark : styles.bodyLight}
    >
      <View className="">
        <Image
          source={require('../../assets/images/General/bgSignin.png')}
          className="size-72"></Image>
      </View>
      <Text className="text-4xl font-bold dark:text-white mb-6">Sign Up</Text>
      <View className="mb-6 flex flex-col gap-2">
        <View className="bg-gray-200 w-[90vw] p-3  rounded-md flex pl-3 flex-row items-center ">
          <Ionicons name={'person-outline'} size={20} />
          <TextInput
            placeholder="Username"
            placeholderTextColor={'#aaa'}
            value={username}
            className=" max-w-[80vw] flex-1 text-lg"
            onChangeText={setUsername}></TextInput>
        </View>
        {errors.username && (
          <Text className="text-red-500 font-semibold text-xs">
            {errors.username}
          </Text>
        )}
      </View>
      <View className="mb-6 gap-2">
        <View className="bg-gray-200 w-[90vw] p-3 rounded-md flex pl-3 flex-row items-center">
          <Ionicons name={'mail-outline'} size={20} />
          <TextInput
            placeholder="Email"
            placeholderTextColor={'#aaa'}
            value={email}
            className=" max-w-[80vw] flex-1 text-lg"
            onChangeText={setEmail}></TextInput>
        </View>
        {errors.email && (
          <Text className="text-red-500 font-semibold text-xs">
            {errors.email}
          </Text>
        )}
      </View>
      <View className="flex flex-col mb-6 gap-2">
        <View className="bg-gray-200 w-[90vw] p-3  rounded-md flex pl-3 flex-row items-center">
          <Ionicons name={'lock-closed-outline'} size={20} />
          <TextInput
            placeholder="Password"
            placeholderTextColor={'#aaa'}
            value={pass}
            onChangeText={setPass}
            className=" max-w-[80vw] flex-1 text-lg"
            secureTextEntry={!isShownPass}></TextInput>
          <TouchableOpacity onPress={() => setIsShownPass(!isShownPass)}>
            <Ionicons
              name={`${isShownPass ? 'eye-off-outline' : 'eye-outline'}`}
              className=""
              size={20}
            />
          </TouchableOpacity>
        </View>
        {errors.password && (
          <Text className="text-red-500 font-semibold text-xs">
            {errors.password}
          </Text>
        )}
      </View>

      <Text>Select an avatar:</Text>
      {imagePreview == null ? (
        <View className="p-2 flex flex-row">
          <TouchableOpacity
            className="w-[30vw] mr-2 p-2 border-[0.5px] rounded-md flex items-center mb-3 bg-yellow-50 border-dashed"
            onPress={() => handleImagePick('library')}>
            <Ionicons name="image-outline" size={15} />
            <Text className="text-xs">Pick from library</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[30vw] p-2 border-[0.5px] rounded-md flex items-center mb-3 bg-yellow-50 border-dashed"
            onPress={() => handleImagePick('camera')}>
            <Ionicons name="camera-outline" size={15} />
            <Text className="text-xs">Take a photo</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex items-center">
          <Image
            source={{uri: imagePreview}}
            resizeMode="cover"
            className="h-20 w-20 mb-1"></Image>
          <TouchableOpacity
            className="bg-blue-200 rounded-md flex  p-2 "
            onPress={() => setImagePreview(null)}>
            <Text className="text-xs">Remove Image</Text>
          </TouchableOpacity>
        </View>
      )}
      {errors.avatarPhoto && (
        <Text className="text-red text-xs">{errors.avatarPhoto}</Text>
      )}

      <TouchableOpacity
        className="w-[90vw] bg-[#8080e0]  mt-3 p-5 rounded-md flex items-center "
        onPress={handleSignUp}>
        <Text className="font-bold text-white">SIGN UP</Text>
      </TouchableOpacity>
      <View className="flex flex-row items-center justify-center mt-2">
        <Text className="text-xs">Already have an account ?&nbsp;</Text>
        <TouchableOpacity
          className=""
          onPress={() => navigation.navigate('Login')}>
          <Text className="text-blue-500 text-xs" style={styles.underlineText}>
            Login now.
          </Text>
        </TouchableOpacity>
      </View>
      <View className="mt-3">
        <Text className="text-xl">Sign In With</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  whiteText: {
    color: '#FFFFFF',
  },
  blackText: {
    color: '#000000',
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
  button: {
    color: '#22C55E',
    height: 10,
    width: 10,
  },
  body: {
    backgroundColor: '#F0F5FF',
  },
});
export default Register;
