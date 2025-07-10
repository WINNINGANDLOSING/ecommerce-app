import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

import React, {useContext, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FirestoreContext} from '../firestore/FirestoreContext';
import {AuthProfileStackParamList} from '../routes/AuthStack';
import ConfirmModal from '../components/ConfirmModal';

type RegisterOptionScreenProps = NativeStackScreenProps<
  AuthProfileStackParamList,
  'RegisterOptions'
>;
const RegisterOptions = ({navigation, route}: RegisterOptionScreenProps) => {
  const [isShownNotLogginWarning, setIsShownNotLogginWarning] = useState(false);
  const {firestore} = useContext(FirestoreContext);
  const reason = route.params.reason;
  useEffect(() => {
    setIsShownNotLogginWarning(reason === 'protected');
  }, [reason]);

  const handleLogInWithGoogle = async () => {
    try {
      await firestore
        .signInWithGoogle()
        .then(response => {
          if (response) {
            Alert.alert('Successfully Login With Google');
            navigation.navigate('Home');
          } // dont use second then here, because even if the first then fails the second still run
        })
        .catch(() => {
          console.log('Something went wrong');
        });
    } catch (err) {}
  };

  return (
    <SafeAreaView
      className="flex flex-1  items-center  "
      //style={styles.body}
      // style={isDarkmode ? styles.bodyDark : styles.bodyLight}
    >
      {isShownNotLogginWarning && (
        <ConfirmModal
          isShownOneButtonOnly={true}
          visible={isShownNotLogginWarning}
          message="You are not logged in!"
          title="Please log in first"
          textCancel="OK"
          onCancel={() => setIsShownNotLogginWarning(false)}
          onConfirm={() => {}}
        />
      )}
      <Image
        source={require('../../assets/images/General/bgSignin.png')}
        className="size-72 mt-10"></Image>
      <Text style={{fontFamily: 'DancingScript-Regular', fontSize: 45}}>
        Welcome Back !
      </Text>
      <TouchableOpacity
        className="bg-orange-700 w-[80%] mt-10 mb-8 pl-16 p-5 rounded-xl gap-3 flex items-center flex-row"
        onPress={() => navigation.navigate('Login')}>
        <Ionicons name="mail" size={30} color="white" />
        <Text className="text-white font-bold text-xl">Sign In With Email</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity className="bg-[#314D8A]  w-[80%] mb-8  pl-16 p-5 rounded-xl gap-3 flex items-center flex-row">
        <Ionicons name="logo-facebook" size={30} color="white" />
        <Text className="text-white font-bold text-xl">
          Sign In With Facebook
        </Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity className="bg-black w-[80%] mb-8 pl-16 p-5 rounded-xl gap-3 flex items-center flex-row">
        <Ionicons name="logo-apple" size={30} color="white" />
        <Text className="text-white font-bold text-xl">Sign In With Apple</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        className="bg-blue-500 w-[80%] pl-16  p-5 rounded-xl gap-3 flex items-center flex-row"
        onPress={handleLogInWithGoogle}>
        <Ionicons name="logo-google" size={30} color="white" />
        <Text className="text-white font-bold text-xl">
          Sign In With Google
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RegisterOptions;

const styles = StyleSheet.create({});
