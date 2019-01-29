import React, { Component } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PropTypes from "prop-types";

const { width } = Dimensions.get("window");

class NewCategoryModal extends Component {
  static propTypes = {
    category: PropTypes.string.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    const { category } = this.props;
    this.state = {
      category
    };
  }

  render() {
    const { onRequestClose, visible } = this.props;

    const { category } = this.state;

    return (
      <Modal
        animationType="fade"
        onRequestClose={() => onRequestClose()}
        transparent
        visible={visible}
      >
        <View style={styles.modal}>
          <View style={styles.container}>
            <View style={{ flex: 1 }}>
              <TextInput
                style={styles.field}
                placeholder="New Category"
                value={category}
                onChangeText={text => this.setState({ category: text })}
                underlineColorAndroid="rgba(0,0,0,0)"
              />

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => onRequestClose(category)}
              >
                <Text style={styles.closeButtonText}>
                  {category ? "Save" : "Close"}
                </Text>
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
    backgroundColor: "rgba(0,0,0,0.35)",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  container: {
    backgroundColor: "#FFF",
    height: 160,
    padding: 16,
    width: 0.8 * width,
    borderRadius: 10
  },
  field: {
    borderBottomWidth: 1,
    borderColor: "#CCC",
    height: 40,
    marginBottom: 16
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

export default NewCategoryModal;
