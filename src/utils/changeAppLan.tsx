import {useNavigation} from '@react-navigation/native';
import FirestoreService from '../firestore/service';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../routes/AppStack';
import {getAuth} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {getCurrentUser} from './userFunctions';
import {UserInfo} from '../types';
import i18n from '../i18n/i18n';

type NavigationProp = NativeStackNavigationProp<HomeStackParamList>;

export const getLanguagePreference = async () => {
  const response = await getCurrentUser();
  if (response) {
    const {userAuthData, userInfoData} = response;
    const userInfoData_ = (userInfoData.data() as UserInfo) || null;
    return userInfoData_.languagePreference;
  }
  return 'English';
};
export const updateAppLanguage = async (language: 'English' | 'Vietnamese') => {
  try {
    const auth = getAuth();
    const userAuthData = auth.currentUser;
    const response = await firestore()
      .collection('users')
      .doc(userAuthData?.uid)
      .update({languagePreference: language});
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const applyUserLanguage = async () => {
  const language = await getLanguagePreference();
  console.log('lan', language);
  if (language) {
    await i18n.changeLanguage(language === 'Vietnamese' ? 'vi' : 'en');
  }
};
