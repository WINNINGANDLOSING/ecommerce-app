import {
  Alert,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FirestoreContext} from '../firestore/FirestoreContext';
import {addNewCart} from '../utils/cartFunctions';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {ComponentStyles, Colors, Typography} from '../styles/global';
import {getSatisfactionRate} from '../utils/satisfactionRate';
import {useTranslation} from 'react-i18next';
import i18n from '../i18n/i18n';
import {handleGetOriginalPrice} from '../utils/convertData';
import MoreInfoPage from '../components/MoreInfo';
import BuyNowModal from '../components/BuyNowModal';
import {HomeStackParamList} from '../routes/AppStack';
import {
  AuthBottomStackParamList,
  AuthHomeStackParamList,
} from '../routes/AuthStack';
import {CompositeScreenProps} from '@react-navigation/native';
type ProductDetailScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AuthHomeStackParamList, 'ProductDetail'>,
  CompositeScreenProps<
    NativeStackScreenProps<AuthBottomStackParamList>,
    NativeStackScreenProps<HomeStackParamList>
  >
>;

const ProductDetail = ({route, navigation}: ProductDetailScreenProps) => {
  const {t} = useTranslation('productDetail');
  const product = route.params?.product;
  const productPreviewAmount = product.images.length;
  const exChangeRate = useSelector(
    (state: RootState) => state.exchangeRate.value,
  );
  const {user, firestore, dispatch} = useContext(FirestoreContext);

  const [convertedPrice, setConvertedPrice] = useState<string>('');
  const [originalPrice, setOriginalPrice] = useState<string>('');

  useEffect(() => {
    if (exChangeRate !== null) {
      const price =
        i18n.language === 'vi' ? exChangeRate * product.price : product.price;
      const originalPrice = handleGetOriginalPrice(
        price,
        product.discountPercentage,
      );
      const formatted = price.toLocaleString(
        i18n.language === 'vi' ? 'vi-VN' : 'en-US',
        {style: 'currency', currency: 'VND'},
      );
      setOriginalPrice(originalPrice);
      setConvertedPrice(formatted);
    }
  }, [exChangeRate, product.price]);

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentImageIndex(prev => {
  //       const nextIndex = prev < productPreviewAmount - 1 ? prev + 1 : 0;
  //       flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
  //       return nextIndex;
  //     });
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => {
        const nextIndex =
          prev < productPreviewAmount - 1 ? currentImageIndex + 1 : 0;
        flatListRef.current?.scrollToIndex({index: nextIndex, animated: true}); 
        // update flatListRef, which acts a reference point for the flatlist to know which the current index is 
        // the flatListRef's scrollToIndex will will scroll to the nextIndex
        return nextIndex;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const [isShownMoreInfo, setIsShownMoreInfo] = useState(false);
  const [isShowBuyNow, setIsShownBuyNow] = useState(false);

  const userCart = useSelector((state: RootState) => state.userCart.value);
  if (!product) {
    return (
      <View>
        <Text>No product data available.</Text>
      </View>
    );
  }
  return (
    <SafeAreaView>
      {isShownMoreInfo && (
        <MoreInfoPage product={product} setIsShownPage={setIsShownMoreInfo} />
      )}
      {isShowBuyNow && (
        <BuyNowModal product={product} setIsShownPage={setIsShownBuyNow} />
      )}
      <ScrollView
        showsVerticalScrollIndicator={true}
        scrollEnabled={!isShownMoreInfo}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
        className="pb-5 mb-5 h-full flex flex-col">
        <View className="bg-gray-100 w-full flex">
          <FlatList
            ref={flatListRef}
            className="min-h-[30%] flex w-full"
            horizontal
            data={product.images}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            /* 
            <button onClick={handleClick}>Click me</button>
            this is not a regular DOM click event listener.
           React creates a wrapper around the real DOM event. That wrapper is what React calls a Synthetic Event.
            */

            /* 

            contentOffset.x: how far in pixels have you scrolled, if its 0, at first image
            layoutMeasurement.width: width of the visible area 
           contentOffset.x          layoutMeasurement.width           Resulting index
            0                       300                               0
            300                     300                               1
            600                     30                                2
           
            and so on

           */
            onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x /
                  event.nativeEvent.layoutMeasurement.width,
              );
              setCurrentImageIndex(index);
            }}
            scrollEventThrottle={16}
            renderItem={({item, index}) => (
              <View className="flex justify-center w-screen relative bg-white">
                <Image
                  source={{uri: item}}
                  className="h-80"
                  resizeMode="contain"
                />
              </View>
            )}
          />

          <View className="absolute top-16 left-0 right-0 flex flex-row px-6 justify-between">
            <View style={ComponentStyles.backCircle}>
              <Ionicons
                name={'arrow-back-outline'}
                size={30}
                color={'white'}
                onPress={() => navigation.navigate('Home')}
              />
            </View>
            <View style={ComponentStyles.backCircle} className="ml-auto">
              <Ionicons name={'heart-outline'} size={30} color={'white'} />
            </View>
          </View>

          <View className="flex flex-row items-center gap-3 self-center bottom-5 absolute">
            {product.images.map((img, idx) => (
              <View
                key={idx}
                className={`rounded-full size-3 ${
                  idx === currentImageIndex ? 'bg-gray-500' : 'bg-gray-300'
                } border-[0.5px] border-gray-400`}
              />
            ))}
          </View>
        </View>

        <View style={ComponentStyles.productDetailView}>
          <Text className="text-3xl mb-2 font-semibold" numberOfLines={2}>
            {product.title}
          </Text>
          <View className="gap-3 flex flex-row items-center">
            <View className="rounded-lg p-3  gap-2 items-center border-[0.5px]  flex flex-row border-gray-400">
              <Ionicons
                name="star"
                className="mb-1"
                color={Colors.accent}
                size={20}
              />
              <Text className="font-semibold text-lg mr-2">
                {product.rating}
              </Text>
              <Text style={{color: Colors.muted}}>
                {product.reviews.length} {t('reviews')}
              </Text>
            </View>
            <View className="rounded-lg p-3  gap-2  border-[0.5px] items-center flex flex-row border-gray-400">
              <Ionicons name="thumbs-up" size={20} color={Colors.primary} />
              <Text className="font-semibold">
                {getSatisfactionRate(product.reviews)}%
              </Text>
            </View>
          </View>

          <View className="flex flex-row items-center gap-3">
            <Text className="text-3xl font-bold mt-5">{convertedPrice}</Text>
            <Text style={Typography.itemDiscountPrice}>{originalPrice}</Text>
          </View>
          {/* <Text style={{color: Colors.muted}} className="mt-2">
            $13.00 Shipping Cost
          </Text> */}
          <Text style={{color: Colors.muted}} className="mt-2">
            {t('deliveryEstimate')}:&nbsp;
            <Text className="font-semibold">Wednesday, June 5</Text>
          </Text>

          <Text
            style={{color: Colors.highlight}}
            className="text-2xl font-bold mt-5">
            {product.availabilityStatus === 'In Stock'
              ? t('inStock')
              : 'Het hang'}
          </Text>

          <View className="w-full flex flex-row mt-3 gap-5 justify-center">
            <TouchableOpacity
              style={ComponentStyles.btnAddToCard}
              onPress={() => {
                if (user) {
                  addNewCart(product, dispatch, userCart);
                } else {
                  // @ts-ignore
                  navigation.navigate('ProfileTab', {
                    screen: 'RegisterOptions',
                    params: {reason: 'protected'},
                  });
                }
              }}>
              <Text className="text-xl font-semibold"> {t('addToCart')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={ComponentStyles.btnBuyNow}
              onPress={() => {
                if (user) {
                  setIsShownBuyNow(true);
                } else {
                  // @ts-ignore
                  navigation.navigate('ProfileTab', {
                    screen: 'RegisterOptions',
                    params: {reason: 'protected'},
                  });
                }
              }}>
              <Text className="text-xl font-semibold">{t('buyNow')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={ComponentStyles.productDetailView}>
          <Text className="leading-7 text-gray-600">{product.description}</Text>

          <TouchableOpacity
            className="pb-3 mt-3   flex flex-row items-center"
            onPress={() => setIsShownMoreInfo(!isShownMoreInfo)}>
            <Text className="text-lg font-semibold">{t('moreInfo')}</Text>
            <Ionicons
              name={'caret-forward-outline'}
              size={20}
              className="mr-3 ml-auto"
            />
          </TouchableOpacity>
        </View>

        <View style={ComponentStyles.productDetailView}>
          <Text className="text-3xl font-semibold">{t('comments')}</Text>

          {product.reviews.map((review, index) => (
            <View
              key={index}
              className="flex flex-col mt-3 gap-2 border-t-[0.5px] border-t-gray-400 py-3">
              <View className="flex flex-row items-center gap-1">
                <Ionicons name={'person-circle-outline'} size={25} />
                <View className="flex flex-row items-center justify-between  w-full pr-10">
                  <Text className="text-xl font-semibold">
                    {review.reviewerName}
                  </Text>
                  <Text style={{color: Colors.muted}}>
                    {new Date(review.date).toLocaleDateString()}
                  </Text>
                </View>
              </View>
              <View className="flex flex-row items-center">
                {/* 
                [...Array(2)]
                */}
                {[...Array(review.rating)].map((_, index) => (
                  <Ionicons
                    name={'star'}
                    key={index}
                    color={Colors.accent}
                    size={12}
                  />
                ))}
              </View>
              <Text className="text-lg">{review.comment}</Text>
            </View>
          ))}
        </View>

        {/*  SPACER  */}
        <View style={{height: 100}} className="mb-16">
          <Text className="text-transparent"> /sdfsdfsdf</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;
{
  /* <View
          style={ComponentStyles.mainView}
          className=""
          // className="pl-3 mt-3 border-t-[0.5px] border-t-gray-400 bg-white p-3"
        >
          <Text className="text-3xl font-semibold">Comments</Text>

          {[...Array(3)].map((_, index) => (
            <View
              key={index}
              className="flex flex-col mt-3 gap-2 border-t-[0.5px]  border-t-gray-400  py-3">
              <View className="flex flex-row items-center gap-1">
                <Ionicons name={'person-circle-outline'} size={25} />
                <Text className="text-xl font-semibold">
                  Customer {index + 1}
                </Text>
              </View>
              <View className="flex flex-row items-center">
                {[...Array(5)].map((_, index) => (
                  <Ionicons
                    name={'star'}
                    key={index}
                    color={'orange'}
                    size={12}
                  />
                ))}
              </View>
              <Text className="text-lg">
                Product looks just like the pictures. The material feels decent
                and overall it's worth the price.
              </Text>
            </View>
          ))}
        </View> */
}
