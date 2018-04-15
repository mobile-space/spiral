import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

const ItemCard = (props) => {
  const {
    size, spacing, title, image, quantity,
  } = props;

  const dimensions = {
    height: size,
    width: size,
    margin: spacing / 2,
  };

  return (
    <View style={[styles.container, dimensions]}>
      <View style={styles.row}>
        <Text style={styles.rowText}>{title}</Text>
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
          onPress={() => {}}
        />

        <Text style={styles.rowText}>{quantity}</Text>

        <Icon
          color="#FFF"
          name="plus-circle-outline"
          type="material-community"
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

ItemCard.propTypes = {
  size: PropTypes.number.isRequired,
  spacing: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
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
