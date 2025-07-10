import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderView from '../components/HeaderView';
import {useTranslation} from 'react-i18next';
import {Typography} from '../styles/typography';
import {Colors} from '../styles/colors';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import MainView from '../components/subComponents/MainView';
import {handleConvertFromTimestampToDate} from '../utils/timestamp';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NotificationCenterStackParamList} from '../routes/AppStack';
import NotificationCenterItems from '../components/NotificationCenterItems';
import {handleMarkNotifRead} from '../utils/notificationsFunction';
import ConfirmModal from '../components/ConfirmModal';
import {AdditionalOrderInfoType} from '../types';
type NotificationScreenProp = NativeStackScreenProps<
  NotificationCenterStackParamList,
  'NotificationCenter'
>;
/* 
export type NotificationType = {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: 'order_update' | 'promotion' | 'reminder';
  metadata?: {
    brandOrder: BrandOrderType;
    orderId?: string;
    brand?: string;
    status?:
      | 'pending'
      | 'processing'
      | 'in_delivery'
      | 'cancelled'
      | 'completed';
  };
  read: boolean;
  createdAt: Timestamp | Date | string;
};

*/
const NotificationCenter = ({navigation}: NotificationScreenProp) => {
  const {t} = useTranslation('notificationCenter');
  const orders = useSelector((state: RootState) => state.userOrder.value);

  const notifs = useSelector((state: RootState) => state.notifications.value);
  const dispatch = useDispatch();
  const [isShownReadAllModal, setIsShownReadAllModals] = useState(false);
  const handleReadAll = async () => {
    try {
      for (const notif of notifs) {
        await handleMarkNotifRead(dispatch, notif);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log('notifs', notifs);
  }, [notifs]);
  return (
    <View className="flex flex-col">
      <HeaderView isShownBackBtn={false} from="" text={t('title')} />
      <View className="flex flex-row items-center justify-between p-5">
        <Text style={{color: Colors.muted}}>{t('orderUpdates')}</Text>
        <TouchableOpacity onPress={() => setIsShownReadAllModals(true)}>
          <Text style={{color: Colors.highlight, fontWeight: 'bold'}}>
            {t('readAll')}
          </Text>
        </TouchableOpacity>
        <ConfirmModal
          onCancel={() => setIsShownReadAllModals(false)}
          visible={isShownReadAllModal}
          onConfirm={handleReadAll}
          title="Are you sure you want to mark all notifications read ?"
        />
      </View>

      <FlatList
        data={notifs}
        keyExtractor={notif => notif.id}
        renderItem={({item}) => <NotificationCenterItems notif={item} />}
      />
    </View>
  );
};

export default NotificationCenter;
