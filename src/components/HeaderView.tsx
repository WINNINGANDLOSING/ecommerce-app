import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {ReactNode} from 'react';
import BackButton from './BackButton';
import {ComponentStyles} from '../styles/components';
import {Colors} from '../styles/colors';

const defaultStyle = {
  ...ComponentStyles.otherHeaderView,
};

type Props = {
  from: string;
  text: string;
  fromItem?: any | null;
  isShownBackBtn?: boolean;
  fnText?: string;
  fn?: () => {};
  isDisabled?: boolean;
  style?: object;
  customView?: ReactNode;
};

const HeaderView = ({
  from,
  fromItem,
  text,
  isShownBackBtn = true,
  fnText = '',
  fn,
  isDisabled,
  style = {},
  customView,
}: Props) => {
  return (
    <View className="flex bg-white flex-col">
      <View style={{...defaultStyle, ...style}}>
        <View style={{opacity: isShownBackBtn ? 1 : 0}}>
          <BackButton from={from} fromItem={fromItem} />
        </View>
        <Text className="text-2xl font-bold  text-gray-700 text-center">
          {text}
        </Text>
        {!fnText ? (
          <Text className="text-xl text-transparent">Lưu </Text>
        ) : (
          <TouchableOpacity onPress={fn} disabled={isDisabled}>
            <Text
              className="font-bold text-lg"
              style={{color: isDisabled ? Colors.subdued : Colors.primary}}>
              {fnText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {customView && <View>{customView}</View>}
    </View>
  );
};

export default HeaderView;
