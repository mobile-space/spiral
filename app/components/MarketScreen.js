import React, { Component } from 'react';
import { 
  View, 
  Text,  
  StyleSheet,
  FlatList,
  ScrollView
} from 'react-native';

import { DIGITAL_MOCK_DATA } from '../utils/constant';


class MarketScreen extends Component {

  _renderList(coin){
    return(
      <View style={styles.listContainer} key={coin}>
        <View style={styles.coinContainer} >
          <View style={styles.AbrCointaner} >
            <Text style={{fontSize: 20}}> {coin.abr} </Text>
          </View>
          <View style={styles.nameCointaner} >
            <Text style={{color: 'grey'}}> {coin.name} </Text>
          </View>
        </View>
        <View style={styles.graphContainer}>
          {/* <Text> graph </Text> */}
        </View>
        <View style={styles.priceCointainer}>
          <View style={styles.priceBox}>
            <Text style={{fontSize: 18, color: 'white'}}> {coin.price} </Text>
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (
    <ScrollView>
        <FlatList
          keyExtractor = {(item, index) => index}
          data = {DIGITAL_MOCK_DATA}
          renderItem = {({item}) => this._renderList(item)}
        />

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