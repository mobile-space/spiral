import React, { Component } from 'react';
import {
  Button,
  NativeModules,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import { Header } from 'react-native-elements';

class CartScreen extends Component {
  render() {
    const { navigation: { goBack } } = this.props;
    
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Header
          backgroundColor="rgba(0,0,0,0)"
          leftComponent={(
            <Button
              onPress={() => goBack()}
              title="Close"
              color="#000"
            />
          )}
        />

        <Text> Cart Screen </Text>
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

export default CartScreen;
