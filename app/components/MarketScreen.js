import React, { Component } from 'react';
import {
  NativeModules,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';

class MarketScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Text> Market Screen </Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : NativeModules.StatusBarManager.HEIGHT,
  },
});

export default MarketScreen;
