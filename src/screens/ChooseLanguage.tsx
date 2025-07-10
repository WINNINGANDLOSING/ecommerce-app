// import {
//   FirebaseAuthTypes,
//   getAuth,
//   onAuthStateChanged,
//   signOut,
// } from '@react-native-firebase/auth';

import React, {useContext, useEffect, useState, useTransition} from 'react';
import {
  Alert,
  SafeAreaView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {FirestoreContext} from '../firestore/FirestoreContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileStackParamList} from '../routes/AppStack';
import {StyleSheet} from 'nativewind';
import {useTranslation} from 'react-i18next';
import HeaderView from '../components/HeaderView';
import {getLanguagePreference, updateAppLanguage} from '../utils/changeAppLan';

type ChooseLanguagePageProps = NativeStackScreenProps<
  ProfileStackParamList,
  'ChooseLanguage'
>;
const ChooseLanguagePage = ({navigation}: ChooseLanguagePageProps) => {
  const {firestore} = useContext(FirestoreContext);
  const {t} = useTranslation('chooseLan');
  // App languages
  const [languagePreview, setLanguagePreview] = useState<
    'English' | 'Vietnamese'
  >('English');
  const [oldLanguagePref, setOldLanguagePref] = useState<
    'English' | 'Vietnamese'
  >('English');
  const [languagePref, setLanguagePref] = useState<'English' | 'Vietnamese'>(
    'English',
  );

  // keep up with user language's preference
  // languagePreview is there to detect if user has set a different language than a current language, if not, gray out the done button
  useEffect(() => {
    const fetchingAppLan = async () => {
      const language = await getLanguagePreference();
      if (language) {
        console.log('success getting app lan');
        setLanguagePref(language);
        setLanguagePreview(language);
        setOldLanguagePref(language);
      }
    };
    fetchingAppLan();
  }, []);

  const handleChangeLanguage = async () => {
    try {
      const response = await updateAppLanguage(languagePref);
      setOldLanguagePref(languagePref);
      navigation.navigate('Home');
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  // language changing logic
  // const handleChangeLanguage = () => {
  //   try {
  //     const updatedData = {
  //       languagePreference: languagePref,
  //     };
  //     firestore
  //       .saveAccountChanges(updatedData)
  //       .then(_ => {
  //         Alert.alert('App Language Changed Successfully', '', [
  //           {
  //             text: 'OK',
  //           },
  //         ]);
  //       })
  //       .then(_ => {
  //         navigation.navigate('Profile');
  //       });

  //     // navigation.navigate('TestLan');
  //   } catch (err) {
  //     Alert.alert("Cannot update user language's preference", String(err), [
  //       {
  //         text: 'OK',
  //       },
  //     ]);
  //   }
  // };
  return (
    <SafeAreaView className="flex flex-1  bg-gray-200">
      <HeaderView
        from="Settings"
        text={t('title')}
        fnText="Done"
        fn={handleChangeLanguage}
        isDisabled={languagePref === oldLanguagePref}
      />
      <View className="w-full">
        <View className="flex gap-3 shadow-lg bg-white">
          <TouchableOpacity
            className="flex flex-row items-center p-3 border-b-[0.5px] border-b-gray-300 rounded-lg"
            onPress={() => setLanguagePref('Vietnamese')}>
            <Text className="text-xl ml-2">Tiếng Việt</Text>
            {languagePref === 'Vietnamese' && (
              <Ionicons
                name={'checkmark-outline'}
                size={20}
                color={'orange'}
                className="ml-auto"
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className="flex flex-row items-center p-3 border-b-[0.5px] border-b-gray-300 rounded-lg"
            onPress={() => setLanguagePref('English')}>
            <Text className="text-xl ml-2">English</Text>
            {languagePref === 'English' && (
              <Ionicons
                name={'checkmark-outline'}
                size={20}
                color={'orange'}
                className="ml-auto"
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChooseLanguagePage;
