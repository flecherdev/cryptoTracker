import React, {Component} from 'react';
import {View, Text} from 'react-native';

class CoinsDetailScreen extends Component {
  state = {
    coin: {},
  };

  componentDidMount() {
    const {coin} = this.props.route.params;
    this.setState({coin});
    this.props.navigation.setOptions({title: coin.symbol});
  }

  render() {
    return (
      <View>
        <Text>Coin Detail Screen</Text>
      </View>
    );
  }
}

export default CoinsDetailScreen;
