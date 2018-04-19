import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const CartItem = () => (
  <View style={styles.container}>
    <View style={styles.row}>
      <View style={styles.productContainer}>
        <View style={styles.product}>
          <View style={{ marginRight: 8 }}>
            <Image
              style={styles.productImage}
              source={{ uri: 'http://res.heraldm.com/content/image/2017/07/07/20170707000904_0.jpg' }}
            />
          </View>

          <View style={styles.productInfo}>
            <Text style={styles.productName}>Hamburger</Text>
          </View>
        </View>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
          >
            <Text>+</Text>
          </TouchableOpacity>

          <Text style={styles.quantity}>1</Text>

          <TouchableOpacity
            style={styles.quantityButton}
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
