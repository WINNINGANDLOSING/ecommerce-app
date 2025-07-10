import React from 'react';
import {SafeAreaView, View, StyleSheet, Text, ScrollView} from 'react-native';

const ElevatedCards = () => {
  return (
    <View className="mt-3">
      <Text style={styles.headingText}>Elevated Cards</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardContainer}>
        <View
          style={[styles.elevatedCard, styles.elevatedCard]}
          className="bg-yellow-100">
          <Text>Tap</Text>
        </View>
        <View
          style={[styles.elevatedCard, styles.elevatedCard]}
          className="bg-yellow-100">
          <Text>me</Text>
        </View>
        <View
          style={[styles.elevatedCard, styles.elevatedCard]}
          className="bg-yellow-100">
          <Text>to</Text>
        </View>
        <View
          style={[styles.elevatedCard, styles.elevatedCard]}
          className="bg-yellow-100">
          <Text>scroll</Text>
        </View>
        <View
          style={[styles.elevatedCard, styles.elevatedCard]}
          className="bg-yellow-100">
          <Text>more...😃</Text>
        </View>
      </ScrollView>
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
    padding: 8,
  },

  elevatedCard: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 3,
    borderRadius: 5,
  },
});

export default ElevatedCards;
