import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import PropTypes from "prop-types";

class ItemCard extends Component {
  renderImage = (image, name) => {
    if (image) {
      return <Image style={styles.itemImage} source={{ uri: image }} />;
    } else if (name) {
      return (
        <View style={styles.itemAbbreviationContainer}>
          <Text style={styles.itemAbbreviationText}>{name}</Text>
        </View>
      );
    }
    return null;
  };

  render() {
    const { size, spacing, product, onPress } = this.props;
    const {
      name,
      image,
      price: { local_currency: localPrice }
    } = product;

    const dimensions = {
      height: size,
      width: size,
      margin: spacing / 2
    };

    return (
      <TouchableWithoutFeedback onPress={() => onPress(product)}>
        <View style={[styles.container, dimensions]}>
          <View style={styles.row}>
            <Text style={styles.rowText}>{name}</Text>
          </View>

          {this.renderImage(image, name)}

          <View style={styles.row}>
            <Text style={styles.rowText}>{`$ ${localPrice}`}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

ItemCard.propTypes = {
  size: PropTypes.number.isRequired,
  spacing: PropTypes.number.isRequired,
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string
  }).isRequired,
  onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    borderColor: "#3d997a",
    borderWidth: 1
    // borderRadius: 10,
  },
  row: {
    alignItems: "center",
    backgroundColor: "#3d997a",
    height: 30,
    flexDirection: "row",
    justifyContent: "center",
    paddingLeft: 16,
    paddingRight: 16
  },
  rowText: {
    flex: 1,
    color: "#FFF",
    textAlign: "center"
  },
  itemImage: {
    flex: 1,
    resizeMode: "cover"
  },
  itemAbbreviationContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#fff"
  },
  itemAbbreviationText: {
    fontSize: 20
  }
});

export default ItemCard;
