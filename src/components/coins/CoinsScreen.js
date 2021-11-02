import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Http from '../../libs/http';
import {CoinsItem} from './CoinsItem';

class CoinsScreen extends Component {
  state = {
    coins: [],
    loading: false,
  };

  componentDidMount = async () => {
    this.setState({loading: true});
    const res = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );
    console.log('coins', res.data);
    this.setState({coins: res.data, loading: false});
  };

  handlerPress = () => {
    console.log('Press Handler', this.props.navigation.navigate);
    this.props.navigation.navigate('Detail');
  };

  render() {
    const {coins, loading} = this.state;
    return (
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator style={styles.loader} size="large" />
        ) : null}
        <FlatList
          data={coins}
          renderItem={({item}) => <CoinsItem item={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    color: 'black',
  },
  titleText: {
    color: '#fff',
    textAlign: 'center',
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
  loader: {
    marginTop: 60,
    color: '#7F8C8D',
  },
});

export default CoinsScreen;
