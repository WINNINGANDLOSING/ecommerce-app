import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {Colors} from '../../styles/colors';

const defaultStyle = {
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 12,
  paddingBottom: 12,
  backgroundColor: Colors.accent,
  width: '80%',
};
//         className="mt-auto mb-5 w-[70%] px-5 py-3 rounded-lg flex items-center "

type Props = {
  title: string;
  onPress: () => void;
  style?: object; // Optional override style
  textStyle?: object; // Optional override text style
};

const CustomButton = ({
  title, 
  onPress, 
  style = {}, 
  textStyle = {}}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={{...defaultStyle, ...style}}>
      <Text className="text-xl" style={textStyle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
