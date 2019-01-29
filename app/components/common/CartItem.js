import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PropTypes } from "prop-types";

import CartQuantityModal from "./CartQuantityModal";

class CartItem extends Component {
  state = {
    selectedProduct: null
  };

  render() {
    const {
      onMinusPressed,
      onPlusPressed,
      product,
      product: {
        name,
        image,
        quantity,
        price: { local_currency: localPrice }
      }
    } = this.props;
    const { selectedProduct } = this.state;

    return (
      <View style={styles.container}>
        {selectedProduct && (
          <CartQuantityModal
            onMinusPressed={onMinusPressed}
            onPlusPressed={onPlusPressed}
            onRequestClose={() => this.setState({ selectedProduct: null })}
            product={selectedProduct}
            visible
          />
        )}

        <View style={styles.row}>
          <View style={styles.productContainer}>
            <View style={styles.product}>
              <View style={{ marginRight: 8 }}>
                {image ? (
                  <Image style={styles.productImage} source={{ uri: image }} />
                ) : (
                  <View style={styles.productImagePlaceholder}>
                    <Text>
                      {name
                        .match(/\b(\w)/g)
                        .join("")
                        .toUpperCase()}
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.productInfo}>
                <Text style={styles.productName}>{name}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.quantityContainer}
              onPress={() => this.setState({ selectedProduct: product })}
            >
              <Text style={styles.quantity}>{quantity}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.priceAmount}>{localPrice}</Text>
            <Text style={styles.priceCurrency}>USD</Text>
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
    image: PropTypes.string,
    quantity: PropTypes.number.isRequired
  }).isRequired,
  onMinusPressed: PropTypes.func.isRequired,
  onPlusPressed: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column"
  },
  row: {
    flexDirection: "row",
    height: 80,
    marginBottom: 4,
    marginLeft: 8,
    marginRight: 8
  },
  productContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginRight: 8
  },
  product: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginRight: 18
  },
  productImage: {
    borderRadius: 8,
    height: 64,
    width: 64
  },
  productImagePlaceholder: {
    alignItems: "center",
    borderColor: "#BBB",
    borderRadius: 8,
    borderWidth: 1,
    height: 64,
    justifyContent: "center",
    width: 64
  },
  productInfo: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center"
  },
  productName: {},
  quantityContainer: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flexDirection: "column",
    height: 32,
    justifyContent: "center",
    marginRight: 24,
    width: 32
  },
  quantityButton: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  quantity: {
    alignSelf: "center",
    fontWeight: "bold"
  },
  priceContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  priceAmount: {
    fontStyle: "italic",
    marginRight: 8
  },
  priceCurrency: {
    fontWeight: "bold"
  },
  border: {
    backgroundColor: "#CCC",
    height: 1,
    marginLeft: 28,
    marginRight: 16
  }
});

export default CartItem;
