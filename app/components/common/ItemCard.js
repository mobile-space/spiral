import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

const ItemCard = (props) => {
  const { size, spacing } = props;

  const dimens = {
    height: size,
    width: size,
    margin: spacing / 2,
  };

  return (
    <View style={[styles.container, dimens]}>
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF0',
  },
});

export default ItemCard;
