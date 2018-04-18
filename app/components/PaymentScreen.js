import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Platform} from 'react-native';
import { LinearGradient } from 'expo';

export default class componentName extends Component {
  
  constructor(props){
    super(props)

    this.state = {
      isPaymentFinished: false,
      payment: null
    }

  }

  componentDidMount = async () => {
    this.createTransaction();
  }

  checkPaymentStatus = async () => {

      console.log("TEST");
      try {
        let response = await fetch(`https://crypto-payment-processor.herokuapp.com/payment/status`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
        });
        var responseJSON = null; 
  
        if (response.status === 200) {
          responseJSON = await response.json();
          console.log(responseJSON);
        } else {
          console.log(response.status);
        }
      } catch(error){
        console.log(error);
      }
    }
  
  paymentStatusCallBack = () => {
    setInterval(function() {
      this.checkPaymentStatus();
    }, 600);
  }

  createTransaction = async () => {

    try {
      let response = await fetch(`https://crypto-payment-processor.herokuapp.com/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
      });

    var responseJSON = null; 

      if (response.status === 200) {
        responseJSON = await response.json();
        console.log(responseJSON);
  
        // this.paymentStatusCallBack();
        this.setState({
          isPaymentFinished: true,
          payment: responseJSON,
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
      <LinearGradient
          style={{flex: 1}}
          colors={['#11998e','#38ef7d']}
          start={{x: 0.0, y: 0.0}}
          end={{x:1.0, y: 1.0}}
          locations={[0.1, 0.8]}
      >
        <SafeAreaView style={styles.safeAreaView}>

        </SafeAreaView>
      </LinearGradient>

    );
  }
}



const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : NativeModules.StatusBarManager.HEIGHT,
  }
  
});