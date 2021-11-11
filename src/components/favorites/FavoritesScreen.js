import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import FavoritesEmptyState from './FavoritesEmptyState';
import Colors from '../../utils/colors';
import Store from '../../utils/storage';
import {CoinsItem} from '../coins/CoinsItem';
class FavoritesScreen extends Component {
  state = {
    favorites: [],
  };

  getFavorite = async () => {
    try {
      const allKeys = await Store.instance.getAllKeys();
      const keys = allKeys.filter(key => key.includes('favorite-'));
      const favs = await Store.instance.getAll(keys);
      const favorites = favs.map(fav => JSON.parse(fav[1]));
      console.log('favs', favorites);
      this.setState({favorites: favorites});
    } catch (error) {
      console.log(`get favorite error ${error}`);
    }
  };

  handlerPress = coin => {
    this.props.navigation.navigate('Detail', {coin});
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', this.getFavorite);
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', this.getFavorite);
  }

  render() {
    const {favorites} = this.state;
    return (
      <View style={styles.container}>
        {favorites.length === 0 ? <FavoritesEmptyState /> : null}
        {favorites.length > 0 ? (
          <FlatList
            data={favorites}
            renderItem={({item}) => (
              <CoinsItem item={item} onPress={() => this.handlerPress(item)} />
            )}
          />
        ) : null}
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
