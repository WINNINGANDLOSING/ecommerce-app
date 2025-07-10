import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
import {Product, UserProfile} from '../types';
import {FirestoreContext} from '../firestore/FirestoreContext';
import ProductCard from '../components/ProductCard';
import {getInstallations} from 'firebase/installations';
import {useTranslation} from 'react-i18next';
import HeaderView from '../components/HeaderView';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {fetchingProducts} from '../utils/productFunctions';
import {AuthHomeStackParamList} from '../routes/AuthStack';
import {HomeStackParamList} from '../routes/AppStack';
import LoadingIndicator from '../../app/LoadingIndicator';

type SearchResultsPageProp = NativeStackScreenProps<
  AuthHomeStackParamList,
  'SearchResults'
> &
  NativeStackScreenProps<HomeStackParamList, 'SearchResults'>;
const SearchResultsPage = ({navigation, route}: SearchResultsPageProp) => {
  const {user, firestore} = useContext(FirestoreContext);
  const from = route.params.from!;
  const {t} = useTranslation('searchResults');
  const searchQuery = route.params.searchTerm?.toLowerCase() || '';
  const dispatch = useDispatch();
  if (!searchQuery) {
    navigation.navigate('Home');
  }
  const [isLoading, setIsLoading] = useState(true);
  const products = useSelector((state: RootState) => state.products.value);

  const filteredProducts = useMemo(() => {
    if (products.length > 0) {
      products.map((product, index) => {
        console.log(product.brand);
      });
      return products.filter(product =>
        product.brand.toLowerCase().includes(searchQuery),
      );
    }
    return [];
  }, [products]);
  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);

      const loadAll = async () => {
        fetchingProducts(dispatch);
        setIsLoading(false);
      };
      loadAll();
    }, []),
  );
  if (isLoading) {
    return <LoadingIndicator></LoadingIndicator>;
  }
  return (
    <View className="flex  flex-1  ">
      <HeaderView from={from} text={t('title')} />

      <View className="flex flex-1  bg-gray-100">
        <FlatList
          data={filteredProducts}
          //   onEndReached={() => {
          //     if (loadedProducts.length < products.length) {
          //       setPage(page => page + 1);
          //     }
          //   }}
          ListHeaderComponent={
            <View className="bg-white flex flex-row items-center w-full p-3 my-3 rounded-lg shadow-sm border border-gray-200">
              <Text className="text-gray-500 ">{t('longTitle')}&nbsp;</Text>
              <Text className="text-lg font-semibold text-orange-500 italic">
                “{searchQuery}”
              </Text>
            </View>
          }
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{
            paddingHorizontal: 10,
            //paddingBottom: 100,
          }}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          renderItem={({item}) => <ProductCard item={item} user={user} />}
        />
      </View>
    </View>
  );
};

export default SearchResultsPage;
