import {useContext} from 'react';
import {
  CreateUserAccountFirestore,
  ShippingAddressType,
  updatedUserInfo,
  UserInfo,
  UserProfile,
} from '../types';
import {
  GoogleAuthProvider,
  signInWithCredential,
} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {AppDispatch, RootState} from '../redux/store';
import {setCurrentUser} from '../redux/slices/currentUserSlice';
import {handleConvertFromTimestampToDate} from './timestamp';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';
import {uploadToCloudinary} from './cloudinaryFunctions';
import {Alert} from 'react-native';
type LoginUserAccountFirestore = {
  email: string;
  pass: string;
};
export const signInWithGoogle = async () => {
  // Check if your device supports Google Play
  try {
    //await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const signInResult = await GoogleSignin.signIn();

    // Try the new style of google-sign in result, from v13+ of that module
    let idToken = signInResult.data?.idToken;
    // if (!idToken) {
    //   // if you are using older versions of google-signin, try old style result
    //   idToken = signInResult.idToken;
    // }
    if (!idToken) {
      throw new Error('No ID token found');
    }

    // console.log(idToken);

    // Create a Google credential with the token
    const googleCredential = GoogleAuthProvider.credential(
      signInResult?.data?.idToken,
    );

    // Sign-in the user with the credential
    const userCredential = await signInWithCredential(
      getAuth(),
      googleCredential,
    );
    const user = userCredential.user;
    if (user) {
      await user.updateEmail(user.providerData[0].email!);
      await user.updateProfile({});
    }

    console.log(user.providerData[0].email);
    console.log(user.email);
    const userDoc = await firestore().collection('users').doc(user.uid);
    const userRef = await userDoc.get();
    console.log(userDoc);
    if (!userRef.exists) {
      await firestore()
        .collection('users')
        .doc(user.uid)
        .set({
          uid: user.uid,
          name: user.displayName,
          bio: 'something interesting',
          birthday: new Date('2000-01-01'),
          gender: 'Male',
          phoneNumber: '101010',
          //email: user.email,
          avatarUrl: '',
          createdAt: new Date(),
          languagePreference: 'Vietnamese',
          shippingAddress: [] as ShippingAddressType[],
          role: 'user', // user | admin | moderator
        });
    }
    return {sucess: 'Successfully'};
  } catch (err) {
    console.log(err);
  }
};
export const saveAccountChanges = async (userInfo: updatedUserInfo) => {
  try {
    const auth = getAuth();
    const userAuthData = await auth.currentUser;

    await userAuthData?.updateProfile({
      displayName: userInfo.name,
    });
    // single write
    const response = await firestore()
      .collection('users')
      .doc(userAuthData?.uid)
      .update(userInfo);
    return response;
  } catch (err) {
    Alert.alert('Fail to save changes', String(err), [{text: 'OK'}]);
  }
};

// log out
export const logOut = async () => {
  try {
    await signOut(getAuth());
  } catch (err) {
    console.log('ERROR LOGGING OUT');
    console.log(err);
    Alert.alert('Fail to log out ', String(err), [{text: 'OK.'}]);
  }
};

export const createNewAccount = async ({
  avatarPhoto,
  email,
  username,
  pass,
}: CreateUserAccountFirestore) => {
  try {
    if (username !== '' && email !== '' && pass !== '') {
      // Cannot use firebaseConfig variables like 'db' at all cuz of some weird interactions
      // avoid firebase or firebase/firestore at once, use react-native-firebase instead
      // ref: https://rnfirebase.io/firestore/usage#writing-data
      const userCredential = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        pass,
      );

      const user = userCredential.user;

      // Update Firebase Auth profile
      await user.updateProfile({
        displayName: username,
      });

      // Store user profile data in Firestore
      await firestore()
        .collection('users')
        .doc(user.uid)
        .set({
          uid: user.uid,
          name: username,
          bio: 'something interesting',
          birthday: new Date('2000-01-01'),
          gender: 'Male',
          phoneNumber: '101010',
          // email: user.email,
          // avatarUrl: '',
          createdAt: new Date(),
          languagePreference: 'Vietnamese',
          shippingAddress: [] as ShippingAddressType[],
          role: 'user', // user | admin | moderator
        });

      await uploadToCloudinary(email, avatarPhoto!);
      console.log(user.photoURL);
      return userCredential;
      // Alert.alert('Success', 'User registered successfully', [{text: 'OK'}]);
    } else {
      Alert.alert('Missing Fields', '', [{text: 'OK.'}]);
      return null;
    }
  } catch (err) {
    Alert.alert('Fail to register a new user', String(err), [{text: 'OK'}]);
    return null;
  }
};

export const login = async ({email, pass}: LoginUserAccountFirestore) => {
  try {
    if (email !== '' && pass !== '') {
      const response = await signInWithEmailAndPassword(getAuth(), email, pass);
      Alert.alert('Successfully Login', '', [{text: 'OK.'}]);
      return response;
    } else {
      Alert.alert(
        'Missing fields',
        `Please complete the missing fields: email: ${email}, pass: ${pass}`,
        [{text: 'OK'}],
      );
      return null;
    }
  } catch (err) {
    Alert.alert(
      'Wrong email/password combination',
      'Please check your email/password',
      [{text: 'OK'}],
    );
    return null;
  }
};

export const getCurrentUser = async () => {
  try {
    const auth = getAuth();

    const userAuthData = await auth.currentUser;
    if (userAuthData === null) {
      return null;
    }
    const token = await userAuthData.getIdTokenResult();
    // console.log('JWT:', token);

    const userInfoData = await firestore()
      .collection('users')
      .doc(userAuthData?.uid)
      .get();

    return {userAuthData, userInfoData};
    //return await auth.currentUser;
  } catch (err) {
    console.log(err);
  }
};

export const fetchCurrentUser = async (dispatch: AppDispatch) => {
  const response = await getCurrentUser();

  if (response) {
    const {userAuthData, userInfoData} = response;
    const userAuthData_ = {
      displayName: userAuthData.displayName,
      email: userAuthData.email,
      photoURL: userAuthData.photoURL,
    } as UserProfile;
    const userInfoData_ = (userInfoData.data() as UserInfo) || null;

    let new_ = {...userInfoData_};
    new_ = {
      ...new_,
      birthday: handleConvertFromTimestampToDate(new_.birthday).toISOString(),
      createdAt: handleConvertFromTimestampToDate(new_.createdAt).toISOString(),
    };
    dispatch(
      setCurrentUser({
        userAuthData: userAuthData_,
        userProfileData: new_,
      }),
    );
  }
  return response;
};
