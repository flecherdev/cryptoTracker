import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Colors from '../../utils/colors';

class CoinsDetailScreen extends Component {
  state = {
    coin: {},
  };

  getSymbolIcon = name => {
    if (name) {
      const symbol = name.toLowerCase();
      return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
    }
  };

  componentDidMount() {
    const {coin} = this.props.route.params;
    this.setState({coin});
    this.props.navigation.setOptions({title: coin.name});
  }

  render() {
    const {coin} = this.state;
    return (
      <View>
        <View>
          <Image
            style={styles.iconImage}
            source={{uri: this.getSymbolIcon(coin.symbol)}}
          />
          <Text>{coin.name}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconImage: {
    width: 25,
    height: 25,
  },
});

export default CoinsDetailScreen;
