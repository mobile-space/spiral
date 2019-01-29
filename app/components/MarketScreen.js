import React, { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Header, ButtonGroup } from "react-native-elements";
import { LinearGradient, Font } from "expo";

class MarketScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      market: null,
      isFetchingMarket: true,
      isFontFinishedLoading: false,
      error: null,
      active: 0,
      refreshing: false
    };
  }

  componentDidMount = async () => {
    this.loadFont();
    this.fetchMarket();
  };

  loadFont = async () => {
    await Font.loadAsync({
      "libre-franklin-regular": require("../../assets/fonts/librefranklin-regular.ttf"),
      "libre-franklin-bold": require("../../assets/fonts/librefranklin-bold.ttf"),
      "libre-franklin-medium": require("../../assets/fonts/librefranklin-medium.ttf")
    });

    this.setState({ isFontFinishedLoading: true });
  };

  async fetchMarket() {
    const url =
      "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,DASH,BCH,XMR,ZEC,MKR,NEO,BCP,XRP&tsyms=BTC,USD";

    fetch(url)
      .then(res => res.json())
      .then(res => {
        var market = [];
        var keys = Object.keys(res);

        keys.forEach(function(key) {
          var coin = Object.assign({}, res[key], { name: key });
          market.push(coin);
        });

        this.setState({
          market: market,
          isFetchingMarket: false,
          refreshing: false,
          error: res.error || null
        });
      })
      .catch(error => {
        this.setState({
          error: error,
          isFetchingMarket: false
        });
      });
  }

  _renderList = ({ item: coin }) => {
    // Add thousand separator
    const amountParts = (this.state.active === 0
      ? coin.BTC.toFixed(4)
      : coin.USD.toFixed(2)
    )
      .toString()
      .split(".");
    amountParts[0] = amountParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const amount = amountParts.join(".");

    return (
      <View style={styles.listContainer}>
        <View style={styles.nameCointaner}>
          <Text style={styles.coinNameText}> {coin.name} </Text>
        </View>
        <View style={styles.priceCointainer}>
          <View style={{ justifyContent: "center" }}>
            <Text style={{ fontSize: 17, color: "white" }}>
              {" "}
              {this.state.active == 0 ? "₿" : "$"}{" "}
            </Text>
          </View>
          <View style={styles.priceBox}>
            <Text
              style={{
                fontSize: 18,
                color: "white",
                marginLeft: 0,
                fontFamily: "libre-franklin-bold"
              }}
            >
              {amount}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  updateIndex = selectedIndex => {
    this.setState({ active: selectedIndex });
  };

  onRefresh = () => {
    console.log("test");
    this.setState({
      refreshing: true
    });
    this.fetchMarket();
  };

  renderMarketToggle = () => {
    const { isFetchingMarket, market, active } = this.state;
    const currencyChoice = ["BitCoin", "USD"];
    return (
      <ButtonGroup
        buttons={currencyChoice}
        containerStyle={styles.buttonStyle}
        textStyle={{ color: "white", fontFamily: "libre-franklin-regular" }}
        selectedIndex={active}
        onPress={this.updateIndex}
        selectedButtonStyle={{ backgroundColor: "#006600" }}
        selectedTextStyle={{
          color: "white",
          fontFamily: "libre-franklin-bold"
        }}
      />
    );
  };

  contentView() {
    const { isFetchingMarket, market, active, refreshing } = this.state;
    const currencyChoice = ["BitCoin", "USD"];
    return (
      <View style={{ flex: 1, backgroundColor: "transparent" }}>
        <FlatList
          style={{ marginTop: 15 }}
          keyExtractor={(item, index) => `${index}`}
          data={market}
          extraData={this.state}
          renderItem={({ item }) => this._renderList({ item })}
          onRefresh={() => this.onRefresh()}
          refreshing={refreshing}
        />
      </View>
    );
  }

  render() {
    const {
      isFetchingMarket,
      market,
      active,
      refreshing,
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
          <View>
            <Header
              outerContainerStyles={{
                marginTop: 24,
                marginBottom: 16,
                borderBottomWidth: 0
              }}
              backgroundColor="rgba(0.0, 0.0, 0.0, 0.0)"
              rightComponent={this.renderMarketToggle()}
            />
          </View>
        )}
        {isFetchingMarket && isFontFinishedLoading ? (
          <View style={{ marginTop: 36 }}>
            <ActivityIndicator size="large" color="#FFF" />
          </View>
        ) : (
          this.contentView()
        )}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    height: 60,
    borderColor: "white",
    borderBottomWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  loadingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  nameCointaner: {
    flex: 1,
    justifyContent: "center"
  },
  buttonGroupContainer: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonStyle: {
    height: 30,
    width: 200,
    borderRadius: 25,
    backgroundColor: "rgba(132,132,132, 0.2)",
    borderWidth: 0
  },
  priceCointainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  priceBox: {
    height: 40,
    width: 100,
    backgroundColor: "#006600",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  coinNameText: {
    color: "white",
    fontSize: 18,
    fontWeight: "normal",
    fontFamily: "libre-franklin-medium"
  },
});

export default MarketScreen;
