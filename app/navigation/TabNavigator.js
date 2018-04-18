import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import { SimpleLineIcons } from '@expo/vector-icons';

import PosStack from './PosStack';
import MarketScreen from '../components/MarketScreen';
import TransactionsScreen from '../components/TransactionsScreen';
import SettingsScreen from '../components/SettingsScreen';
import PaymentScreen from '../components/PaymentScreen';
import ConvertScreen from '../components/ConvertScreen';

const PosScreenTabIcon = ({ tintColor }) => (
  <SimpleLineIcons
    name="tag"
    color={tintColor}
    size={Platform.OS === 'ios' ? 22 : 25}
  />
);
PosScreenTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

const MarketScreenTabIcon = ({ tintColor }) => (
  <SimpleLineIcons
    name="diamond"
    color={tintColor}
    size={Platform.OS === 'ios' ? 22 : 25}
  />
);
MarketScreenTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

const TransactionsScreenTabIcon = ({ tintColor }) => (
  <SimpleLineIcons
    name="wallet"
    color={tintColor}
    size={Platform.OS === 'ios' ? 22 : 25}
  />
);
TransactionsScreenTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

const SettingsScreenTabIcon = ({ tintColor }) => (
  <SimpleLineIcons
    name="settings"
    color={tintColor}
    size={Platform.OS === 'ios' ? 22 : 25}
  />
);
SettingsScreenTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default TabNavigator({
  pos: {
    screen: PosStack,
    navigationOptions: {
      tabBarLabel: 'POS',
      tabBarIcon: PosScreenTabIcon,
    },
  },
  market: {
    screen: MarketScreen,
    navigationOptions: {
      tabBarLabel: 'Market',
      tabBarIcon: MarketScreenTabIcon,
    },
  },
  transactions: {
    screen: TransactionsScreen,
    navigationOptions: {
      tabBarLabel: 'Transactions',
      tabBarIcon: TransactionsScreenTabIcon,
    },
  },
  settings: {
    screen: PaymentScreen,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: SettingsScreenTabIcon,
    },
  },

  convert: {
    screen: ConvertScreen,
    navigationOptions: {
      tabBarLabel: 'Convert',
      tabBarIcon: SettingsScreenTabIcon,
    },
  },

}, {
  initialRouteName: 'pos',
  tabBarPosition: 'bottom',
  animationEnabled: Platform.OS !== 'ios',
  swipeEnabled: Platform.OS !== 'ios',
  tabBarOptions: {
    showIcon: true,
    showLabel: true,
    activeTintColor: '#000',
    inactiveTintColor: '#AAA',
    style: {
      backgroundColor: '#FFF',
      padding: Platform.OS === 'ios' ? 5 : 0,
    },
    indicatorStyle: {
      backgroundColor: '#FFF',
    },
    labelStyle: {
      fontSize: 12,
    },
  },
});
