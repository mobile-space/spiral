import React from "react";
import { Platform } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "react-navigation";
import PropTypes from "prop-types";

import PosStack from "./PosStack";
import MarketScreen from "../components/MarketScreen";
import TransactionsScreen from "../components/TransactionsScreen";
import WalletScreen from "../utils/WalletScreen";
import { Icon } from "react-native-elements";

const PosScreenTabIcon = ({ tintColor }) => (
  <SimpleLineIcons
    name="tag"
    color={tintColor}
    size={Platform.OS === "ios" ? 22 : 25}
  />
);
PosScreenTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

const MarketScreenTabIcon = ({ tintColor }) => (
  <SimpleLineIcons
    name="diamond"
    color={tintColor}
    size={Platform.OS === "ios" ? 22 : 25}
  />
);
MarketScreenTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

const TransactionsScreenTabIcon = ({ tintColor }) => (
  <Icon
    name="wallet"
    color={tintColor}
    size={Platform.OS === "ios" ? 22 : 25}
    type="material-community"
  />
);
TransactionsScreenTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

const WalletTabIcon = ({ tintColor }) => (
  <SimpleLineIcons
    name="wallet"
    color={tintColor}
    size={Platform.OS === "ios" ? 22 : 25}
  />
);
WalletTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

export default createBottomTabNavigator(
  {
    pos: {
      screen: PosStack,
      navigationOptions: {
        tabBarLabel: "POS",
        tabBarIcon: PosScreenTabIcon
      }
    },
    market: {
      screen: MarketScreen,
      navigationOptions: {
        tabBarLabel: "Market",
        tabBarIcon: MarketScreenTabIcon
      }
    },
    transactions: {
      screen: TransactionsScreen,
      navigationOptions: {
        tabBarLabel: "Transactions",
        tabBarIcon: TransactionsScreenTabIcon
      }
    },
    settings: {
      screen: WalletScreen,
      navigationOptions: {
        tabBarLabel: "Wallet",
        tabBarIcon: WalletTabIcon
      }
    }
  },
  {
    initialRouteName: "pos",
    tabBarPosition: "bottom",
    animationEnabled: Platform.OS !== "ios",
    swipeEnabled: Platform.OS !== "ios",
    tabBarOptions: {
      showIcon: true,
      showLabel: Platform.OS === "ios",
      activeTintColor: "#FFF",
      inactiveTintColor: "#AAA",
      style: {
        backgroundColor: "#4c4c4c",
        padding: Platform.OS === "ios" ? 5 : 0
      },
      indicatorStyle: {
        backgroundColor: "#FFF"
      },
      labelStyle: {
        fontSize: 12
      }
    }
  }
);
