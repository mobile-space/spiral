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

import { DIGITAL_MOCK_DATA } from '../utils/constant';

class MarketScreen extends Component {

  constructor(props){
    super(props); 
    //Have a state of coins and prices
    //isLoading state 
    //BTC, ETH, DASH, BCH

    this.state = {
      coins: null,
      isFetchingCoins: true,  
    }
  }


  componentDidMount = async () => {
    this.fetchPrices();
  }

  fetchPrices = async () => {

    const bitcoin = DIGITAL_MOCK_DATA[6].abr

    try {
      let response = await fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,DASH,BCH&tsyms=BTC,USD`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
      });

    var responseJSON = null; 
    
    if (response.status === 200) {
      responseJSON = await response.json();
      var result = [];
      var keys = Object.keys(responseJSON);

      keys.forEach(function(key){

        var coin = Object.assign({},responseJSON[key],{name: key}) 

        result.push(coin);
      });

      console.log(result);

      this.setState({
        coins: result,
        isFetchingCoins: false
      })
    } else {
      console.log(response.status);
    }
    } catch(error){
      console.log(error);
    }
  } 

  _renderList = ({item: coin}) => {

    console.log(coin.name);

    return(
      <View style={styles.listContainer}>
        <View style={styles.coinContainer} >
          <View style={styles.AbrCointaner} >
            <Text style={{fontSize: 20}}> {coin.name} </Text>
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
            <Text style={{fontSize: 18, color: 'white'}}> ${coin.USD} </Text>
          </View>
        </View>
      </View>
    )
  }

  render() {
    const {isFetchingCoins, coins} = this.state
    
    return (
    <ScrollView>
      { !isFetchingCoins && 
        <FlatList
          keyExtractor = {(item, index) => index}
          data = {coins}
          renderItem = {({item}) => this._renderList({item})}
        />
      }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    borderColor: '#C3C8C8',
    borderBottomWidth: 1,
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
  }
});


export default MarketScreen;
