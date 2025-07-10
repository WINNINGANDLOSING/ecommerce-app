import {View, Text, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomStackParamList, CartStackParamList} from '../routes/AppStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../styles/global';
import {CompositeScreenProps} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
type OrderPageScreenProps = CompositeScreenProps<
  NativeStackScreenProps<CartStackParamList, 'OrderSuccessPage'>,
  NativeStackScreenProps<BottomStackParamList>
>;

const OrderSuccessPage = ({navigation}: OrderPageScreenProps) => {
  const {t} = useTranslation('orderSuccess');
  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Ionicons name="checkmark-circle" size={100} color={Colors.primary} />
      <Text className="text-3xl font-bold  mt-6"> {t('confirm')}</Text>
      <Text className="text-center text-gray-600 mt-4 text-base">
        {t('message')}
      </Text>

      <TouchableOpacity
        className=" mt-10 px-6 py-3 rounded-full"
        style={{backgroundColor: Colors.accent}}
        onPress={() => navigation.navigate('HomeTab')}>
        <Text className="text-white font-semibold text-lg">
          {t('backToHome')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderSuccessPage;
