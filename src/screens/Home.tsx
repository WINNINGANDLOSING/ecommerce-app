import {
  Alert,
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {FirestoreContext} from '../firestore/FirestoreContext';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// import theme from '../../styles/theme.scss';
// import forms from '../../styles/forms.scss';
import {ComponentStyles, Colors, Spacing, Typography} from '../styles/global';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CategoryType, Product, ShippingAddressType} from '../types';
import {useTranslation} from 'react-i18next';

import ProductCard from '../components/ProductCard';
import {categoryImages} from '../utils/fetchCategoryImages';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';

import {fetchCategories} from '../utils/categoryFunctions';
import {fetchCurrentUser} from '../utils/userFunctions';
import {fetchUserCart} from '../utils/cartFunctions';
import {
  fetchingAddressList,
  getSelectedAddress,
} from '../utils/addressListFunctions';
import {fetchUserOrder} from '../utils/orderFunctions';
import i18n from '../i18n/i18n';
import {getExchangeRate} from '../utils/exchangeRateFunctions';
import {fetchingProducts} from '../utils/productFunctions';
import {HomeStackParamList} from '../routes/AppStack';
import {applyUserLanguage} from '../utils/changeAppLan';
import {AuthHomeStackParamList} from '../routes/AuthStack';
import LoadingIndicator from '../../app/LoadingIndicator';
import {fetchUserNotifications} from '../utils/notificationsFunction';

