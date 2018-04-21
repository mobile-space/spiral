import React, { Component } from 'react';
import {
  NativeModules,
  Platform,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView
} from 'react-native';

import { Header } from 'react-native-elements';
import { LinearGradient } from 'expo';
class MarketScreen extends Component {

  constructor(props) {
    super(props);
    //Have a state of coins and prices
    //isLoading state 
    //BTC, ETH, DASH, BCH

    this.state = {
      market: null,
      isFetchingMarket: true,
      error: null
    }
  }

  componentDidMount = async () => {
    this.fetchMarket();
  }

  fetchMarket = () => {
    const url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,DASH,BCH&tsyms=BTC,USD';

    this.setState({ isFetchingMarket: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        var market = [];
        var keys = Object.keys(res);

        keys.forEach(function (key) {
          var coin = Object.assign({}, res[key], { name: key })
          market.push(coin);
        });

        this.setState({
          market: market,
          isFetchingMarket: false,
          error: res.error || null,
        })
      }).catch(error => {
        this.setState({
          error: error,
          isFetchingMarket: false,
        })
      })
  }

  _renderList = ({ item: coin }) => {
    return (
      <View style={styles.listContainer}>
        <View style={styles.coinContainer} >
          <View style={styles.AbrCointaner} >
            <Text style={styles.coinNameText}> {coin.name} </Text>
          </View>
          <View style={styles.nameCointaner} >
            {/* <Text style={{color: 'grey'}}> {coin.name} </Text> */}
          </View>
        </View>
        <View style={styles.graphContainer}>
          {/* <Text> graph </Text> */}
        </View>
        <View style={styles.priceCointainer}>
          <View style={styles.priceBox}>
            <Text style={{ fontSize: 18, color: 'white' }}> ${coin.USD} </Text>
          </View>
        </View>
      </View>
    )
  }

  render() {
    const { isFetchingMarket, market } = this.state

    return (
      <LinearGradient
        style={{ flex: 1 }}
        colors={['#3E5151', '#DECBA4']}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        locations={[0.1, 0.8]}
      >
        <ScrollView style={{ flex: 1 }}>
          {!isFetchingMarket &&
            <FlatList
              keyExtractor={(item, transaction) => transaction}
              data={market}
              renderItem={({ item }) => this._renderList({ item })}
            />
          }
        </ScrollView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20
  },

  coinContainer: {
    flex: 1,
    flexDirection: 'column',
  },

  AbrCointaner: {
    marginLeft: 15
  },

  nameCointaner: {
    marginLeft: 15
  },

  graphContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  priceCointainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  priceBox: {
    height: 30,
    width: 80,
    backgroundColor: '#61CA9D',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },

  coinNameText: {
    color: '#fff',
    fontSize: 16,
  },

});


export default MarketScreen;
