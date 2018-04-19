import React, { Component } from 'react';
import {
  NativeModules,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  View,
} from 'react-native';

class TransactionsScreen extends Component {

  constructor(props){
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

      console.log(responseJSON)

      const transactions = this.filterTransactions(responseJSON);

      this.setState({
        isFinishedLoadingTransactions: true,
        transactions: transactions,
      })

    } else {
      console.log(response.status);
    }
    } catch(error){
      console.log(error);
    }
  } 

  filterTransactions = (transactions) => {
    var filteredTransactions = [];

    transactions.forEach(transaction => {
      if(transaction.status == 100 || transaction.status == 0){
        filteredTransactions.push(transaction);
      }
    });
    return filteredTransactions;
  }


  _renderTransaction = ({item: transaction}) => {
    return(
      <View style={[
        styles.transactionContainer,
        {backgroundColor: transaction.status == 100 ? 'green' : 'yellow'}
      ]}>
        <View style={styles.coinContainer}>
          <Text style={styles.coin}>{transaction.coin}</Text>
        </View>

        <View style={styles.amountCountainer}>
          <Text style={styles.amount}>{transaction.amountf}</Text>
        </View>
      </View>
    );
  
  }

  render() {
    const { transactions, isFinishedLoadingTransactions  } = this.state; 

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView>
          { isFinishedLoadingTransactions &&
            <FlatList
              keyExtractor = {(item, index) => index}
              data = {transactions}
              renderItem = {({item}) => this._renderTransaction({item})}
            />
          }
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : NativeModules.StatusBarManager.HEIGHT,
  },

  transactionContainer:{
    flexDirection: 'row',
    flex: 1,
  },

  coinContainer: {
    flex: 1,
    justifyContent: 'flex-start'
  },

  amountCountainer: {
    flex: 1,
  },

  amount: {
    padding: 10,
  },

  coin: {
    padding: 10,
  }
});

export default TransactionsScreen;
