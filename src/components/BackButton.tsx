import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  CartStackParamList,
  HomeStackParamList,
  NotificationCenterStackParamList,
  ProfileStackParamList,
} from '../routes/AppStack';
import {Colors} from '../styles/global';
type NavigationPropHome = NativeStackNavigationProp<HomeStackParamList>;
type NavigationPropNotificationCenter =
  NativeStackNavigationProp<NotificationCenterStackParamList>;

type NavigationPropProfile = NativeStackNavigationProp<ProfileStackParamList>;
type NavigationPropCart = NativeStackNavigationProp<CartStackParamList>;

const BackButton = ({from, fromItem}: {from: string; fromItem: any}) => {
  const navigation = useNavigation<
    | NavigationPropHome
    | NavigationPropNotificationCenter
    | NavigationPropProfile
    | NavigationPropCart
  >();
  return (
    //
    <Ionicons
      color={Colors.accent}
      name={'arrow-back-outline'}
      size={30}
      onPress={() => {
        if (from === 'Home') {
          navigation.navigate('Home');
        } else if (from === 'Cart') {
          navigation.navigate('Cart');
        } else if (from === 'Settings') {
          navigation.navigate('Settings');
        } else if (from === 'OrderPage') {
          navigation.navigate('OrderPage');
        } else if (from === 'Categories') {
          navigation.navigate('Categories');
        } else if (from === 'ShippingAddressPage') {
          navigation.navigate('ShippingAddressPage');
        } else if (from === 'UserOrder') {
          navigation.navigate('UserOrder');
        } else if (from === 'NotificationCenter') {
          navigation.navigate('NotificationCenter');
        } else {
          navigation.navigate('Profile', {reason: ''});
        }
      }}
    />
  );
};

export default BackButton;