type AppNavigationProp = NativeStackNavigationProp<HomeStackParamList>;
type AuthNavigationProp = NativeStackNavigationProp<AuthHomeStackParamList>;
// export const BlueText = () => {
//   return <Text style={forms['textBlue']}>BLUE TEXT</Text>;
// };
// export const BlueText1 = () => {
//   return <Text style={[forms.text2, forms['text2-textBlue']]}>BLUE TEXT</Text>;
// };
// search queries
const Home = () => {
  // useState = re render the page if the state changes
  // useEffect = run side effects after render
  // useCallback  = save a function, only update its value when dependencies change, don't really run it
  // useMemo = save a value, only update its value when dependencies change, don't really run it
  /* 
  const sayHi = useCallback(() => {
  console.log('hi');
}, []);
  */
  // •	It doesn’t run the function, it returns a memoized version of it.
  /*
  useEffect: “Do this after the component renders.”
  useMemo: “Remember this value and don’t recreate it unless dependencies change.”
	useCallback: “Remember this function and don’t recreate it unless dependencies change.”
  */

  const {t} = useTranslation('home');

  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigation = useNavigation<AppNavigationProp & AuthNavigationProp>();

  // const [loadedProducts, setLoadedProducts] = useState<Product[]>([]);
  const itemsPerPage = 20;
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const {firestore, user, setSelectedAddress, selectedAddress} =
    useContext(FirestoreContext);
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.category.value);
  const products = useSelector((state: RootState) => state.products.value);

  // useCallback is used to memoize the entire effect function so that it doesn’t get recreated on every render
  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      const fetchingSelectedAddress = async () => {
        const data = (await getSelectedAddress()) as ShippingAddressType;
        console.log('selected address data', data);
        setSelectedAddress(data);
      };

      const loadAll = async () => {
        try {
          await Promise.all([
            fetchCategories(dispatch),
            user ? fetchCurrentUser(dispatch) : Promise.resolve(),
            fetchUserCart(dispatch),
            fetchingProducts(dispatch),
            getExchangeRate(dispatch),
            fetchUserOrder(dispatch),
            fetchUserNotifications(dispatch),
            fetchingAddressList(dispatch),
            fetchingSelectedAddress(),
            applyUserLanguage(),
          ]);
        } catch (err) {
          console.log('Something failed:', err);
        } finally {
          setIsLoading(false);
        }
      };

      loadAll();
    }, []),
  );

  // Load more products if page increases

  // load the first 20 products
  // based on the current page, slice the products object and assign it to loadedProducts, if page = 1, then products will be sliced 0 to 20, if page = 0 then 0 to 40
  // useEffect(() => {
  //   if (products.length > 0) {
  //     try {
  //       const end = itemsPerPage * page;
  //       const start = 0;
  //       setLoadedProducts(products.slice(start, end));

  //       setIsLoading(false);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // }, [products, page]);

  // use useMemo() for better performance, only calculate loadProducts when page is changed since products remain the same
  const loadedProducts = useMemo(() => {
    const end = itemsPerPage * page;
    const start = 0;
    return products.slice(start, end);
  }, [products, page]);
  const reason = user ? '' : 'protected';
  useEffect(() => {
    console.log(user?.photoURL);
  }, [user]);
  if (isLoading) {
    return <LoadingIndicator></LoadingIndicator>;
  }

  return (
    <View className="flex-1 flex h-full">
      {/* Header */}
      <View style={ComponentStyles.homeHeaderView}>
        {/* Title Row */}
        <View className="flex-row mt-10 items-center  w-full justify-between">
          <TouchableOpacity
            style={ComponentStyles.iconCircle}
            onPress={() => navigation.navigate('Profile', {reason})}>
            <Image
              source={{uri: user?.photoURL!}}
              className="size-14 rounded-full"></Image>
          </TouchableOpacity>
          {user && (
            <View className="flex flex-col items-center">
              <Text className="text-gray-400">{t('deliveryAddress')}</Text>

              <Text className="font-semibold">
                {selectedAddress?.address || t('noAddress')}
                {/* 12343534 */}
              </Text>
            </View>
          )}
          <View
            className=" flex size-16 relative"
            style={ComponentStyles.iconCircle}>
            <Ionicons
              name="notifications-outline"
              className=""
              color=""
              size={23}
            />
            <View
              style={{backgroundColor: Colors.accent}}
              className=" rounded-full size-5 absolute top-0 right-0"></View>
          </View>
        </View>

        {/* Search and Cart */}
        <View style={ComponentStyles.searchBar}>
          <TextInput
            placeholder={t('searchEntireShop')}
            value={searchQuery}
            className="w-[80%] text-base"
            onChangeText={setSearchQuery}
            id="search-term"
            returnKeyType="search"
            onSubmitEditing={() =>
              navigation.navigate('SearchResults', {
                searchTerm: searchQuery,
                from: 'Home',
              })
            }
          />
          <Ionicons name={'search-outline'} className="mr-5" size={23} />
        </View>

        {/* <TouchableOpacity
            className="ml-3 mr-1 flex flex-row items-center gap-1"
            onPress={() => {
              if (user) {
                navigation.navigate('Cart', {from: 'Home'});
              } else {
                navigation.navigate('Profile', {
                  screen: 'RegisterOptions',
                  params: {reason: 'protected'},
                });
              }
            }}>
            <Ionicons name={'cart-outline'} size={25} />
            <Text> ({userCart?.items.length || 0})</fText>
          </TouchableOpacity> */}
      </View>

      {/* FlatList - take remaining space */}
      <View className="flex flex-1 bg-gray-100">
        <FlatList
          data={loadedProducts}
          ListHeaderComponent={
            <View className="flex flex-col">
              <View style={ComponentStyles.offerView} className=" rounded-t-0">
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[Colors.accent, Colors.primary]}
                  style={ComponentStyles.offerBar}>
                  <View
                    className="  rounded-md  py-5 items-center m-3 mr-0 "
                    style={{
                      width: '35%',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    }}>
                    <Text className="text-white text-xs font-bold">
                      {t('todayBestDeal')}
                    </Text>
                    <Text className=" text-[2.5rem] text-center   text-white font-bold">
                      {t('Discount')}
                    </Text>
                  </View>
                  <View
                    className=" rounded-md  items-center pb-5 pl-5  flex justify-center "
                    style={{width: '65%'}}>
                    <Image
                      source={require('../../assets/images/General/offer_product.png')}
                      className="size-72"
                      resizeMode="center"></Image>
                  </View>
                </LinearGradient>
              </View>
              <View style={ComponentStyles.mainView}>
                <View className="flex-row items-center justify-between ">
                  <Text className="text-2xl font-bold">{t('categories')}</Text>
                  <TouchableOpacity
                    className="flex flex-row items-center gap-2"
                    onPress={() => navigation.navigate('Categories')}>
                    <Text style={{color: Colors.text}}>{t('seeAll')}</Text>
                    <View
                      style={ComponentStyles.seeAllCircle}
                      className="see-all-circle">
                      <Ionicons name="chevron-forward-outline" size={13} />
                    </View>
                  </TouchableOpacity>
                </View>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  //contentContainerStyle={{paddingHorizontal: 16}}
                  className="mt-4">
                  {categories?.map((category: CategoryType, index: number) => (
                    <View key={index} className="mr-5  ">
                      <Image
                        source={categoryImages[category.slug]}
                        className="size-16 rounded-full"></Image>
                      <Text className="mt-2 text-center font-semibold">
                        {category.name}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          }
          onEndReached={() => {
            if (loadedProducts.length < products.length) {
              setPage(page => page + 1);
            }
          }}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={
            {
              // paddingHorizontal: 10,
              //paddingBottom: 100,
            }
          }
          columnWrapperStyle={
            {
              // justifyContent: 'space-between',
            }
          }
          renderItem={({item}) => <ProductCard item={item} user={user} />}
        />
      </View>
    </View>
  );
};

export default Home;
