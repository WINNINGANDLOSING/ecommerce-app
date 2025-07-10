import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Button,
  useColorScheme,
  Alert,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FirestoreContext} from '../firestore/FirestoreContext';
import {LoginIputType} from '../types';
import {isValidEmail, isValidPassword} from '../utils/formValidation';
import {AuthProfileStackParamList} from '../routes/AuthStack';
import {login} from '../utils/userFunctions';
type SigninScreenProps = NativeStackScreenProps<
  AuthProfileStackParamList,
  'Login'
>;

const Login = ({navigation}: SigninScreenProps) => {
  const {firestore, user} = useContext(FirestoreContext);

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const isDarkMode = useColorScheme() === 'dark';
  const [isShownPass, setIsShownPass] = useState(false);

  const [errors, setErrors] = useState<LoginIputType>({});

  // validation function
  const validate = () => {
    const newErrors: typeof errors = {};

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
  // Login Logic (With Google)
  // const handleLoginWGoogle = async () => {
  //   await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  //   // Get the users ID token
  //   const signInResult = await GoogleSignin.signIn();

  //   // Try the new style of google-sign in result, from v13+ of that module
  //   let idToken = signInResult.data?.idToken;
  //   if (!idToken) {
  //     // if you are using older versions of google-signin, try old style result
  //     idToken = signInResult.idToken;
  //   }
  //   if (!idToken) {
  //     throw new Error('No ID token found');
  //   }

  //   // Create a Google credential with the token
  //   const googleCredential = GoogleAuthProvider.credential(
  //     signInResult?.data?.idToken,
  //   );

  //   // Sign-in the user with the credential
  //   return signInWithCredential(getAuth(), googleCredential);
  // };

  const handleSignIn = () => {
    if (validate()) {
      const user = {email, pass};
      login(user)
        .then(response => {
          if (response) {
            navigation.navigate('Home');
          }
        })
        .catch(err => {
          console.log(err.message);
        });
    } else {
      Alert.alert('Some fields are missing', '', [
        {
          text: 'OK',
        },
      ]);
      setEmail('');
      setPass('');
    }
  };

  return (
    <SafeAreaView
      className="flex-1  items-center  rounded-xl  "
      style={styles.body}
      // style={isDarkmode ? styles.bodyDark : styles.bodyLight}
    >
      <View className="">
        <Image
          source={require('../../assets/images/General/bgSignin.png')}
          className="size-72"
          resizeMode="contain"></Image>
      </View>
      <Text className="text-4xl font-bold dark:text-white mb-6">Log In</Text>
      <View className="gap-2 flex flex-col mb-6">
        <View className="bg-gray-200 w-[90vw] p-3  rounded-md flex pl-3 flex-row items-center">
          <Ionicons name={'mail-outline'} size={20} />
          <TextInput
            placeholder="Email"
            placeholderTextColor={'#aaa'}
            value={email}
            className=" max-w-[80vw] flex-1 text-lg"
            onChangeText={setEmail}></TextInput>
        </View>
        {errors.email && (
          <Text className="text-xs text-red-500 font-semibold">
            {errors.email}
          </Text>
        )}
      </View>

      <View className="flex flex-col font-semibold gap-2  mb-6">
        <View className="bg-gray-200 w-[90vw] p-3 rounded-md flex pl-3 flex-row items-center">
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
          <Text className="text-xs text-red-500 font-semibold">
            {errors.password}
          </Text>
        )}
      </View>

      <TouchableOpacity
        className="w-[90vw] bg-[#8080e0]  p-5 rounded-md flex items-center "
        onPress={handleSignIn}>
        <Text className="font-bold text-white">SIGN IN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="mt-3 ml-auto mr-5"
        onPress={() => navigation.navigate('ResetPassword')}>
        <Text className="text-blue-500 text-sm" style={styles.underlineText}>
          Forgot your password?
        </Text>
      </TouchableOpacity>

      <View className="flex flex-row items-center justify-center mt-5">
        <Text className="text-xs">Don't have an account ?&nbsp;</Text>
        <TouchableOpacity
          className=""
          onPress={() => navigation.navigate('Register', {reason: ''})}>
          <Text className="text-blue-500 text-sm" style={styles.underlineText}>
            Register here.
          </Text>
        </TouchableOpacity>
      </View>

      {/* <View className="w-[45vw] mt-2">
        <Button title="Log In" color="" onPress={handleLoginWGoogle} />
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  },
  body: {
    backgroundColor: '#F0F5FF',
  },
});
export default Login;
