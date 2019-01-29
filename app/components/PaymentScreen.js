import React, { Component } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Easing,
  Image,
  NativeModules,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient, Font } from "expo";
import { Header, Icon } from "react-native-elements";
import LottieView from "lottie-react-native";
import { connect } from "react-redux";

class PaymentScreen extends Component {
  static NavigationOptions = {};

  constructor(props) {
    super(props);

    this.state = {
      isTransactionFinishedLoading: false,
      isTransactionPending: true,
      transaction: null,
      interval: null,
      coin: null,
      progress: new Animated.Value(0),
      transactionStatus: null,
      timer: null,
      isFontFinishedLoading: false
    };
    this.checkTransactionStatus = this.checkTransactionStatus.bind(this);

    this.progress = new Animated.Value(0);
  }

  componentWillMount() {
    StatusBar.setBarStyle("light-content", true);
  }

  loadFont = async () => {
    await Font.loadAsync({
      "libre-franklin-regular": require("../../assets/fonts/librefranklin-regular.ttf"),
      "libre-franklin-bold": require("../../assets/fonts/librefranklin-bold.ttf"),
      "libre-franklin-medium": require("../../assets/fonts/librefranklin-medium.ttf")
    });

    this.setState({ isFontFinishedLoading: true });
  };

  componentDidMount = async () => {
    this.loadFont();
    await this.createTransaction();

    const timer = setInterval(this.showConfirmationDialog, 15000);
    this.setState({ timer });
  };

  componentWillUnmount() {
    clearInterval(this.state.interval);
    clearInterval(this.state.timer);

    StatusBar.setBarStyle("dark-content", true);
  }

  showConfirmationDialog = () => {
    clearInterval(this.state.timer);

    const {
      clearCart,
      screenProps: { dismiss }
    } = this.props;

    Alert.alert(
      "Transaction Confirmed",
      "Transaction ID: f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16",
      [
        {
          text: "OK",
          onPress: () => {
            clearCart();
            dismiss();
          }
        }
      ],
      { cancelable: false }
    );
  };

  checkTransactionStatus = async status => {
    const { transaction } = this.state;
    var responseJSON = null;

    console.log(status);

    if (status == 100) {
      this.setState({ isTransactionPending: false });
    }
  };

