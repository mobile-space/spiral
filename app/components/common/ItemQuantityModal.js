import React, { Component } from "react";
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import PropTypes from "prop-types";

const { height, width } = Dimensions.get("window");

class ItemQuantityModal extends Component {
  static propTypes = {
    addToCartPressed: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    product: PropTypes.shape({}).isRequired,
    visible: PropTypes.bool.isRequired
  };

  state = {
    quantity: 1
  };

  addToCart = () => {
    const { addToCartPressed, onRequestClose, product } = this.props;
    const { quantity } = this.state;

    addToCartPressed({
      product,
      quantity
    });

    onRequestClose();
  };

  render() {
    const { onRequestClose, visible, product } = this.props;
    const {
      name,
      image,
      price: { local_currency: localPrice }
    } = product;

    const { quantity } = this.state;

    return (
      <Modal
        animationType="fade"
        onRequestClose={() => onRequestClose()}
        transparent
        visible={visible}
      >
        <View style={styles.modal}>
          <View style={styles.container}>
            <View style={styles.backgroundImageContainer}>
              <Image
                style={{ flex: 1, resizeMode: "cover" }}
                source={{
                  uri:
                    image ||
                    "http://www.wusthof.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/wusthof-imagenotfound.jpg"
                }}
              />

              <View style={styles.closeButtonContainer}>
                <Icon
                  color="#FFF"
                  name="close"
                  type="material-community"
                  onPress={() => onRequestClose()}
                />
              </View>

              <View style={styles.productPriceContainer}>
                <Text style={styles.productPrice}>{`$ ${localPrice}`}</Text>
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <View style={styles.productTopRow}>
                <Text style={styles.productName}>{name}</Text>

                <TouchableOpacity
                  onPress={() =>
                    this.setState(prevState => ({
                      quantity: Math.max(1, prevState.quantity - 1)
                    }))
                  }
                >
                  <Icon
                    color="#000"
                    iconStyle={styles.quantityButton}
                    name="minus-circle-outline"
                    type="material-community"
                  />
                </TouchableOpacity>

                <Text style={styles.quantity}>{quantity}</Text>

                <TouchableOpacity
                  onPress={() =>
                    this.setState(prevState => ({
                      quantity: prevState.quantity + 1
                    }))
                  }
                >
                  <Icon
                    color="#000"
                    name="plus-circle-outline"
                    type="material-community"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={this.addToCart}
              >
                <Text style={styles.actionButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.60)",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  container: {
    backgroundColor: "#FFF",
    height: 0.5 * height,
    width: 0.8 * width,
    borderRadius: 10
  },
  backgroundImageContainer: {
    padding: 5,
    height: 0.5 * height * 0.55
  },
  closeButtonContainer: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    borderRadius: 15,
    height: 30,
    justifyContent: "center",
    left: 16,
    position: "absolute",
    top: 16,
    width: 30
  },
  productPriceContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    bottom: 16,
    position: "absolute",
    right: 16
  },
  productPrice: {
    borderColor: "rgba(255, 255, 255, 0.75)",
    borderWidth: 1,
    color: "#FFF",
    fontSize: 18,
    fontWeight: "200",
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8
  },
  productTopRow: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 16
  },
  productName: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 16
  },
  quantity: {
    fontSize: 18,
    fontWeight: "200",
    marginLeft: 16,
    marginRight: 16,
    textAlign: "center"
  },
  actionButton: {
    alignContent: "center",
    backgroundColor: "#FFA500",
    borderRadius: 24,
    height: 48,
    margin: 16,
    justifyContent: "center"
  },
  actionButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default ItemQuantityModal;
