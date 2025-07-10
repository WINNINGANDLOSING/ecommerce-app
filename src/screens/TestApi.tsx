// import React, {useContext, useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   StyleSheet,
//   ActivityIndicator,
//   SafeAreaView,
// } from 'react-native';
// import LoadingIndicator from '../../app/LoadingIndicator';
// import {FirestoreContext} from '../firestore/FirestoreContext';

// type Product = {
//   images: any;
//   id: number;
//   title: string;
//   price: number;
//   image: string;
// };

// const TestApi = () => {
//   const {firestore} = useContext(FirestoreContext);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [languagePref, setLanguagePref] = useState('English');

//   // function to change currency based on app language
//   useEffect(() => {
//     if (languagePref === 'English') {
//     }
//   }, [languagePref]);
//   const handleChangeCurrency = (price: number) => {};

//   useEffect(() => {
//     const fetchingData = async () => {
//       const response = await fetch('https://api.escuelajs.co/api/v1/products/');
//       if (response) {
//         const data = await response.json();
//         setProducts(data);
//       }
//     };
// f
//     const getLanguagePref = async () => {
//       const response = await firestore.getCurrentUser();
//       if (response) {
//         const {userAuthData, userProfileData} = response;

//         const detailedUser = userProfileData.data();
//         const detailedInfo = {
//           languagePreference: detailedUser?.languagePreference,
//         };
//         setLanguagePref(detailedInfo.languagePreference);
//       }
//     };

//     const loadAll = async () => {
//       await Promise.all([fetchingData(), getLanguagePref()]);
//       setLoading(false);
//     };
//     loadAll();
//   }, []);

//   if (loading) {
//     return (
//       <View>
//         <ActivityIndicator size="large" color="#333" />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView className="bg-gray-100 ">
//       <View>

//         <FlatList
//           data={products}
//           className="mt-10"
//           keyExtractor={item => item.id.toString()}
//           numColumns={2}
//           contentContainerStyle={{
//             paddingHorizontal: 12,
//           }}
//           columnWrapperStyle={{
//             justifyContent: 'space-between',
//           }}
//           renderItem={({item}) => (
//             <View className="rounded-lg w-[49%] bg-white mb-4 h-[20rem]">
//               <Image
//                 source={{uri: item.images[0]}}
//                 className="w-full h-52 rounded-lg"
//                 resizeMode="cover"
//               />
//               <View className="p-2 mt-2">
//                 <Text numberOfLines={2} className=" font-medium">
//                   {item.title}
//                 </Text>
//                 <Text className="mt-1 text-red-500 font-semibold">
//                   ${item.price}
//                 </Text>
//               </View>
//             </View>
//           )}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default TestApi;
