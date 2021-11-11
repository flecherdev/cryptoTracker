import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SectionList,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import Colors from '../../utils/colors';
import Http from '../../libs/http';
import CoinsMarketItem from './CoinsMarketItem';
import Store from '../../utils/storage';

class CoinsDetailScreen extends Component {
  state = {
    coin: {},
    markets: [],
    isFavorite: false,
  };

  getSymbolIcon = name => {
    if (name) {
      const symbol = name.toLowerCase().replace(' ', '-');
      return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
    }
  };

  getSection = coin => {
    const section = [
      {
        title: 'Market cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24],
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h],
      },
    ];

    return section;
  };

  getMarket = async coinId => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    const markets = await Http.instance.get(url);
    this.setState({markets});
  };

  toogleFavorite = () => {
    if (this.state.isFavorite) {
      this.removeFavorite();
    } else {
      this.addFavorite();
    }
  };

  addFavorite = async () => {
    const coin = JSON.stringify(this.state.coin);
    const key = `favorite-${this.state.coin.id}`;
    const stored = await Store.instance.store(key, coin);
    console.log('store ', stored);
    if (stored) {
      this.setState({isFavorite: true});
    }
  };

  removeFavorite = async () => {
    Alert.alert('Remove favorite', 'Are you sure?', [
      {text: 'cancel', onPress: () => {}, style: 'cancel'},
      {
        text: 'remove',
        onPress: async () => {
          const key = `favorite-${this.state.coin.id}`;
          await Store.instance.remove(key);
          this.setState({isFavorite: false});
        },
        style: 'destructive',
      },
    ]);
  };

  getFavorite = async () => {
    try {
      const key = `favorite-${this.state.coin.id}`;
      const favStr = await Store.instance.get(key);
      if (favStr != null) {
        this.setState({isFavorite: true});
      }
      console.log(`fav ${favStr}`);
    } catch (error) {
      console.log(`get favorite error ${error}`);
    }
  };

  componentDidMount() {
    const {coin} = this.props.route.params;
    this.getMarket(coin.id);
    this.setState({coin}, () => {
      this.getFavorite();
    });
    this.props.navigation.setOptions({title: coin.symbol});
  }

  render() {
    const {coin, markets, isFavorite} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.subheader}>
          <View style={styles.row}>
            <Image
              style={styles.iconImage}
              source={{uri: this.getSymbolIcon(coin.name)}}
            />
            <Text style={styles.titleText}>{coin.name}</Text>
          </View>
          <Pressable
            onPress={this.toogleFavorite}
            style={[
              styles.btnFavorite,
              isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
            ]}>
            <Text style={styles.btnFavoriteText}>
              {isFavorite ? 'Remove favorite' : 'Add favorite'}
            </Text>
          </Pressable>
        </View>
        <SectionList
          style={styles.section}
          sections={this.getSection(coin)}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <View style={styles.sectionItem}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({section}) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionText}>{section.title}</Text>
            </View>
          )}
        />
        <Text style={styles.marketTitle}>Markets</Text>
        <FlatList
          style={styles.list}
          horizontal={true}
          keyExtractor={item => `${item.base}-${item.name}-${item.quote}`}
          data={markets}
          renderItem={({item}) => <CoinsMarketItem item={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  row: {
    flexDirection: 'row',
  },
  subheader: {
    backgroundColor: 'rgba(0,0,0, 0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
    marginLeft: 16,
  },
  iconImage: {
    width: 25,
    height: 25,
  },
  section: {
    maxHeight: 220,
  },
  list: {
    maxHeight: 100,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0, 0.1)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: Colors.white,
    fontSize: 14,
  },
  sectionText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  marketTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 16,
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoriteAdd: {
    backgroundColor: Colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: Colors.carmine,
  },
  btnFavoriteText: {
    color: Colors.white,
  },
});

export default CoinsDetailScreen;
