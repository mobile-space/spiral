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

import { Header, ButtonGroup } from 'react-native-elements';
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
      error: null,
      active: 0,
    }
  }

  componentDidMount = async () => {
    this.fetchMarket();
  }

  fetchMarket = () => {
    const url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,DASH,BCH,XMR,ZEC,MKR,NEO,BCP,XRP&tsyms=BTC,USD';

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
          <View style={styles.nameCointaner} >
            <Text style={styles.coinNameText}> {coin.name} </Text>
          </View>
        <View style={styles.priceCointainer}>
        <Text style = {{fontSize: 17, color: 'white'}}> {this.state.active == 0 ? '₿': '$'} </Text>
          <View style={styles.priceBox}>
            <Text style={{ fontSize: 18, color: 'white', marginLeft: 0, fontWeight: 'bold'}}> 
              {this.state.active == 0 ? coin.BTC : coin.USD}
            </Text>
          </View>
        </View>
      </View>
    )
  }
  updateIndex = (selectedIndex) => {
    this.setState({active: selectedIndex})
  }

  render() {
    const { isFetchingMarket, market, active } = this.state
    const currencyChoice = ['BitCoin','USD'];
    
    return (
      <LinearGradient
        style={{ flex: 1 }}
        colors={['#3E5151', '#DECBA4']}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        locations={[0.1, 0.8]}
      >
      <Header
          outerContainerStyles={{
            marginTop: 24,
            marginBottom: 16,
            borderBottomWidth: 0,
          }}
          backgroundColor="rgba(0.0, 0.0, 0.0, 0.0)"
          centerComponent={{
            text: " Market ",
            style: {
              color: '#FFF',
              fontSize: 24,
              fontWeight: 'bold',
            },
          }}
        />
        <View style={styles.buttonGroupContainer} >
            <ButtonGroup
              buttons = {currencyChoice}
              containerStyle = {styles.buttonStyle}
              textStyle = {{color: 'white'}}
              selectedIndex = {active}
              onPress = {this.updateIndex}
              selectedButtonStyle = {{backgroundColor: 'white'}}
              selectedTextStyle = {{color: '#3E5151'}}
            />
        </View>

        <ScrollView style={{ flex: 1 }}>
          {!isFetchingMarket &&
            <FlatList style={{marginTop: 15}}
              keyExtractor={(item, transaction) => transaction}
              data={market}
              extraData = {this.state}
              renderItem={({ item }) => this._renderList({ item })}
              //TODO: Full to Refresh
            />
          }
        </ScrollView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    height: 60,
    borderColor: '#aaa',
    borderBottomWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  nameCointaner: {
    flex: 1,
    justifyContent: 'center'
  },
  buttonGroupContainer: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonStyle: {
    height: 30,
    width: 200, 
    borderRadius: 25, 
    backgroundColor: '#3E5151', 
    borderColor: '#3E5151', 
    borderWidth: 0
  },
  priceCointainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  priceBox: {
    height: 40,
    width: 100,
    backgroundColor: "rgba(62,81,81,0.5)",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  coinNameText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
});

export default MarketScreen;
