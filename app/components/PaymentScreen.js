import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Platform} from 'react-native';
import { LinearGradient } from 'expo';

export default class componentName extends Component {
  
  constructor(props){
    super(props)

    this.state = {
      isTransactionFinishedFetching: false
    }
  }

  componentDidMount = async () => {
    this.createTransaction();
  }

  createTransaction = async () => {

    try {
      let response = await fetch(`http://localhost:3000/payment`, {
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
    } catch(error){
      console.log(error);
    }
  }
  //copy address to clipboard
  _setContent = () => {
    Clipboard.setString();
  }

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
      <LinearGradient
          style={{flex: 1}}
          colors={['#11998e','#38ef7d']}
          start={{x: 0.0, y: 0.0}}
          end={{x:1.0, y: 1.0}}
          locations={[0.1, 0.8]}
      >

      </LinearGradient>

      </SafeAreaView>
    );
  }
}



const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : NativeModules.StatusBarManager.HEIGHT,
  }
  
});