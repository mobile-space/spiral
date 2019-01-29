import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity, 
  View,
} from "react-native";
import { PropTypes } from "prop-types";

const CategoryButton = props => (
  <TouchableOpacity
    activeOpacity={1}
    style={styles.button}
    onPress={props.onPress}
    isSelected={props.isSelected}
  >
    <View
      style={
        props.isSelected && { borderBottomWidth: 2, borderBottomColor: "#FFF" }
      }
    >
      <Text
        style={[
          styles.buttonText,
          props.isSelected && {
            fontWeight: "bold",
            borderBottomWidth: 2,
            borderBottomColor: "#FFF"
          }
        ]}
      >
        {props.title}
      </Text>
    </View>
  </TouchableOpacity>
);

CategoryButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  isSelected: PropTypes.bool
};

const styles = StyleSheet.create({
  button: {
    marginLeft: 16,
    marginRight: 16
  },
  buttonText: {
    color: "#66ffcc",
    fontSize: 18,
    fontWeight: "normal"
  }
});

export default CategoryButton;
