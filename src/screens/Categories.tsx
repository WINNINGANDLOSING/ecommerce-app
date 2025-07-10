import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList, CategoriesStackParamList} from '../routes/AppStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
import {FirestoreContext} from '../firestore/FirestoreContext';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {categoryImages} from '../utils/fetchCategoryImages';

type CategoriesScreenProp = NativeStackScreenProps<
  CategoriesStackParamList,
  'Categories'
>;

const CategoriesPage = ({navigation}: CategoriesScreenProp) => {
  const categories = useSelector((state: RootState) => state.category.value);
  return (
    <SafeAreaView>
      <FlatList
        data={categories}
        className="mt-20 mb-5"
        keyExtractor={item => item.name.toString()}
        numColumns={2}
        contentContainerStyle={{
          paddingHorizontal: 10,
        }}
        columnWrapperStyle={{
          justifyContent: 'space-around',
        }}
        renderItem={({item, index}) => (
          <TouchableOpacity
            className="flex w-[13rem] h-[20rem] mb-5 rounded-lg"
            onPress={() => {
              navigation.navigate('SearchResults', {searchTerm: item.slug, from: 'Categories'});
            }}>
            <Image
              source={categoryImages[item.slug]}
              className="h-[20rem] w-[13rem]"
              resizeMode="cover"
            />
            <Text className="absolute self-center rounded-b-lg  bg-black/40 py-2 bottom-0 w-full text-center text-xl text-gray-300 font-semibold ">
              {item.name}
            </Text>
          </TouchableOpacity>
        )}></FlatList>
    </SafeAreaView>
  );
};

export default CategoriesPage;
