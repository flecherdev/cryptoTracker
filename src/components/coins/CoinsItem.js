import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export const CoinsItem = ({item}) => {
  return (
    <View style={style.container}>
      <View style={style.row}>
        <Text style={style.symbolText}>{item.symbol}</Text>
        <Text style={style.nameText}>{item.name}</Text>
        <Text style={style.priceText}>{`$${item.price_usd}`}</Text>
      </View>
      <View style={style.row}>
        <Text style={style.percentText}>{item.percent_change_1h}</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
  },
  symbolText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
  },
  nameText: {
    color: '#fff',
    fontSize: 14,
  },
  priceText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 16,
  },
  percentText: {
    color: '#fff',
    fontSize: 12,
  },
});
