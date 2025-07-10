import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Text,
  DeviceEventEmitter,
  TouchableOpacity,
  Platform,
  ToastAndroid,
} from 'react-native';
import {SHOW_TOAST_MESSAGE} from '../constants/toast';

import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

// const colors = {
//   info: '#343a40',
//   success: '#28a745',
//   danger: '#dc3545',
// };

const Toast = () => {
  // messageType: cart, login success...
  const [messageType, setMessageType] = useState(null);
  // reference to clear the timer later
  const timeOutRef = useRef(null);

  // opacity of the toast
  // start at 0 (hidden)
  // when triggered will animate to opacity 1 using useAnimateStyle (reanimated)
  const animatedOpacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedOpacity.value,
    };
  }, []);

  // the time out duration (how long the toast appears) default to to 5 second, will later changes to whatever value user set
  const [timeOutDuration, setTimeOutDuration] = useState(5000);

  // the message to be displayed
  const [message, setMessage] = useState(null);

  // When this components hear emit() from DeviceEmitter
  // Create a new Toast
  // if the platform is Android, then use ToastAndroid
  // Otherwise, set the message and message type (cart, login success, failure etc)
  const onNewToast = data => {
    if (Platform.OS === 'android' && data.useNativeToast) {
      return ToastAndroid.show(data.message, ToastAndroid.LONG);
    }
    if (data.duration) {
      setTimeOutDuration(data.duration);
    }
    setMessage(data.message);
    setMessageType(data.type);
  };

  // clear the message
  // set the time out duration back to 5 sec
  // set the opacity of the toast to 0
  // clearInterval: stop the countdown timer so it stop couting
  const closeToast = useCallback(() => {
    setMessage(null);
    setTimeOutDuration(5000);
    animatedOpacity.value = withTiming(0);
    clearInterval(timeOutRef.current);
  }, [animatedOpacity]);

  // every 1 second (1000), time out duration is subtracted by 1, so 5 -> 4 -> 3
  // when time out duratin hit 0,
  // trigger the closeToast() above
  // clearInternval: clean up, if the toast disappear or the component re render, stop the interval so it doesn't run forever
  useEffect(() => {
    if (message) {
      timeOutRef.current = setInterval(() => {
        if (timeOutDuration === 0) {
          closeToast();
        } else {
          setTimeOutDuration(prev => prev - 1000);
        }
      }, 1000);
    }

    return () => {
      clearInterval(timeOutRef.current);
    };
  }, [closeToast, message, timeOutDuration]);

  // Fade in effect
  // when the message is not null
  // withTiming smoothly animates the opacity from 0 to 1
  useEffect(() => {
    if (message) {
      animatedOpacity.value = withTiming(1, {duration: 1000});
    }
  }, [message, animatedOpacity]);

  useEffect(() => {
    DeviceEventEmitter.addListener('SHOW_TOAST_MESSAGE', onNewToast);

    return () => {
      DeviceEventEmitter.removeAllListeners();
    };
  }, []);

  if (!message) {
    return null;
  }

  return (
    <Animated.View
      className="absolute top-[5%] self-center rounded-xl px-3 max-w-[50%] bg-[#e6f4ea] z-[1] "
      style={animatedStyle}>
      <Text className="p-3 rounded-full  text-[#2e7d32] text-center text-sm ">
        {message}
      </Text>
    </Animated.View>
  );
};

export default Toast;
