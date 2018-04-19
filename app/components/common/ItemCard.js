import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

class ItemCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: props.quantity,
    };
  }

  render() {
    const {
      size, spacing, product, onMinusPressed, onPlusPressed,
    } = this.props;
    const { name, image } = product;
    const { quantity } = this.state;

    const dimensions = {
      height: size,
      width: size,
      margin: spacing / 2,
    };
  
    return (
      <View style={[styles.container, dimensions]}>
        <View style={styles.row}>
          <Text style={styles.rowText}>{name}</Text>
        </View>
  
        <Image
          style={styles.itemImage}
          source={{ uri: image }}
        />
        
        <View style={styles.row}>
          <Icon
            color="#FFF"
            name="minus-circle-outline"
            type="material-community"
            onPress={() => {
              if (quantity >= 1) {
                this.setState({ quantity: quantity - 1 });
                onMinusPressed();
              }
            }}
          />
  
          <Text style={styles.rowText}>{quantity}</Text>
  
          <Icon
            color="#FFF"
            name="plus-circle-outline"
            type="material-community"
            onPress={() => {
              this.setState({ quantity: quantity + 1 });
              onPlusPressed();
            }}
          />
        </View>
      </View>
    );
  }
}

ItemCard.propTypes = {
  size: PropTypes.number.isRequired,
  spacing: PropTypes.number.isRequired,
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
  onMinusPressed: PropTypes.func.isRequired,
  onPlusPressed: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'rgba(0, 0, 0, 0.35)',
    borderWidth: 1,
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  rowText: {
    flex: 1,
    color: '#FFF',
    textAlign: 'center',
  },
  itemImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default ItemCard;
