import React, { Component } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Header, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import NewCategoryModal from "./common/NewCategoryModal";
import { LinearGradient } from "expo";

class NewProductScreen extends Component {
  constructor(props) {
    super(props);

    const { products } = this.props;
    const categories = Array.from(
      new Set(Object.keys(products).map(key => products[key].category))
    );

    this.state = {
      name: "",
      categories,
      selectedCategory: "",
      isNewCategoryVisible: false,
      newCategory: "",
      price: null,
      isFontFinishedLoading: false
    };
  }

  componentWillMount() {
    StatusBar.setBarStyle("dark-content", true);
  }

  componentWillUnmount() {
    StatusBar.setBarStyle("light-content", true);
  }

  onSaveButtonPressed = () => {
    const {
      navigation: { goBack },
      products,
      addProduct
    } = this.props;
    const ids = Object.keys(products).map(key => products[key].productId);
    const productId = ids.length === 0 ? 1 : Math.max(...ids) + 1;

    const { name, selectedCategory, newCategory } = this.state;

    var { price } = this.state;

    //set price to a float
    price = parseFloat(price);

    if (!selectedCategory && newCategory === "") return;
    const category = selectedCategory || newCategory;

    const newProduct = {
      productId,
      name,
      category,
      price: {
        local_currency: price
      }
    };
    addProduct(newProduct);

    goBack();
  };

  showCategories = () => {
    const { categories, selectedCategory, newCategory } = this.state;

    return (newCategory ? [newCategory, ...categories] : categories).map(
      category => (
        <TouchableOpacity
          key={category}
          style={styles.category}
          onPress={() =>
            this.setState({
              selectedCategory: category,
              newCategory: ""
            })
          }
          activeOpacity={1}
        >
          <View
            style={[
              styles.selectedCategory,
              (newCategory || selectedCategory) === category && {
                borderWidth: 2,
                borderBottomColor: "#fff"
              }
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                (newCategory || selectedCategory) === category && {
                  fontWeight: "bold"
                }
              ]}
            >
              {category}
            </Text>
          </View>
        </TouchableOpacity>
      )
    );
  };

  render() {
    const { name, isNewCategoryVisible, newCategory, price } = this.state;
    const {
      navigation: { goBack }
    } = this.props;

    return (
      <LinearGradient
        style={{ flex: 1 }}
        colors={["#000000", "#323232"]}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        locations={[0.2, 0.8]}
      >
        {isNewCategoryVisible && (
          <NewCategoryModal
            category={newCategory}
            onRequestClose={category => {
              this.setState({
                isNewCategoryVisible: false,
                newCategory: category
              });
            }}
            visible={isNewCategoryVisible}
          />
        )}

        <Header
          outerContainerStyles={{
            marginTop: 24,
            marginBottom: 30,
            borderBottomWidth: 0
          }}
          backgroundColor="#rgba(0, 0, 0, 0)"
          borderBottomWidth={0}
          leftComponent={
            <TouchableOpacity onPress={() => goBack()}>
              <Icon color="#fff" name="close" type="material-community" />
            </TouchableOpacity>
          }
          centerComponent={{
            text: "New Item",
            style: {
              color: "#fff",
              fontSize: 24,
              fontWeight: "bold"
            }
          }}
          rightComponent={
            <TouchableOpacity onPress={this.onSaveButtonPressed}>
              <Icon
                color="#fff"
                name="content-save"
                type="material-community"
              />
            </TouchableOpacity>
          }
        />

        <ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.priceInput}
              placeholder="Name"
              value={name}
              onChangeText={text => this.setState({ name: text })}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholderTextColor="#fff"
            />
          </View>

          <View style={styles.categoryRow}>
            <Icon
              color="#fff"
              name="plus"
              onPress={() => this.setState({ isNewCategoryVisible: true })}
              type="material-community"
            />

            <ScrollView
              style={{ flex: 1 }}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {this.showCategories()}
            </ScrollView>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.priceInput}
              placeholder="Price in USD"
              value={`${price || ""}`}
              onChangeText={text => this.setState({ price: text })}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholderTextColor="#fff"
              keyboardType="numeric"
            />
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16
  },
  priceInput: {
    borderWidth: 1,
    borderColor: "#66ffcc",
    height: 50,
    marginBottom: 16,
    borderRadius: 10,
    padding: 5,
    color: "#fff",
    fontSize: 18
  },
  inputContainer: {
    padding: 10
  },
  categoryRow: {
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
    marginTop: 8,
    marginLeft: 24,
  },
  category: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 24
  },
  categoryText: {
    fontSize: 16,
    color: "#fff"
  },
  selectedCategory: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  }
});

NewProductScreen.propTypes = {
  products: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired,
  addProduct: PropTypes.func.isRequired
};

export default (() => {
  const mapStateToProps = state => ({
    products: state.products
  });

  /* eslint-disable global-require  */
  const { addProduct } = require("../actions/products_actions");
  /* eslint-enable global-require  */

  const mapDispatchToProps = {
    addProduct
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewProductScreen);
})();
