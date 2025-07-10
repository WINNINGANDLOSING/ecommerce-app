import React from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';

const FlatCard = () => {
  return (
    <View className='mt-3'>
      <Text style={styles.headingText}>FlatCard Examples</Text>
      <View style={styles.cardContainer}>
        <View style={[styles.card, styles.redCard]}>
          <Text>Red</Text>
        </View>
        <View style={[styles.card, styles.blueCard]}>
          <Text>Blue</Text>
        </View>
        <View style={[styles.card, styles.greenCard]}>
          <Text>Green</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingLeft: 8,
  },

  cardContainer: {
    flex: 1,
    flexDirection: 'row',
   // padding: 28,
   padding: 8,
  },

  card: {
    width: 100,
    height: 100,
    borderRadius: 4,

    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },

  redCard: {
    backgroundColor: 'red',
    color: 'blue',
  },

  blueCard: {
    backgroundColor: 'blue',
    color: 'green',
  },

  greenCard: {
    backgroundColor: 'green',
    color: 'blue',
  },
});

export default FlatCard;
