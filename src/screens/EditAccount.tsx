// import {
//   FirebaseAuthTypes,
//   getAuth,
//   onAuthStateChanged,
//   signOut,
// } from '@react-native-firebase/auth';

import React, {useContext, useEffect, useMemo, useState} from 'react';
import * as ImagePicker from 'react-native-image-picker';

import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import RNPickerSelect from 'react-native-picker-select';

import {FirestoreContext} from '../firestore/FirestoreContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileStackParamList} from '../routes/AppStack';
import DatePicker from 'react-native-date-picker';
import {avatarType, updatedUserInfo, UserInfo} from '../types';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {uploadToCloudinary} from '../utils/cloudinaryFunctions';
import {handleConvertFromTimestampToDate} from '../utils/timestamp';
import {getCurrentUser, saveAccountChanges} from '../utils/userFunctions';
export type UserBasicInfo = {
  name?: string;
  email?: string;
}; // auth section of firebase

type EditPageScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  'EditAccount'
>;
const EditAccountPage = ({navigation}: EditPageScreenProps) => {
  const {user, firestore} = useContext(FirestoreContext);
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value,
  );
  // const [userData, setUserData] = useState<UserBasicInfo | null>(null);
  // const [userProfileData, setUserProfileData] =
  //   useState<updatedUserInfo | null>(null);
  const [avatar, setAvatar] = useState<string>();
  const [newUsername, setNewUsername] = useState<string>();
  const [newBio, setNewBio] = useState<string>();
  const [newEmail, setNewEmail] = useState<string>();
  const [newBirthday, setNewBirthday] = useState<Date>();
  const [date, setNewDate] = useState<Date>();
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
  const [newPhone, setNewPhone] = useState<number>();
  const [newGender, setNewGender] = useState('Male');
  const [newAvatar, setNewAvatar] = useState<avatarType | null>(null);

  type PickerMode = 'camera' | 'library';

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
          setAvatar(image.uri!);
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
          setNewAvatar(source);
        }
      }
    };

    if (mode === 'camera') {
      ImagePicker.launchCamera(options, callBack);
    } else {
      ImagePicker.launchImageLibrary(options, callBack);
    }
  };

  const handleChangeAvatar = async () => {
    try {
      const response = await getCurrentUser();
      if (response) {
        const {userAuthData, userProfileData} = response;
        const email = userAuthData.email;
        if (newAvatar) {
          await uploadToCloudinary(email!, newAvatar);
        } else {
          console.log('no new avatar');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentUser !== null) {
      setAvatar(currentUser.userAuthData?.photoURL);
      //setAvatar(userProfileData?.avatarUrl);
      setNewUsername(currentUser.userAuthData?.displayName);
      setNewEmail(currentUser.userAuthData?.email);
      setNewBio(currentUser.userProfileData?.bio);
      setNewBirthday(
        handleConvertFromTimestampToDate(currentUser.userProfileData?.birthday),
      );
      setNewGender(currentUser.userProfileData?.gender!);
      setNewPhone(Number(currentUser.userProfileData?.phoneNumber!));
    }
  }, [currentUser]);

  const newData = useMemo(() => {
    return {
      name: newUsername,
      bio: newBio,
      birthday: newBirthday,
      gender: newGender,
      phoneNumber: newPhone,
    } as updatedUserInfo;
  }, [newBio, newBirthday, newGender, newPhone, newUsername]);

  const handleChangeData = async (userInfo: updatedUserInfo) => {
    try {
      const response = await saveAccountChanges(userInfo);

      if (newAvatar) {
        await handleChangeAvatar();
      }
      navigation.navigate('Profile');
    } catch (err) {
      Alert.alert('Something wrong', String(err), [{text: 'OK'}]);
    }
  };

  return (
    <SafeAreaView className="flex flex-1 items-center ">
      <View className="flex flex-row items-center  border-b-[1px] border-b-gray-300 pb-4 justify-between bfg-red-500 w-full px-3 pt-12">
        <Text
          className="text-xl text-gray-500"
          onPress={() => navigation.navigate('Profile')}>
          Cancel
        </Text>
        <Text className="text-2xl text-center text-gray-400">Edit Profile</Text>
        <Text
          className="text-xl text-gray-500"
          onPress={() => handleChangeData(newData!)}>
          Save
        </Text>
      </View>
      <View className="rounded-full size-40  relative mt-5 overflow-hidden">
        <Image
          source={{uri: avatar}}
          className="size-40 rounded-full "
          resizeMode="cover"></Image>
        <TouchableOpacity
          className="bg-black/40 absolute bottom-0 h-[3vh] w-full"
          onPress={() => handleImagePick}>
          <Text className="text-white font-bold text-center">Change</Text>
        </TouchableOpacity>
      </View>
      <View className="bg-gray-100 gap-5 flex flex-1 w-full mt-5 p-5">
        <View>
          <Text className="text-lg text-gray-500">USERNAME</Text>
          <TextInput
            className="border-b-[1px] border-gray-200 text-xl "
            value={newUsername || ''}
            onChangeText={name => setNewUsername(name)}
          />
        </View>
        <View>
          <Text className="text-lg text-gray-500">BIO</Text>
          <TextInput
            className="border-b-[1px] border-gray-200 text-xl "
            value={newBio || ''}
            onChangeText={bio => setNewBio(bio)}
          />
        </View>
        <View>
          <Text className="text-lg text-gray-500">BIRTHDAY</Text>
          <View className="flex flex-row items-center border-b-[1px] border-gray-200 pb-3">
            <Text className="text-xl">{newBirthday?.toDateString()}</Text>
            <TouchableOpacity
              className="rounded-full ml-5 bg-gray-200 p-2  "
              onPress={() => setIsOpenDatePicker(true)}>
              <Text className="text-xs">Change birthday</Text>
            </TouchableOpacity>
          </View>
          <DatePicker
            modal
            open={isOpenDatePicker}
            mode="date"
            date={new Date()}
            onConfirm={date => {
              setIsOpenDatePicker(false);
              setNewBirthday(date);
              //setNewDate(date);
            }}
            onCancel={() => {
              setIsOpenDatePicker(false);
            }}
          />
        </View>

        <View>
          <Text className="text-lg text-gray-500">PHONE</Text>
          <TextInput
            className="border-b-[1px] border-gray-200 text-xl"
            keyboardType="numeric"
            value={newPhone?.toString() || ''}
            onChangeText={phone => setNewPhone(Number(phone))}
          />
        </View>
        <View>
          <Text className="text-lg text-gray-500">GENDER</Text>
          <View className="flex items-center flex-row border-b-[1px] pl-2 border-gray-200 ">
            <Text className="text-xl ">{newGender}</Text>
            <RNPickerSelect
              onValueChange={value => setNewGender(value)}
              //value={'male'} // must match the item value
              placeholder={{label: '', value: null}}
              items={[
                {label: 'Male', value: 'Male'},
                {label: 'Female', value: 'Female'},
              ]}
              style={{
                inputIOS: {
                  // fontSize: 16,
                  // paddingVertical: 10,
                  // paddingHorizontal: 1,
                  // borderWidth: 1,
                  // borderColor: 'gray',
                  // borderRadius: 4,
                  // color: 'black',
                  // width: 50,
                  width: 50,
                  fontSize: 30,
                },
                inputAndroid: {
                  // fontSize: 16,
                  // paddingHorizontal: 10,
                  // paddingVertical: 8,
                  // borderWidth: 1,
                  // borderColor: 'gray',
                  // borderRadius: 8,
                  // color: 'black',
                  width: 50,
                  fontSize: 30,
                },
              }}
            />
          </View>
          {/* <Text className='flex-'>{userProfileData?.gender || 'MALE'}</Text> */}
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'green',
    fontWeight: 'bold',
  },
  input: {
    width: 250,
    height: 50,
    borderWidth: 2,
    borderColor: '#3498db',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    color: '#333',
    backgroundColor: '#fff',
  },
});

export default EditAccountPage;
