import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from '../../styles/colors';
/* 
mainView: {
    ...view,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    marginLeft: 15,
    marginRight: 15,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginBottom: 15,
    flexDirection: 'column' as const,
  },

*/
/* 
const MainView = ({style = {}, children}: Props) => {
  return <View style={{...defaultStyle, ...style}}>{children}</View>;
};

*/
const defaultStyle = {
  backgroundColor: 'white',
  justifyContent: 'space-between' as const,
  paddingHorizontal: 15,
  paddingVertical: 15,
  marginHorizontal: 10,
  marginTop: 10,
  borderTopRightRadius: 10,
  borderTopLeftRadius: 10,
  borderBottomRightRadius: 10,
  borderBottomLeftRadius: 10,
  flexDirection: 'column' as const,
};

type Props = {
  style?: object;
  isTouchable?: boolean;
  onPress?: () => void;
  isPadding?: boolean;
  isMargin?: boolean;
  children?: React.ReactNode;
};
const MainView = ({
  style = {},
  isTouchable = false,
  onPress,
  isPadding = true,
  isMargin = true,
  children,
}: Props) => {
  if (isTouchable) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          ...defaultStyle,
          ...style,
          // ...(!isPadding && {
          //   padding: 0
          // }),
          ...(!isPadding && {
            paddingHorizontal: 0,
            paddingVertical: 0,
          }),
          ...(!isMargin && {
            marginHorizontal: 0,
            marginTop: 0,
          }),
        }}>
        {children}
      </TouchableOpacity>
    );
  }
  return (
    <View
      style={{
        ...defaultStyle,
        ...style,
        ...(!isPadding && {
          paddingHorizontal: 0,
          paddingVertical: 0,
        }),
        ...(!isMargin && {
          marginHorizontal: 0,
          marginTop: 0,
        }),
      }}>
      {children}
    </View>
  );
};

export default MainView;
