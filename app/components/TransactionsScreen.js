import React, { Component } from "react";
import {
  ActivityIndicator,
  NativeModules,
  Platform,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { LinearGradient, Font } from "expo";
import { Header } from "react-native-elements";

var complete = [];
var incomplete = [];
var pending = [];

class TransactionsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFinishedLoadingTransactions: false,
      isFontFinishedLoading: false,
      transactions: null
    };
  }

  componentDidMount = async () => {
    this.loadFont();
    this.fetchTransactions();
  };

  loadFont = async () => {
    await Font.loadAsync({
      "libre-franklin-regular": require("../../assets/fonts/librefranklin-regular.ttf"),
      "libre-franklin-bold": require("../../assets/fonts/librefranklin-bold.ttf"),
      "libre-franklin-medium": require("../../assets/fonts/librefranklin-medium.ttf")
    });

    this.setState({ isFontFinishedLoading: true });
  };

  fetchTransactions = async () => {
    try {
      let response = await fetch(
        `https://crypto-payment-processor.herokuapp.com/transactions`,
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
        const transactions = this.filterTransactions(responseJSON);

        this.setState({
          isFinishedLoadingTransactions: true,
          transactions: transactions
        });
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  filterTransactions = transactions => {
    var filteredTransactions = [];

    transactions.forEach(transaction => {
      const status = transaction.status;
      var date = new Date(transaction.time_created * 1000);

      timeStamp_date =
        date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
      timeStamp_time = date.getHours() + ":" + date.getMinutes();
      transaction.timeStamp_date = timeStamp_date;
      transaction.timeStamp_time = timeStamp_time;

      if (status == 100 || status == 0 || status == -1) {
        filteredTransactions.push(transaction);
      }

      if (status == 0) {
        pending.push(transaction);
      } else if (status == -1) {
        incomplete.push(transaction);
      } else if (status == 100) {
        complete.push(transaction);
      }
    });
    return filteredTransactions;
  };

  _renderTransaction = ({ item: transaction }) => {
    // Add thousand separator
    const amountParts = transaction.amountf.toString().split(".");
    amountParts[0] = amountParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const amount = amountParts.join(".");

    return (
      <View style={styles.transactionContainer}>
        <View style={styles.timeStampContainer}>
          <View>
            <Text style={styles.timeStampDateText}>
              {" "}
              {transaction.timeStamp_date}{" "}
            </Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
            <Text style={styles.timeStampTimeText}>
              {" "}
              {transaction.timeStamp_time}{" "}
            </Text>
          </View>
        </View>

        <View style={styles.amountCountainer}>
          <Text style={styles.amountText}>
            {" "}
            {transaction.coin} {amount}{" "}
          </Text>
        </View>
      </View>
    );
  };

  _renderSectionHeader = ({ title }) => {
    return (
      <View
        style={{
          borderBottomWidth: 3,
          borderBottomColor: "rgba(217,56,239, 0.8)",
          paddingTop: 10
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "#ccbadc",
            fontSize: 20,
            marginLeft: 10,
            padding: 5
          }}
        >
          {title}
        </Text>
      </View>
    );
  };

  getSectionsData() {
    return [
      { title: "Complete", data: complete },
      { title: "Pending", data: pending },
      { title: "Incomplete", data: incomplete }
    ];
  }

  render() {
    const {
      transactions,
      isFinishedLoadingTransactions,
      isFontFinishedLoading
    } = this.state;

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
            centerComponent={{
              text: "Transactions",
              style: {
                color: "#FFF",
                fontSize: 24,
                fontWeight: "bold"
              }
            }}
          />
        )}
        <ScrollView contentContainerStyle={styles.container}>
          {isFinishedLoadingTransactions && isFontFinishedLoading ? (
            <SectionList
              renderItem={({ item }) => this._renderTransaction({ item })}
              renderSectionHeader={({ section: { title } }) =>
                this._renderSectionHeader({ title })
              }
              sections={this.getSectionsData()}
              keyExtractor={(item, index) => item + index}
            />
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
    paddingTop:
      Platform.OS === "ios" ? 0 : NativeModules.StatusBarManager.HEIGHT
  },

  transactionContainer: {
    flexDirection: "row",
    flex: 1,
    paddingLeft: 5,
    paddingTop: 10,
    borderRadius: 10,
    borderBottomColor: "rgba(217,56,239, 0.4)",
    borderBottomWidth: 1
  },

  balanceContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 60,
    backgroundColor: "rgba(217,56,239, 0.1)",
    borderRadius: 10
  },

  timeStampContainer: {
    flex: 1,
    justifyContent: "flex-start"
  },

  balanceText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  },

  amountCountainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end"
  },

  amountText: {
    padding: 5,
    color: "#FFF",
    fontSize: 16
  },

  timeStampDateText: {
    padding: 5,
    color: "#FFF",
    fontSize: 16
  },

  timeStampTimeText: {
    padding: 5,
    color: "grey",
    fontSize: 16,
    fontStyle: "italic"
  }
});

export default TransactionsScreen;
