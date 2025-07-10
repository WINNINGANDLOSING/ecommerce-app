// import {
//   FirebaseAuthTypes,
//   getAuth,
//   onAuthStateChanged,
//   signOut,
// } from '@react-native-firebase/auth';

import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList, ProfileStackParamList} from '../routes/AppStack';
import {useTranslation} from 'react-i18next';
import HeaderView from '../components/HeaderView';
import {CompositeScreenProps} from '@react-navigation/native';

type SettingPageProps = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, 'Settings'>,
  NativeStackScreenProps<HomeStackParamList>
>;
const SettingsPage = ({navigation}: SettingPageProps) => {
  const {t} = useTranslation('settings');

  return (
    <SafeAreaView className="flex flex-1  bg-gray-200">
      <HeaderView from={'Profile'} text={t('title')} />

      <View className="w-full">
        <View className="mt-5">
          <Text className="font-bold mb-2 ml-5 text-gray-500">
            {t('userSettings')}
          </Text>
          <View className="flex gap-3 shadow-lg bg-white">
            {/* <View className="flex flex-row items-center p-3 border-b-[0.5px] border-b-gray-300 rounded-lg">
              <Ionicons name={'moon-outline'} size={25} color={'gray'} />
              <Text className="text-xl ml-2 text-gray-700">Dark Mode</Text>
              <Switch
                className="ml-auto"
                trackColor={{false: '#D1D5DB', true: '#bbf7d0'}}
                thumbColor={isOn ? '#4ade80' : '#F3F4F6'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setIsOn(!isOn)}
                value={isOn}
              />
            </View> */}

            <TouchableOpacity
              className="flex flex-row items-center p-3 border-b-[0.5px] border-b-gray-300 rounded-lg"
              onPress={() => navigation.navigate('ChooseLanguage')}>
              <Ionicons name={'language-outline'} size={25} color={'gray'} />
              <Text className="text-xl ml-2 text-gray-700">
                {t('language')}
              </Text>
              <Ionicons
                name={'chevron-forward-outline'}
                size={20}
                color={'gray'}
                className="ml-auto mr-5"
              />
            </TouchableOpacity>

            <View className="flex flex-row items-center p-3 border-b-[0.5px] border-b-gray-300 rounded-lg">
              <Ionicons name={'card-outline'} size={25} color={'gray'} />
              <Text className="text-xl ml-2 text-gray-700">{t('payment')}</Text>
              <Ionicons
                name={'chevron-forward-outline'}
                size={20}
                color={'gray'}
                className="ml-auto mr-5"
              />
            </View>

            <View className="flex flex-row items-center p-3 border-b-[0.5px] border-b-gray-300 rounded-lg">
              <Ionicons name={'pin-outline'} size={25} color={'gray'} />
              <Text className="text-xl ml-2 text-gray-700">{t('address')}</Text>
              <Ionicons
                name={'chevron-forward-outline'}
                size={20}
                color={'gray'}
                className="ml-auto mr-5"
              />
            </View>
          </View>
        </View>

        <View className="mt-5">
          <Text className="font-bold mb-2 ml-5 text-gray-500">
            {t('support')}
          </Text>
          <View className="flex gap-3 shadow-lg bg-white">
            <View className="flex flex-row items-center p-3 border-b-[0.5px] border-b-gray-300 rounded-lg">
              <Ionicons name={'help-circle-outline'} size={25} color={'gray'} />
              <Text className="text-xl ml-2 text-gray-700">
                {t('helpCenter')}
              </Text>
              <Ionicons
                name={'chevron-forward-outline'}
                size={20}
                color={'gray'}
                className="ml-auto mr-5"
              />
            </View>

            <View className="flex flex-row items-center p-3 border-b-[0.5px] border-b-gray-300 rounded-lg">
              <Ionicons name={'book-outline'} size={25} color={'gray'} />
              <Text className="text-xl ml-2 text-gray-700">
                {t('communityRules')}
              </Text>
              <Ionicons
                name={'chevron-forward-outline'}
                size={20}
                color={'gray'}
                className="ml-auto mr-5"
              />
            </View>

            <View className="flex flex-row items-center p-3 border-b-[0.5px] border-b-gray-300 rounded-lg">
              <Ionicons
                name={'document-text-outline'}
                size={25}
                color={'gray'}
              />
              <Text className="text-xl ml-2 text-gray-700">
                {t('policies')}
              </Text>
              <Ionicons
                name={'chevron-forward-outline'}
                size={20}
                color={'gray'}
                className="ml-auto mr-5"
              />
            </View>

            <View className="flex flex-row items-center p-3 border-b-[0.5px] border-b-gray-300 rounded-lg">
              <Ionicons name={'information-outline'} size={25} color={'gray'} />
              <Text className="text-xl ml-2 text-gray-700">{t('about')}</Text>
              <Ionicons
                name={'chevron-forward-outline'}
                size={20}
                color={'gray'}
                className="ml-auto mr-5"
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsPage;
