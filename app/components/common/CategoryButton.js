import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { PropTypes } from 'prop-types';

const CategoryButton = props => (
  <TouchableOpacity
    style={styles.button}
    onPress={props.onPress}
  >
    <Text style={styles.buttonText}>
      {props.title}
    </Text>
  </TouchableOpacity>
);

CategoryButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  button: {
    marginLeft: 16,
    marginRight: 16,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
  },
});

export default CategoryButton;
