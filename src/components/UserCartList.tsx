import {
  FlatList,
  Image,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {AddToCartType, ItemType} from '../types';
import CheckBox from '@react-native-community/checkbox';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {
  handleDeSelectAllItems,
  handleSelectItem,
  handleSelectItems,
} from '../redux/slices/selectedItemsSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  handleChangeItemQuantity,
  handleRemoveItem,
} from '../utils/cartFunctions';
import {Colors} from '../styles/colors';
import {getFormattedPrice} from '../utils/convertData';
import {Typography} from '../styles/typography';
import ConfirmModal from './ConfirmModal';
import MainView from './subComponents/MainView';
import {useTranslation} from 'react-i18next';

const UserCartList = ({userCart}: {userCart: AddToCartType}) => {
  const {t} = useTranslation('cart');
  const [isVisibleDeleteItemModal, setIsVisibleDeleteItemModal] =
    useState(false);
  const [itemToDel, setItemToDel] = useState<ItemType>();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.value,
  );

  const dispatch = useDispatch();
  const exChangeRate = useSelector(
    (state: RootState) => state.exchangeRate.value,
  );
  const handleSelectAll = async () => {
    dispatch(handleSelectItems(Object.values(userCart?.items!).flat()));
  };

  const itemsBySection = Object.entries(userCart.items).map(
    ([brand, items]) => ({
      title: brand,
      data: items,
    }),
  );
  /* 
  SectionList
	•	Purpose: Displays a grouped list, where each group has a header (like brand, date, etc.).
	•	Data Format:
  sections = [
  {
    title: 'Nike',
    data: [item1, item2],
  },
  {
    title: 'Adidas',
    data: [item3, item4],
  },

  notice that title and data cannot be changed
  example:
  {
  name: ,
  data: ,
  }

  this will not work, as title and data are registered names
];
  */
  // <FlatList
  //   data={allItemsWithBrand}
  //   showsVerticalScrollIndicator={false}
  //   className="flex flex-col  mt-3 flex-1 max-h-[45rem] w-full"
  //   keyExtractor={item => item.productId.toString()} // use brand as key
  //   numColumns={1}
  //   contentContainerStyle={{
  //     paddingHorizontal: 5,
  //     paddingVertical: 3,
  //   }}
  //   renderItem={({item, index}) => (
  //     <View
  //       key={index}
  //       className={` flex flex-row mb-3 rounded-md  pb-3 border-b-[0.5px]  border-b-gray-200`}>
  //       <View className="flex justify-center">
  //         <View style={{transform: [{scale: 1.5}]}}>
  //           <CheckBox
  //             lineWidth={0.3}
  //             value={selectedItems.some(
  //               item1 => item1.productId === item.productId,
  //             )}
  //             onValueChange={() => dispatch(handleSelectItem(item))}
  //             tintColors={{true: Colors.accent, false: '#999999'}}
  //           />
  //         </View>
  //       </View>

  //       <Image
  //         source={{uri: item.product.thumbnail}}
  //         className="size-36 rounded-lg  border-gray-300"
  //         resizeMode="cover"
  //       />
  //       <View className="flex ml-3 flex-1 p-2 ">

  //         <Text className="text-xl" numberOfLines={2}>
  //           {item.product.title}
  //         </Text>
  //         <View>
  //           <Text className="text-sm text-gray-500 mb-1" numberOfLines={2}>
  //             {item.product.brand}, {item.product.category}
  //           </Text>
  //           <Text
  //             className="text-sm italic text-gray-500 mb-1"
  //             numberOfLines={2}>
  //             {getFormattedPrice(
  //               item.product.price,
  //               'discount',
  //               exChangeRate,
  //               false,
  //             )}
  //           </Text>
  //         </View>
  //         <View className="flex flex-row items-center mt-auto">
  //           <View className="flex flex-col">
  //             <Text style={Typography.subCostTitle}>
  //               Total cost ({item.quantity} item):
  //             </Text>
  //             <Text className="text-xl  font-semibold">
  //               {getFormattedPrice(
  //                 item.product.price * item.quantity,
  //                 'discount',
  //                 exChangeRate,
  //                 false,
  //               )}
  //             </Text>
  //           </View>
  //   <View className="flex flex-row items-center ml-auto gap-2">
  //     <Ionicons
  //       name="remove-outline"
  //       size={20}
  //       onPress={() => {
  //         if (item.quantity === 1) {
  //           setIsVisibleDeleteItemModal(true);
  //           setItemToDel(item);
  //           return;
  //         } else {
  //           handleChangeItemQuantity(
  //             item.productId,
  //             dispatch,
  //             item.brand,
  //             'decrement',
  //           );
  //         }
  //       }}
  //     />
  //     <Text className="text-lg">{item.quantity}</Text>
  //     <Ionicons
  //       name="add-outline"
  //       size={20}
  //       onPress={() =>
  //         handleChangeItemQuantity(
  //           item.productId,
  //           dispatch,
  //           item.brand,
  //           'increment',
  //         )
  //       }
  //     />
  //   </View>
  // </View>
  //       </View>
  // <ConfirmModal
  //   visible={isVisibleDeleteItemModal}
  //   title="Confirm Deletion"
  //   message={
  //     <Text>
  //       Are you sure you want to delete item:&nbsp;
  //       <Text style={{color: Colors.accent, fontWeight: 'bold'}}>
  //         {itemToDel?.product.title}
  //       </Text>
  //     </Text>
  //   }
  //   onCancel={() => setIsVisibleDeleteItemModal(false)}
  //   onConfirm={() => {
  //     handleRemoveItem(
  //       dispatch,
  //       item.brand,
  //       itemToDel?.productId!,
  //       selectedItems,
  //     );
  //     setIsVisibleDeleteItemModal(false);
  //   }}
  // />
  //     </View>
  //   )}></FlatList>
  return (
    <View className="bg-gray-100 flex flex-1 w-full h-full">
      <SectionList
        sections={itemsBySection}
        keyExtractor={item => item.productId.toString()}
        renderSectionHeader={({section: {title}}) => (
          <View className="px-5 bg-white mx-3 mt-5 rounded-t-lg p-3">
            <Text style={Typography.bold}>{title}</Text>
          </View>
        )}
        renderSectionFooter={() => (
          <View className="pb-5 mx-3 rounded-b-lg bg-white" />
        )}
        renderItem={({item, section}) => (
          <View className="px-5 pt-5 bg-white flex flex-row  mx-3 gap-5">
            <View className="self-center" style={{transform: [{scale: 1.5}]}}>
              <CheckBox
                lineWidth={0.3}
                value={selectedItems.some(
                  item1 => item1.productId === item.productId,
                )}
                onValueChange={() => dispatch(handleSelectItem(item))}
                tintColors={{true: Colors.accent, false: '#999999'}}
              />
            </View>
            <Image source={{uri: item.product.thumbnail}} className="size-24" />
            <View className="flex-1 ">
              <Text numberOfLines={2} style={Typography.base}>
                {item.product.title}
              </Text>
              <View className="flex flex-row mt-auto mb-3 items-center">
                <Text numberOfLines={2} style={Typography.itemUserCartPrice}>
                  {getFormattedPrice(
                    item.product.price,
                    'discount',
                    exChangeRate,
                  )}
                </Text>
                <View className="border-[0.5px]  border-gray-400 rounded-md  flex flex-row items-center ml-auto gap-2">
                  <Ionicons
                    className="border-r-[0.5px] p-1  border-gray-400"
                    name="remove-outline"
                    size={10}
                    onPress={() => {
                      if (item.quantity === 1) {
                        setIsVisibleDeleteItemModal(true);
                        setItemToDel(item);
                        return;
                      } else {
                        handleChangeItemQuantity(
                          item.productId,
                          dispatch,
                          section.title,
                          'decrement',
                        );
                      }
                    }}
                  />
                  <Text className="text-xs">{item.quantity}</Text>
                  <Ionicons
                    className="border-l-[0.5px] p-1  border-gray-400"
                    name="add-outline"
                    size={10}
                    onPress={() =>
                      handleChangeItemQuantity(
                        item.productId,
                        dispatch,
                        section.title,
                        'increment',
                      )
                    }
                  />
                </View>
              </View>
            </View>
            <ConfirmModal
              visible={isVisibleDeleteItemModal}
              title={t('confirmDel')}
              onCancel={() => setIsVisibleDeleteItemModal(false)}
              onConfirm={() => {
                handleRemoveItem(
                  dispatch,
                  section.title,
                  itemToDel?.productId!,
                  selectedItems,
                );
                setIsVisibleDeleteItemModal(false);
              }}
            />
          </View>
        )}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
      />
    </View>
  );
};

export default UserCartList;
