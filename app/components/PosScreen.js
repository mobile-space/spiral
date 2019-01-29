import React, { Component } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon, Header, Badge } from "react-native-elements";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { LinearGradient } from "expo";

import CategoryButton from "./common/CategoryButton";
import ItemCard from "./common/ItemCard";
import cardDimensions from "../utils/dimensions";
import ItemQuantityModal from "./common/ItemQuantityModal";
// import fakeData from '../utils/fake_data';

class PosScreen extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired
    }).isRequired
  };

  static navigationOptions = {
    drawUnderTabBar: false
  };

  constructor(props) {
    super(props);

    const { products, cart } = this.props;

    /* eslint-disable function-paren-newline  */
    const categories = Array.from(
      new Set(Object.keys(products).map(key => products[key].category))
    );
    /* eslint-enable function-paren-newline  */

    this.state = {
      products,
      cart,
      categories,
      selectedCategory: categories.length > 0 ? categories[0] : null,
      selectedProduct: null
    };
  }

  // componentWillMount() {
  //   fakeData.forEach((product) => {
  //     this.props.addProduct(product);
  //   });
  // }

  componentWillReceiveProps(nextProps) {
    const { products, cart } = nextProps;

    /* eslint-disable function-paren-newline  */
    this.setState({
      products,
      cart,
      categories: Array.from(
        new Set(Object.keys(products).map(key => products[key].category))
      )
    });
    /* eslint-enable function-paren-newline  */
  }

  getCartQuantity = () => {
    const { cart } = this.state;
    return Object.keys(cart).reduce(
      (accumulator, key) => accumulator + cart[key].quantity,
      0
    );
  };

  render() {
    const {
      products,
      categories,
      selectedCategory,
      selectedProduct
    } = this.state;

    const {
      navigation: { navigate, goBack },
      addToCart
    } = this.props;

    const quantity = this.getCartQuantity();

    return (
      <LinearGradient
        style={{ flex: 1 }}
        colors={["#000000", "#323232"]}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        locations={[0.2, 0.8]}
      >
        {selectedProduct && (
          <ItemQuantityModal
            addToCartPressed={items => addToCart(items)}
            onRequestClose={() => this.setState({ selectedProduct: null })}
            product={selectedProduct}
            visible
          />
        )}
        <Header
          outerContainerStyles={{
            marginTop: 24,
            marginBottom: 24,
            borderBottomWidth: 0
          }}
          backgroundColor="rgba(0,0,0,0)"
          leftComponent={
            <TouchableOpacity onPress={() => navigate("newProduct")}>
              <Icon color="#fff" name="plus" type="material-community" />
            </TouchableOpacity>
          }
          centerComponent={
            <Image
              source={require("../../assets/icon.png")}
              style={{
                height: 60,
                width: 60
              }}
            />
          }
          rightComponent={
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => navigate("checkout")}
            >
              <Icon name="cart" type="material-community" color="#fff" />

              {!!quantity && (
                <Badge
                  value={this.getCartQuantity()}
                  textStyle={{ color: "#fff" }}
                  containerStyle={styles.badge}
                  wrapperStyle={{}}
                />
              )}
            </TouchableOpacity>
          }
        />

        <View style={styles.categoryRow}>
          <ScrollView
            style={{ flex: 1 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {categories.map(category => (
              <CategoryButton
                key={category}
                style={styles.category}
                onPress={() => this.setState({ selectedCategory: category })}
                title={category}
                isSelected={category === selectedCategory}
              />
            ))}
          </ScrollView>
        </View>

        <ScrollView>
          <View style={styles.itemList}>
            {Object.keys(products).reduce((accumulator, key) => {
              if (products[key].category === selectedCategory) {
                /* eslint-disable function-paren-newline  */
                return accumulator.concat(
                  <ItemCard
                    key={products[key].productId}
                    size={cardDimensions.size}
                    spacing={cardDimensions.spacing}
                    product={products[key]}
                    onPress={product =>
                      this.setState({ selectedProduct: product })
                    }
                  />
                );
                /* eslint-enable function-paren-newline  */
              }
              return accumulator;
            }, [])}
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}

PosScreen.propTypes = {
  products: PropTypes.PropTypes.shape({}).isRequired,
  cart: PropTypes.PropTypes.shape({}).isRequired,
  addToCart: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  categoryRow: {
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
    marginLeft: 16,
    marginRight: 16
  },
  category: {
    marginLeft: 16,
    marginRight: 32
  },
  itemList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  badge: {
    padding: 5,
    left: 2,
    top: 1
  }
});

export default (() => {
  const mapStateToProps = state => ({
    products: state.products,
    cart: state.cart
  });

  /* eslint-disable global-require  */
  const { addToCart } = require("../actions/cart_actions");
  /* eslint-enable global-require  */

  const mapDispatchToProps = {
    addToCart
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(PosScreen);
})();
