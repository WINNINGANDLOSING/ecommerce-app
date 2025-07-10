// src/redux/slices/counterSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AddToCartType, UserInfo, UserProfile} from '../../types';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

type UserType = {
  userAuthData: UserProfile | null;
  userProfileData: UserInfo | null;
};

type CurrentUserState = {
  value: UserType | null;
};

const initialState: CurrentUserState = {
  value: null,
};

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserType>) => {
      state.value = action.payload;
    },
  },
});

export const {setCurrentUser} = currentUserSlice.actions;
export default currentUserSlice.reducer;
