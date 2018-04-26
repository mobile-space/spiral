import React, { Component } from 'react';
import {
  ActivityIndicator,
  NativeModules,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  View,
  SectionList,
  Alert
} from 'react-native';

import { LinearGradient } from 'expo';
import { Header, Icon } from 'react-native-elements';

var complete = [];
var incomplete = [];
var pending = [];

class TransactionsScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isFinishedLoadingTransactions: false,
      transactions: null,
    }
  }
  

  componentDidMount = async () => {
    this.fetchTransactions();
  }

  fetchTransactions = async () => {

    try {
      let response = await fetch(`https://crypto-payment-processor.herokuapp.com/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
      });

      var responseJSON = null;
      if (response.status === 200) {
        responseJSON = await response.json();
        const transactions = this.filterTransactions(responseJSON);

        this.setState({
          isFinishedLoadingTransactions: true,
          transactions: transactions,
        })
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  filterTransactions = (transactions) => {
    var filteredTransactions = [];

    transactions.forEach(transaction => {
      const status = transaction.status;
      var date = new Date(transaction.time_created * 1000);

      timeStamp = date.getDate() + '/' + (date.getMonth()) + '/' + date.getFullYear() + " " + date.getHours() + ':' + date.getMinutes();

      transaction.timeStamp = timeStamp;
      
      if (status == 100 || status == 0 || status == -1) {
        filteredTransactions.push(transaction);
      }

      if(status == 0 )
      {
        pending.push(transaction);
      }
      else if( status == -1) {
        incomplete.push(transaction);
      }
      else if( status == 100)
      {
        complete.push(transaction);
      }
    });
    return filteredTransactions;
  }

  _renderTransaction = ({ item: transaction }) => {
    return (
      <View style={ styles.transactionContainer }>
        <View style={ styles.timeStampContainer }>
          <Text style = { styles.timeStampText }> { transaction.timeStamp } </Text>
        </View>

        <View style={ styles.amountCountainer }>
          <Text style={ styles.amountText }> { transaction.coin } { transaction.amountf } </Text>
        </View>
      </View>
    );
  }
  
  getSectionsData() {
    return (
      [ 
        { title: 'Complete', data: complete }, 
        { title: 'Pending', data: pending }, 
        { title: 'Incomplete', data: incomplete }
      ]
    )
  }

  render() {
    const { transactions, isFinishedLoadingTransactions } = this.state;

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
            text: 'Transactions',
            style: {
              color: '#FFF',
              fontSize: 24,
              fontWeight: 'bold',
            },
          }}
        />
        <ScrollView contentContainerStyle={styles.container}>
          <View style = {styles.balanceContainer}>
            <Text style={styles.balanceText}> Balance: 55 BTC </Text>
          </View>

          {isFinishedLoadingTransactions ? (
            <SectionList
              renderItem={( {item} ) => this._renderTransaction({item})} 
              renderSectionHeader={({ section: { title } }) => <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, marginLeft: 15, paddingTop: 10, borderBottomWidth: 3, borderBottomColor: 'rgba(217,56,239, 0.8)'}}>{title}</Text>}              
              sections={this.getSectionsData()} 
              keyExtractor={(item, index) => item + index} />
          ) : (
            <View style={{ marginTop: 36 }}>
              <ActivityIndicator size="large" color="#FFF" />
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : NativeModules.StatusBarManager.HEIGHT,
  },

  transactionContainer: {
    flexDirection: 'row',
    flex: 1,
    paddingLeft: 5,
    paddingTop: 10,
    borderRadius: 10,
    borderBottomColor: 'rgba(217,56,239, 0.4)',
    borderBottomWidth: 1,
  },

  balanceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 60, 
    backgroundColor: 'rgba(217,56,239, 0.1)',
    borderRadius: 10,
  },  

  timeStampContainer: {
    flex: 1,
    justifyContent: 'flex-start'
  },

  balanceText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },  

  amountCountainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  amountText: {
    padding: 5,
    color: '#FFF',
    fontSize: 16
  },

  timeStampText: {
    padding: 5,
    color: '#FFF',
    fontSize: 20
  }
});

export default TransactionsScreen;
