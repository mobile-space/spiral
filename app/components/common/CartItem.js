import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { PropTypes } from 'prop-types';

class CartItem extends Component {
  constructor(props) {
    super(props);

    const { quantity } = props.product;
    this.state = {
      quantity,
    };
  }

  render() {
    const {
      product: { name, image },
      onMinusPressed,
      onPlusPressed,
    } = this.props;
    const { quantity } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.productContainer}>
            <View style={styles.product}>
              <View style={{ marginRight: 8 }}>
                <Image
                  style={styles.productImage}
                  source={{ uri: image }}
                />
              </View>
  
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{name}</Text>
              </View>
            </View>
  
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => {
                  this.setState({ quantity: quantity + 1 });
                  onPlusPressed();
                }}
              >
                <Text>+</Text>
              </TouchableOpacity>
  
              <Text style={styles.quantity}>{quantity}</Text>
  
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => {
                  this.setState({ quantity: quantity - 1 });
                  onMinusPressed();
                }}
              >
                <Text>-</Text>
              </TouchableOpacity>
            </View>
          </View>
  
          <View style={styles.priceContainer}>
            <Text style={styles.priceAmount}>1.25</Text>
            <Text style={styles.priceCurrency}>BTC</Text>
          </View>
        </View>
  
        <View style={styles.border} />
      </View>
    );
  }
}

CartItem.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onMinusPressed: PropTypes.func.isRequired,
  onPlusPressed: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    height: 80,
    marginBottom: 4,
    marginLeft: 8,
    marginRight: 8,
  },
  productContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginRight: 8,
  },
  product: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginRight: 18,
  },
  productImage: {
    borderRadius: 8,
    height: 64,
    width: 64,
  },
  productInfo: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  productName: {

  },
  quantityContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 24,
  },
  quantityButton: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  quantity: {
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  priceContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  priceAmount: {
    fontStyle: 'italic',
    marginRight: 8,
  },
  priceCurrency: {
    fontWeight: 'bold',
  },
  border: {
    backgroundColor: '#CCC',
    height: 1,
    marginLeft: 28,
    marginRight: 16,
  },
});

export default CartItem;
