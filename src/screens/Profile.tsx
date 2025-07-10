// import {
//   FirebaseAuthTypes,
//   getAuth,
//   onAuthStateChanged,
//   signOut,
// } from '@react-native-firebase/auth';

import React, {useContext, useEffect, useState} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {FirestoreContext} from '../firestore/FirestoreContext';
import {BottomStackParamList, ProfileStackParamList} from '../routes/AppStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {ProfileButton} from '../components/ProfileButton';
import {useTranslation} from 'react-i18next';
import ConfirmModal from '../components/ConfirmModal';
import {logOut} from '../utils/userFunctions';
import {CompositeScreenProps} from '@react-navigation/native';

type ProfileScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, 'Profile'>,
  NativeStackScreenProps<BottomStackParamList>
>;

const ProfilePage = ({navigation, route}: ProfileScreenProps) => {
  const {firestore, user} = useContext(FirestoreContext);
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value,
  );
  const [visible, setVisible] = useState(false);

  const handleSignOut = () => {
    logOut().then(_ => {
      console.log('Log out successfully');
    });
    navigation.navigate('HomeTab');
  };
  const {t} = useTranslation('profile');

  const buttons = [
    {
      icon: 'cog-outline',
      label: t('settings'),
      onPress: () => navigation.navigate('Settings'),
    },
    {
      icon: 'cart-outline',
      label: t('cart'),
      onPress: () => navigation.navigate('Cart', {from: 'Profile'}),
    },
    {
      icon: 'bag-handle-outline',
      label: t('orders'),
      onPress: () => navigation.navigate('UserOrder'),
    },
    {
      icon: 'location-outline',
      label: t('address'),
      onPress: () =>
        navigation.navigate('ShippingAddressPage', {from: 'Profile'}),
    },
  ];

  return (
    <SafeAreaView className="flex flex-1 bg-white">
      <View className="relative w-full h-[200px] mb-20">
        <Image
          source={require('../../assets/images/General/profile_background.png')}
          className="w-full h-full absolute"
          resizeMode="cover"
        />
        {user?.photoURL ? (
          <Image
            source={{uri: user.photoURL}}
            className="size-32 absolute rounded-full self-center -bottom-12"
            onError={e => console.log('image error', e.nativeEvent)}
          />
        ) : (
          <View className="size-32 rounded-full bg-gray-300 justify-center items-center">
            <Text>No Image</Text>
          </View>
        )}
      </View>
      <View className="rounded-md bg-white flex items-center">
        <Text className="text-2xl font-bold">
          {currentUser?.userAuthData?.displayName || 'Loading...'}
        </Text>
        <Text className="italic text-gray-500">
          {currentUser?.userAuthData?.email || 'Loading...'}
        </Text>
        <TouchableOpacity
          className="rounded-full mt-5 flex-row flex items-center bg-black p-3"
          onPress={() => navigation.navigate('EditAccount')}>
          <Ionicons name={'create-outline'} size={25} color={'white'} />
          <Text className="text-white ml-2 font-bold">{t('edit')}</Text>
        </TouchableOpacity>
        <View className="flex  items- w-[90vw]  mt-5 border-[1px] border-l-0 border-r-0 border-b-0 border-t-gray-300 rounded-md ">
          {buttons.map((button, index) => (
            <ProfileButton
              icon={button.icon}
              label={button.label}
              onPress={button.onPress}
              key={index}
            />
          ))}
          {/* <TouchableOpacity
            className="rounded-full min-w-[20vw] mt-3 items-center flex flex-row shadow-lg p-4 "
            onPress={() => navigation.navigate('Settings')}>
            <Ionicons name={'cog-outline'} size={25} />
            <Text className="ml-5 text-xl">Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="rounded-full min-w-[20vw]     tems-center flex flex-row shadow-lg p-4"
            onPress={() => navigation.navigate('Cart', {from: 'Profile'})}>
            <Ionicons name={'cart-outline'} size={25} />
            <Text className="ml-5 text-xl">Your Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="rounded-full min-w-[20vw]     tems-center flex flex-row shadow-lg p-4"
            onPress={() => navigation.navigate('UserOrder')}>
            <Ionicons name={'bag-handle-outline'} size={25} />
            <Text className="ml-5 text-xl">Your Order</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="rounded-full min-w-[20vw]    items-center flex flex-row shadow-lg p-4"
            onPress={() =>
              navigation.navigate('ShippingAddressPage', {from: 'Profile'})
            }>
            <Ionicons name={'location-outline'} size={25} />
            <Text className="ml-5 text-xl">Address</Text>
          </TouchableOpacity> */}
        </View>

        <View className="flex  items- w-[90vw]  mt-5 border-[1px] border-l-0 border-r-0 border-b-0 border-t-gray-300 rounded-md ">
          <TouchableOpacity className="rounded-full min-w-[20vw] mt-3 items-center flex flex-row  p-4 ">
            <Ionicons name={'cog-outline'} size={25} />
            <Text className="ml-5 text-xl">{t('help')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="rounded-full min-w-[20vw]    items-center flex flex-row  p-4"
            onPress={() => setVisible(true)}>
            <Ionicons name={'log-out-outline'} size={25} />
            <Text className="ml-5 text-xl">{t('logout')}</Text>
          </TouchableOpacity>

          {/* <View className="mb-5 justify-center items-center bg-white">
            <Button title="Delete" onPress={() => setVisible(true)} />
            <ConfirmModal
              visible={visible}
              title="Confirm Delete"
              message="Are you sure you want to delete this?"
              onCancel={() => setVisible(false)}
              onConfirm={() => {
                // Do something
                setVisible(false);
              }}
            />
          </View> */}
        </View>
      </View>
      <ConfirmModal
        onCancel={() => setVisible(false)}
        onConfirm={() => handleSignOut()}
        visible={visible}
        title="Are you sure you want to log out ?"></ConfirmModal>
    </SafeAreaView>
  );
};

export default ProfilePage;
