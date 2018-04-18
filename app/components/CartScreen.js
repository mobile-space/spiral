import React, { Component } from 'react';
import {
  FlatList,
  NativeModules,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { PropTypes } from 'prop-types';
import CartItem from './common/CartItem';

class CartScreen extends Component {
  renderCartItem = () => (
    <CartItem />
  );

  render() {
    const { navigation: { goBack } } = this.props;
    
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Header
          backgroundColor="#rgba(0, 0, 0, 0)"
          leftComponent={
            <TouchableOpacity onPress={() => goBack()}>
              <Icon
                color="#000"
                name="close"
                type="material-community"
              />
            </TouchableOpacity>
          }
          centerComponent={{
            text: 'Cart',
            style: {
              color: '#000',
              fontSize: 24,
              fontWeight: 'bold',
            },
          }}
        />

        <FlatList
          keyExtractor={(item, index) => index}
          data={[1, 2, 3]}
          renderItem={this.renderCartItem}
        />

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: </Text>
          <Text style={styles.totalAmount}>6.73</Text>
          <Text style={styles.totalCurrency}>BTC</Text>
        </View>

        <TouchableOpacity style={styles.checkoutButtonContainer}>
          <View style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>CHECKOUT</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

CartScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : NativeModules.StatusBarManager.HEIGHT,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  totalContainer: {
    flexDirection: 'row',
    height: 24,
    marginBottom: 16,
    marginTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  totalText: {
    flex: 1,
    fontSize: 18,
    marginRight: 8,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 18,
    fontStyle: 'italic',
    marginRight: 8,
  },
  totalCurrency: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButtonContainer: {
    backgroundColor: '#FFA500',
    borderRadius: 30,
    height: 60,
    margin: 8,
  },
  checkoutButton: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  checkoutButtonText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CartScreen;
