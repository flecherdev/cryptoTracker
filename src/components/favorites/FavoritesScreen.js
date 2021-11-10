import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FavoritesEmptyState from './FavoritesEmptyState';
import Colors from '../../utils/colors';

class FavoritesScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FavoritesEmptyState />
        <Text>hola</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.charade,
    flex: 1,
  },
});

export default FavoritesScreen;
