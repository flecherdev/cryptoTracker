import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export const CoinsItem = ({item}) => {
  return (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.symbol}</Text>
    </View>
  );
};
