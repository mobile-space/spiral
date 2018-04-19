import React, { Component } from 'react';
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import CartItem from './common/CartItem';

class CartScreen extends Component {
  renderCartItem = (product) => {
    const { addOneToCart, removeOneFromCart } = this.props;

    return (
      <CartItem
        product={product}
        onMinusPressed={() => removeOneFromCart(product)}
        onPlusPressed={() => addOneToCart(product)}
      />
    );
  };

  render() {
    const { navigation: { goBack }, cart } = this.props;
    
    return (
      <View style={{ flex: 1 }}>
        <Header
          outerContainerStyles={{
            marginTop: 24,
            marginBottom: 24,
          }}
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
          keyExtractor={product => `${product.productId}`}
          data={Object.keys(cart).map(key => cart[key])}
          renderItem={({ item }) => this.renderCartItem(item)}
        />

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: </Text>
          <Text style={styles.totalAmount}>
            {
              Object.keys(cart).reduce((accumulator, key) => {
                const {
                  quantity,
                  price: { local_currency: unitPrice },
                } = cart[key];

                const total = accumulator + (quantity * unitPrice);
                return +(`${Math.round(`${total}e+2`)}e-2`);
              }, 0)
            }
          </Text>
          <Text style={styles.totalCurrency}>BTC</Text>
        </View>

        <TouchableOpacity style={styles.checkoutButtonContainer}>
          <View style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>CHECKOUT</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

CartScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  cart: PropTypes.shape({}).isRequired,
  addOneToCart: PropTypes.func.isRequired,
  removeOneFromCart: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
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
    marginBottom: 32,
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

export default (() => {
  const mapStateToProps = state => ({
    cart: state.cart,
  });

  /* eslint-disable global-require  */
  const {
    addOneToCart,
    removeOneFromCart,
  } = require('../actions/cart_actions');
  /* eslint-enable global-require  */

  const mapDispatchToProps = {
    addOneToCart,
    removeOneFromCart,
  };

  return connect(mapStateToProps, mapDispatchToProps)(CartScreen);
})();

