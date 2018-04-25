import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, NativeModules, Platform, TouchableOpacity, Dimensions, Image, Animated, Easing, ScrollView } from 'react-native';
import { LinearGradient } from 'expo';
import { Header, Icon } from 'react-native-elements';
import LottieView from 'lottie-react-native';

export default class PaymentScreen extends Component {

  static NavigationOptions = {

  }
  constructor(props){
    super(props)

    this.state = {
      isTransactionFinishedLoading: false,
      isTransactionPending: true,
      transaction: null,
      interval: null,
      coin: null,
      progress: new Animated.Value(0),
      transactionStatus: null,
    }
  }

  componentDidMount = async () => {
    this.createTransaction();
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  checkTransactionStatus = (status) => {

    console.log(status)
    
    if( status == 100){
      this.setState( { isTransactionPending: false })
    }
  } 

  paymentStatusCallBack = async () => {

  const { transaction } = this.state;
  var responseJSON = null;
    
  var interval = setInterval(async function() {

      var details = { };
      details.transactionID = transaction.txn_id
      
      var formBody = [ ];

      for ( var property in details ) {
        var encodedKey = encodeURIComponent( property );
        var encodedValue = encodeURIComponent( details[ property ] );

        formBody.push( encodedKey + "=" + encodedValue );
      }

      formBody = formBody.join("&");
      
      try {
        let response = await fetch( `https://crypto-payment-processor.herokuapp.com/payment/info` , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: formBody
        });
        
        if ( response.status === 200 ) {
          responseJSON = await response.json();
          checkTransactionStatus(responseJSON.status);    
        } else {
        }
      } catch(error){
        console.log(error);
      }
    }, 6000);
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
        this.setState({
          transaction: responseJSON,
          isTransactionFinishedLoading: true,
        })
        this.paymentStatusCallBack();
      } else {
        console.log(response.status);
      }
    } catch(error){
      console.log(error);
    }
  }

  renderTransactionStatusIndicator = () => {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
    }).start();

    return(
      <View style = { styles.loadingTransaction }>
        <LottieView
          source= { require('../../assets/lottie/wallet_coin.json' ) } 
          progress= { this.state.progress }
          onPress={ () => this.props.navigation.navigate( 'pos' )}
        />
      </View>
    )
  }
 
  renderTransactionPendingIndicator = () => {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
    }).start();

    return(
      <View style = { styles.pendingTransaction }>
        <LottieView
          source= { require('../../assets/lottie/snap_loader_white.json' ) } 
          progress= { this.state.progress }
        />
      </View>
    )
  }

  renderLoadingTransactionIndicator = () => {

    Animated.timing( this.state.progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
    }).start();

    return(
      <View style = { styles.loadingTransaction }>
        <LottieView
          source= { require('../../assets/lottie/snap_loader_white.json' ) } 
          progress= { this.state.progress }
        />
      </View>
    )
  }

  //copy address to clipboard
  _setContent = () => {
    Clipboard.setString();
  }

  render() {
    const { navigation: { goBack } } = this.props 
    const { transaction, isTransactionFinishedLoading, isTransactionPending } = this.state
    const qrDimension = Dimensions.get( 'window' ).width * 0.5

    return (
      <LinearGradient
        style={{ flex: 1 }}
        colors={['#000000', '#323232']}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        locations={[0.2, 0.8]}
      >
      <Header
          outerContainerStyles = {{
            marginTop: 24,
            marginBottom: 16,
            borderBottomWidth: 0,
          }}
          backgroundColor= "rgba(0.0, 0.0, 0.0, 0.0)"
          leftComponent= {
            <TouchableOpacity onPress = { () => goBack() }>
              <Icon
                color = "#FFF"
                name = "arrow-left"
                type = "material-community"
              />
            </TouchableOpacity>
          }
          centerComponent= {{
            text: 'Payment',
            style: {
              color: '#FFF',
              fontSize: 24,
              fontWeight: 'bold',
            },
          }}
        />
        <SafeAreaView style = { styles.safeAreaView }>
        <ScrollView contentContainerStyle = { styles.container}>
        <View style = {{ paddingTop: 10}}>

          { isTransactionFinishedLoading && 
            <View style = { styles.paymentContainer }>

              <View style = { styles.qrContainer }>
                <Image
                  source={{ uri: transaction.qrcode_url }}
                  style={{
                    width: qrDimension,
                    height: qrDimension,
                    borderRadius: 20
                  }}
                />
              </View>

              <View style = { styles.amountContainer }>
                <View style = { styles.amountLabelContainer }>
                    <Text style= { styles.amountLabelText }> Payment Amount: </Text>
                </View>

                <View style = { styles.amountTransactionContainer }>
                  <Text style = { styles.amountTransactionText }> { transaction.amount} BTC</Text>
                </View>

              </View>

              <View style = { styles.addressContainer }>

                <View style = { styles.addressLabelContainer }>
                    <Text style= { styles.addressLabelText }> Payment Address: </Text>
                </View>

                <View style = { styles.addressTransactionContainer }>
                  <Text style = { styles.addressTransactionText }> { transaction.address }</Text>
                </View>

              </View>
            </View>
          }
        </View>
        {
          !isTransactionFinishedLoading && this.renderLoadingTransactionIndicator()
        }
        <View style= { styles.pendingTransactionContainer }>
          {
            isTransactionFinishedLoading && isTransactionPending && this.renderTransactionPendingIndicator() 
          }
          { 
            isTransactionFinishedLoading && !isTransactionPending && this.renderTransactionStatusIndicator() 
          }
        </View>
        
        <TouchableOpacity
          style = { styles.goBackContainer }
          onPress= { () => this.props.navigation.navigate('pos') }
        >
          <View style = { styles.goBackButton }>
            <Text style = { styles.goBackButtonText }> Go Back </Text>
          </View>

        </TouchableOpacity>
        </ScrollView>

        </SafeAreaView>
        

      </LinearGradient>

    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 0 : NativeModules.StatusBarManager.HEIGHT,
  },

  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  paymentContainer: {
  },

  
  addressContainer: {
    marginTop: 5,
  },

  amountContainer: {
    marginTop: 5,
  },

  amountLabelContainer: {

  },

  amountLabelText: {
    color: '#fff', 
    fontSize: 12,
    fontWeight: 'normal'
  }, 

  amountTransactionText: {
    padding: 15,
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold', 
  },

  amountTransactionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#006600',
    borderRadius: 40,
    marginTop: 5,
  },

  addressLabelText: {
    color: '#fff', 
    fontSize: 12,
    fontWeight: 'normal'
  },

  addressTransactionText: {
    padding: 15,
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  addressTransactionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#006600',
    borderRadius: 40,
    marginTop: 5,
  },

  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  goBackContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },

  goBackButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ef384e',
    width: Dimensions.get( 'window' ).width * 0.5,
    borderRadius: 20,
    padding: 10
  },

  goBackButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  pendingTransaction: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get( 'window' ).width * 0.5,
    height: Dimensions.get( 'window' ).width * 0.5,
    padding: 10,
  },

  loadingTransaction: {
    width: Dimensions.get( 'window' ).width * 0.5,
    height: Dimensions.get( 'window' ).width * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  pendingTransactionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: Dimensions.get( 'window' ).width * 0.5,
    height: Dimensions.get( 'window' ).width * 0.5,
  }
});