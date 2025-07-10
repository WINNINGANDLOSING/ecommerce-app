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
import {CompositeScreenProps, useFocusEffect} from '@react-navigation/native';
import {Product, UserProfile} from '../types';
import {FirestoreContext} from '../firestore/FirestoreContext';
import ProductCard from '../components/ProductCard';
import {getInstallations} from 'firebase/installations';
import HeaderView from '../components/HeaderView';
import {useTranslation} from 'react-i18next';
import LoadingIndicator from '../../app/LoadingIndicator';
import {AuthHomeStackParamList} from '../routes/AuthStack';
import {HomeStackParamList} from '../routes/AppStack';

type SearchResultsPageProp = CompositeScreenProps<
  NativeStackScreenProps<AuthHomeStackParamList, 'SearchResults'>,
  NativeStackScreenProps<HomeStackParamList>
>;

const CategoriesResultPage = ({navigation, route}: SearchResultsPageProp) => {
  const {user, firestore} = useContext(FirestoreContext);
  const {t} = useTranslation('searchResults');
  const searchQuery = route.params.searchTerm?.toLowerCase() || '';
  if (!searchQuery) {
    navigation.navigate('Home');
  }
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  const filteredProducts = useMemo(() => {
    if (products.length > 0) {
      return products.filter(product => product.category === searchQuery);
    }
    return [];
  }, [products]);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      const fetchingData = async () => {
        const response = await fetch(
          'https://dummyjson.com/products?limit=0&skip=0',
        );
        if (response) {
          const data = await response.json();
          //console.log(data.products);

          setProducts(data.products);
        }
      };

      const loadAll = async () => {
        await fetchingData();

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
      <HeaderView from="Categories" text={t('searchByCategory')}></HeaderView>
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
              <Text className="text-gray-500 ">
                {t('showingResultsFor')}&nbsp;
              </Text>
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

export default CategoriesResultPage;
