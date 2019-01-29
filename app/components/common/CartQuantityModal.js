import React, { Component } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import PropTypes from "prop-types";

const { width } = Dimensions.get("window");

class CartQuantityModal extends Component {
  static propTypes = {
    onMinusPressed: PropTypes.func.isRequired,
    onPlusPressed: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    product: PropTypes.shape({}).isRequired,
    visible: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    const {
      product: { quantity }
    } = this.props;
    this.state = {
      quantity
    };
  }

  render() {
    const {
      onMinusPressed,
      onPlusPressed,
      onRequestClose,
      visible
    } = this.props;

    const { quantity } = this.state;

    return (
      <View style={styles.modalContainer}>
        <Modal
          animationType="fade"
          onRequestClose={() => onRequestClose()}
          transparent
          visible={visible}
        >
          <View style={styles.modal}>
            <View style={styles.container}>
              <View style={{ flex: 1 }}>
                <View style={styles.productTopRow}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState(prevState => {
                        onMinusPressed();
                        return {
                          quantity: Math.max(1, prevState.quantity - 1)
                        };
                      })
                    }
                  >
                    <Icon
                      color="#AAA"
                      iconStyle={styles.quantityButton}
                      name="minus-circle-outline"
                      size={40}
                      type="material-community"
                    />
                  </TouchableOpacity>

                  <Text style={styles.quantity}>{quantity}</Text>

                  <TouchableOpacity
                    onPress={() =>
                      this.setState(prevState => {
                        onPlusPressed();
                        return { quantity: prevState.quantity + 1 };
                      })
                    }
                  >
                    <Icon
                      color="#AAA"
                      iconStyle={styles.quantityButton}
                      name="plus-circle-outline"
                      size={40}
                      type="material-community"
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={onRequestClose}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    borderRadius: 10
  },
  modal: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.35)",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  container: {
    backgroundColor: "#FFF",
    height: 160,
    width: 0.8 * width,
    borderRadius: 20
  },
  productTopRow: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 16
  },
  quantity: {
    fontSize: 22,
    fontWeight: "500",
    marginLeft: 16,
    marginRight: 16,
    textAlign: "center"
  },
  closeButton: {
    alignContent: "center",
    backgroundColor: "#007AFF",
    borderRadius: 24,
    height: 48,
    margin: 16,
    justifyContent: "center"
  },
  closeButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default CartQuantityModal;
