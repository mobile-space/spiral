import React, { Component } from "react";
import {
  NativeModules,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ButtonGroup, Input } from "react-native-elements";

export default class ConvertScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toSelectedIndex: 2,
      fromSelectedIndex: 1
    };
  }

  updateToIndex = selectedIndex => {
    this.setState({ toSelectedIndex: selectedIndex });
  };

  updateFromIndex = selectedIndex => {
    this.setState({ fromSelectedIndex: selectedIndex });
  };

  render() {
    const { toSelectedIndex, fromSelectedIndex } = this.state;
    const coins = ["BTC", "ETH", "DASH", "BCH"];

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.fromCoinContainer}>
          <Text>From</Text>
          <ButtonGroup
            onPress={this.updateToIndex}
            selectedIndex={toSelectedIndex}
            buttons={coins}
            containerStyle={{ height: 50 }}
          />
        </View>
        <View style={styles.toCoinContainer}>
          <Text>To</Text>
          <ButtonGroup
            onPress={this.updateFromIndex}
            selectedIndex={fromSelectedIndex}
            buttons={coins}
            containerStyle={{ height: 50 }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Input placeholder="Enter a value to convert" />
        </View>

        <View style={styles.resultContainer}>
          <Text>Result</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingTop:
      Platform.OS === "ios" ? 0 : NativeModules.StatusBarManager.HEIGHT
  },

  fromCoinContainer: {
    paddingTop: 20,
    padding: 5
  },

  toCoinContainer: {
    paddingTop: 20,
    padding: 5
  },

  inputContainer: {
    flex: 0.1
  },

  resultContainer: {
    paddingTop: 20,
    padding: 10,
    flex: 0.1
  }
});
