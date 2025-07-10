import React from 'react';
import {useColorScheme, View, Text, StyleSheet} from 'react-native';

const AppPro = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.container}>
      <Text style={isDarkMode ? styles.whiteText : styles.blackText}>Dark MOde Test</Text>
    </View>
  );
};

const styles=StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center'
    },
    whiteText:{
        color: '#FFFFFF'
    },
    blackText:{
        color: '#000000'
    }
})

export default AppPro;