  paymentStatusCallBack = () => {
    const { transaction } = this.state;
    var responseJSON = null;
    var self = this;

    var interval = setInterval(async function() {
      var details = {};
      details.transactionID = transaction.txn_id;

      var formBody = [];

      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);

        formBody.push(encodedKey + "=" + encodedValue);
      }

      formBody = formBody.join("&");

      try {
        let response = await fetch(
          `https://crypto-payment-processor.herokuapp.com/payment/info`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: formBody
          }
        );

        if (response.status === 200) {
          responseJSON = await response.json();
          self.checkTransactionStatus(responseJSON.status);
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    }, 60000);
  };

  createTransaction = async () => {
    try {
      let response = await fetch(
        `https://crypto-payment-processor.herokuapp.com/payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
        }
      );

      var responseJSON = null;

      if (response.status === 200) {
        responseJSON = await response.json();
        this.setState({
          transaction: responseJSON,
          isTransactionFinishedLoading: true
        });
        this.paymentStatusCallBack();
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  renderTransactionStatusIndicator = () => {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear
    }).start();

    return (
      <View style={styles.loadingTransaction}>
        <LottieView
          source={require("../../assets/lottie/wallet_coin.json")}
          progress={this.state.progress}
          onPress={() => this.props.navigation.navigate("pos")}
        />
      </View>
    );
  };

  renderTransactionPendingIndicator = () => {
    return (
      <View style={styles.pendingTransaction}>
        <LottieView
          source={require("../../assets/lottie/loading_loop_white.json")}
          speed={0.3}
          ref={animation => {
            this.animation = animation;

            if (this.animation) {
              this.animation.play();
            }
          }}
        />
      </View>
    );
  };

  renderLoadingTransactionIndicator = () => {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear
    }).start();

    return (
      <View style={styles.loadingTransaction}>
        <LottieView
          source={require("../../assets/lottie/snap_loader_white.json")}
          progress={this.state.progress}
        />
      </View>
    );
  };

  //copy address to clipboard
  _setContent = () => {
    Clipboard.setString();
  };

  render() {
    const {
      payment: { amount, currency },
      navigation: { goBack }
    } = this.props;
    const {
      transaction,
      isTransactionFinishedLoading,
      isTransactionPending,
      isFontFinishedLoading
    } = this.state;
    const qrDimension = Dimensions.get("window").width * 0.5;

    return (
      <LinearGradient
        style={{ flex: 1 }}
        colors={["#000000", "#323232"]}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        locations={[0.2, 0.8]}
      >
        {isFontFinishedLoading && (
          <Header
            outerContainerStyles={{
              marginTop: 24,
              marginBottom: 16,
              borderBottomWidth: 0
            }}
            backgroundColor="rgba(0.0, 0.0, 0.0, 0.0)"
            leftComponent={
              <TouchableOpacity onPress={() => goBack()}>
                <Icon
                  color="#FFF"
                  name="arrow-left"
                  type="material-community"
                />
              </TouchableOpacity>
            }
            centerComponent={{
              text: "Payment",
              style: {
                color: "#FFF",
                fontSize: 24,
                fontFamily: "libre-franklin-bold"
              }
            }}
          />
        )}

        <SafeAreaView style={styles.safeAreaView}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={{ paddingTop: 10 }}>
              {isTransactionFinishedLoading && (
                <View style={styles.paymentContainer}>
                  <View style={styles.qrContainer}>
                    <Image
                      source={{ uri: transaction.qrcode_url }}
                      style={{
                        width: qrDimension,
                        height: qrDimension,
                        borderRadius: 20
                      }}
                    />
                  </View>

                  <View style={styles.amountContainer}>
                    <View style={styles.amountLabelContainer}>
                      <Text style={styles.amountLabelText}>
                        {" "}
                        Payment Amount:{" "}
                      </Text>
                    </View>

                    <View style={styles.amountTransactionContainer}>
                      <Text style={styles.amountTransactionText}>
                        {" "}
                        {amount} {currency}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.addressContainer}>
                    <View style={styles.addressLabelContainer}>
                      <Text style={styles.addressLabelText}>
                        {" "}
                        Payment Address:{" "}
                      </Text>
                    </View>

                    <View style={styles.addressTransactionContainer}>
                      <Text style={styles.addressTransactionText}>
                        {" "}
                        {transaction.address}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
            {!isTransactionFinishedLoading &&
              this.renderLoadingTransactionIndicator()}
            <View style={styles.pendingTransactionContainer}>
              {isTransactionFinishedLoading &&
                isTransactionPending &&
                this.renderTransactionPendingIndicator()}
              {isTransactionFinishedLoading &&
                !isTransactionPending &&
                this.renderTransactionStatusIndicator()}
            </View>

            {isFontFinishedLoading && (
              <TouchableOpacity
                style={styles.goBackContainer}
                onPress={() => {
                  this.props.screenProps.dismiss();
                }}
              >
                <View style={styles.goBackButton}>
                  <Text style={styles.goBackButtonText}> Go Back </Text>
                </View>
              </TouchableOpacity>
            )}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    paddingTop:
      Platform.OS === "ios" ? 0 : NativeModules.StatusBarManager.HEIGHT
  },

  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },

  paymentContainer: {},

  addressContainer: {
    marginTop: 5
  },

  amountContainer: {
    marginTop: 5
  },

  amountLabelContainer: {},

  amountLabelText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "libre-franklin-regular"
  },

  amountTransactionText: {
    padding: 15,
    color: "#fff",
    fontSize: 14,
    fontFamily: "libre-franklin-bold"
  },

  amountTransactionContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#006600",
    borderRadius: 40,
    marginTop: 5
  },

  addressLabelText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "libre-franklin-regular"
  },

  addressTransactionText: {
    padding: 15,
    color: "#fff",
    fontSize: 14,
    fontFamily: "libre-franklin-bold"
  },

  addressTransactionContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#006600",
    borderRadius: 40,
    marginTop: 5
  },

  qrContainer: {
    alignItems: "center",
    justifyContent: "center"
  },

  goBackContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5
  },

  goBackButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ef384e",
    width: Dimensions.get("window").width * 0.5,
    borderRadius: 20,
    padding: 10
  },

  goBackButtonText: {
    color: "#FFF",
    fontSize: 20,
    fontFamily: "libre-franklin-medium"
  },

  pendingTransaction: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").width * 0.5,
    padding: 10
  },

  loadingTransaction: {
    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").width * 0.5,
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },

  pendingTransactionContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").width * 0.5
  }
});

export default (() => {
  const mapStateToProps = state => ({
    payment: state.payment
  });

  /* eslint-disable global-require  */
  const { clearCart } = require("../actions/cart_actions");
  /* eslint-enable global-require  */

  const mapDispatchToProps = {
    clearCart
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(PaymentScreen);
})();
