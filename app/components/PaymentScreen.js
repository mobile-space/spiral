import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Platform, TouchableOpacity, Dimensions, Image, Animated, Easing} from 'react-native';
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
      transaction: null,
      interval: null,
      progress: new Animated.Value(0),
    }
  }

  componentDidMount = async () => {
    this.createTransaction();
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }
  
  paymentStatusCallBack = async () => {

  const { transaction } = this.state;
    
  var interval = setInterval(async function() {

      var details = {};
      details.transactionID = transaction.txn_id
      
      var formBody = [];

      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);

        formBody.push(encodedKey + "=" + encodedValue);
      }

      formBody = formBody.join("&");
      
      try {
        let response = await fetch(`https://crypto-payment-processor.herokuapp.com/payment/info`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: formBody
        });
        
        var responseJSON = null; 

        console.log(response)
  
        if (response.status === 200) {

          responseJSON = await response.json();
          console.log(responseJSON);
        } else {
          console.log(response.status);
        }
      } catch(error){
        console.log(error);
      }
    }, 6000);

    console.log("test");

    this.setState({interval: interval});
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
          isTransactionFinishedLoading: true,
          transaction: responseJSON,
        })

        console.log(this.state.transaction);

        this.paymentStatusCallBack();
      } else {
        console.log(response.status);
      }
    } catch(error){
      console.log(error);
    }
  }

  renderLoadingTransactionIndicator = () => {

    Animated.timing(this.state.progress, {
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
    const { transaction, isTransactionFinishedLoading } = this.state
    const qrDimension = Dimensions.get( 'window' ).width * 0.5

    return (
      <LinearGradient
          style= {{ flex: 1} }
          colors = {[ '#11998e','#38ef7d' ]}
          start= {{ x: 0.0, y: 0.0 }}
          end= {{ x:1.0, y: 1.0 }}
          locations= {[ 0.1, 0.8 ]}
      >

      <Header
          outerContainerStyles = {{
            marginTop: 24,
            marginBottom: 24,
          }}
          backgroundColor= "rgba(0, 0, 0, 0, 0)"
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
        
        <View style = {{ padding: 10}}>

          {isTransactionFinishedLoading && 
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
                  <Text style = { styles.amountTransactionContainer }> { transaction.amount}</Text>
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
        
        <View style = { styles.statusContainer }>

        </View>


        <TouchableOpacity
          style = { styles.goBackContainer }
          onPress= { () => goBack() }

        >
          <View style = { styles.goBackButton }>
            <Text style = { styles.goBackButtonText }> Go Back </Text>
          </View>
         
        </TouchableOpacity>


        </SafeAreaView>
      </LinearGradient>

    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 0 : NativeModules.StatusBarManager.HEIGHT,
  },

  paymentContainer: {
  },

  
  addressContainer: {
  },

  amountContainer: {

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
    backgroundColor: 'rgba(217,56,239, 0.3)',
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

  loadingTransaction: {
    width: Dimensions.get( 'window' ).width * 0.5,
    height: Dimensions.get( 'window' ).width * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  }

});