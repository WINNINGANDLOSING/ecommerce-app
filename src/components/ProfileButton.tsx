import {Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const ProfileButton = ({
  icon,
  label,
  onPress,
}: {
  icon: string;
  label: string;
  onPress: () => void;
}) => (
  <TouchableOpacity
    className="rounded-full min-w-[20vw] mt-3 items-center flex flex-row  p-4"
    onPress={onPress}>
    <Ionicons name={icon} size={25} />
    <Text className="ml-5 text-xl">{label}</Text>
  </TouchableOpacity>
);
