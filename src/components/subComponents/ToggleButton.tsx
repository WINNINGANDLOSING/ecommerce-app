import {View, Pressable, Animated} from 'react-native';
import {useRef, useEffect} from 'react';
import {Colors} from '../../styles/colors';

type Props = {
  isOn: boolean;
  onToggle: (newValue: boolean) => void;
  disable?: boolean;
};

const ToggleButton = ({isOn, onToggle, disable = false}: Props) => {
  const animation = useRef(new Animated.Value(isOn ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isOn ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOn]);

  const translateX = animation.interpolate({
    inputRange: [0, 1], // toValue: isOn ? 0 : 1,
    outputRange: [2, 30], // animation value is 0 => 2 pixel, animation value is 1 => 24 pixel
  });

  return (
    <Pressable
      disabled={disable}
      onPress={() => onToggle(!isOn)}
      className={`w-16 rounded-full   p-[2px] `}
      style={{backgroundColor: isOn ? Colors.accent : Colors.muted}}>
      <Animated.View // the circle thing
        style={{transform: [{translateX}]}}
        className={`w-6 h-6 rounded-full bg-white shadow'
          ${isOn ? 'bg-white' : 'bg-green-200'},
        `}
      />
    </Pressable>
  );
};

export default ToggleButton;
