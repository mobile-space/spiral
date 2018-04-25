import React, { Component } from 'react';
import {
  NativeModules,
  Platform,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import { Header, ButtonGroup } from 'react-native-elements';
import { LinearGradient } from 'expo';
class MarketScreen extends Component {

  constructor(props) {
    super(props);

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

  async fetchMarket() {
    
    console.log("Updating")
    this.setState({ isFetchingMarket: true });
    const url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,DASH,BCH,XMR,ZEC,MKR,NEO,BCP,XRP&tsyms=BTC,USD';

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
          <View style={{justifyContent: 'center'}}>
            <Text style = {{fontSize: 17, color: 'white', }}> {this.state.active == 0 ? '₿': '$'} </Text>
          </View>
          <View style={styles.priceBox}>
            <Text style={{ fontSize: 18, color: 'white', marginLeft: 0, fontWeight: 'bold'}}> 
              {this.state.active == 0 ? ((coin.BTC).toFixed(4)) : (coin.USD).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    )
  }
  updateIndex = (selectedIndex) => {
    this.setState({active: selectedIndex})
  }

  loadingView() {
    return(
      <View style={styles.loadingView}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  contentView() {
    const {isFetchingMarket, market, active} = this.state;
    const currencyChoice = ['BitCoin','USD'];
    return (

      <View style = {{flex: 1,backgroundColor: 'transparent' }} >

        <View style={styles.buttonGroupContainer} >
          <ButtonGroup
            buttons = {currencyChoice}
            containerStyle = {styles.buttonStyle}
            textStyle = {{color: 'white'}}
            selectedIndex = {active}
            onPress = {this.updateIndex}
            selectedButtonStyle = {{backgroundColor: '#006600'}}
            selectedTextStyle = {{color: 'white'}}
          />
        </View>
        <FlatList style={{marginTop: 15}}
          keyExtractor={(item, transaction) => transaction}
          data={market}
          extraData = {this.state}
          renderItem={({ item }) => this._renderList({ item })}
          onRefresh={() => this.fetchMarket()}
          refreshing={isFetchingMarket}
        />
      </View>
    )
}

  render() {
    const { isFetchingMarket, market, active } = this.state
    
    return (
      <LinearGradient
      style={{ flex: 1 }}
      colors={['#000000', '#323232']}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 1.0, y: 1.0 }}
      locations={[0.2, 0.8]}
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
        <ScrollView style={{ flex: 1 }}>
          { isFetchingMarket ? this.loadingView() : this.contentView() }
        </ScrollView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    height: 60,
    borderColor: 'white',
    borderBottomWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: 'rgba(132,132,132, 0.2)', 
    borderWidth: 0, 
  },
  priceCointainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  priceBox: {
    height: 40,
    width: 100,
    backgroundColor: "rgba(132,132,132, 0.2)",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  coinNameText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'normal'
  },
});

export default MarketScreen;
