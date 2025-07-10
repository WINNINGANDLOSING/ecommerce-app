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
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {FirestoreContext} from '../firestore/FirestoreContext';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {ProfileStackParamList} from '../routes/AppStack';

import {OrderType} from '../types';

import HeaderView from '../components/HeaderView';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {useTranslation} from 'react-i18next';
import {Colors} from '../styles/colors';
import UserOrderItem from '../components/UserOrderItem';

type UserOrderPageProp = NativeStackScreenProps<
  ProfileStackParamList,
  'UserOrder'
>;

// search queries
const UserOrderPage = ({navigation}: UserOrderPageProp) => {
  const userOrder = useSelector((state: RootState) => state.userOrder.value);
  const {t} = useTranslation('userOrder');

  //const [selectedItems, setSelectedItems] = useState<ItemType[]>([]);

  const [currentTab, setCurrentTab] = useState('pending');

  const orderData = useMemo(() => {
    if (userOrder.length > 0) {
      return userOrder.filter(order => order.status === currentTab);
    }
  }, [currentTab, userOrder]);

  const tabs = [
    {
      key: 'pending',
      name: t('pending'),
      onPress: () => setCurrentTab('pending'),
    },
    {
      key: 'processing',
      name: t('processing'),
      onPress: () => setCurrentTab('processing'),
    },
    {
      key: 'in_delivery',
      name: t('in_delivery'),
      onPress: () => setCurrentTab('in_delivery'),
    },
    {
      key: 'cancelled',
      name: t('cancelled'),
      onPress: () => setCurrentTab('cancelled'),
    },
    {
      key: 'completed',
      name: t('completed'),
      onPress: () => setCurrentTab('completed'),
    },
  ];

  return (
    <View className="flex   flex-1 flex-col ">
      <HeaderView
        from={'Profile'}
        text={t('title')}
        style={{marginBottom: 0}}
        customView={
          <View className="flex flex-row items-center w-full ">
            {tabs.map((tab, index) => (
              <TouchableOpacity
                key={index}
                className="border-b-[0.5px] px-3 pb-3"
                onPress={tab.onPress}>
                <Text
                  style={{
                    color:
                      currentTab === tab.key ? Colors.primary : Colors.subdued,
                    fontWeight: currentTab === tab.key ? 'bold' : 'normal',
                    fontSize: 12,
                  }}>
                  {tab.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        }
      />

      <FlatList
        data={orderData}
        showsVerticalScrollIndicator={false}
        className="flex flex-col  flex-1 max-h-[90%] w-full "
        keyExtractor={order => order.orderId.toString()}
        numColumns={1}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
        renderItem={({item, index}: {item: OrderType; index: number}) => (
          <UserOrderItem order={item} key={index} index={index} />
        )}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center mt-5">
            <Text className="text-2xl text-gray-400">No Orders Found</Text>
          </View>
        }></FlatList>
    </View>
  );
};

export default UserOrderPage;
