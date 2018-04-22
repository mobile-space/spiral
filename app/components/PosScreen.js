import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Icon, Header, Badge } from 'react-native-elements';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import CategoryButton from './common/CategoryButton';
import ItemCard from './common/ItemCard';
import cardDimensions from '../utils/dimensions';
import ItemQuantityModal from './common/ItemQuantityModal';
// import fakeData from '../utils/fake_data';

class PosScreen extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  static navigationOptions = {
    drawUnderTabBar: false,
  };

  constructor(props) {
    super(props);

    const { products, cart } = this.props;

    /* eslint-disable function-paren-newline  */
    const categories = Array.from(
      new Set(Object.keys(products).map(key => products[key].category)),
    );
    /* eslint-enable function-paren-newline  */

    this.state = {
      products,
      cart,
      categories,
      selectedCategory: categories.length > 0 ? categories[0] : null,
      selectedProduct: null,
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
        new Set(Object.keys(products).map(key => products[key].category)),
      ),
    });
    /* eslint-enable function-paren-newline  */
  }

  getCartQuantity = () => {
    const { cart } = this.state;
    return Object.keys(cart).reduce((accumulator, key) => (
      accumulator + cart[key].quantity
    ), 0);
  }

  render() {
    const {
      products, categories, selectedCategory, selectedProduct,
    } = this.state;
    const {
      navigation: { navigate, goBack },
      addToCart,
    } = this.props;

    const quantity = this.getCartQuantity();

    return (
      <View style={{ flex: 1 }}>
        {selectedProduct &&
          <ItemQuantityModal
            addToCartPressed={items => addToCart(items)}
            onRequestClose={() => this.setState({ selectedProduct: null })}
            product={selectedProduct}
            visible
          />
        }

        <Header
          outerContainerStyles={{
            marginTop: 24,
            marginBottom: 24,
          }}
          backgroundColor="rgba(0,0,0,0)"
          leftComponent={
            <Icon
              name="menu"
              color="#000"
              onPress={() => goBack()}
            />
          }
          rightComponent={
            <TouchableOpacity
              style={{ flexDirection: 'row' }}
              onPress={() => navigate('cart')}
            >
              <Icon
                name="cart"
                type="material-community"
                color="#000"
              />

              {!!quantity &&
                <Badge
                  value={this.getCartQuantity()}
                  textStyle={{ color: '#fff' }}
                  containerStyle={styles.badge}
                  wrapperStyle={{}}
                />
              }
            </TouchableOpacity>
          }
        />

        <View style={styles.categoryRow}>
          <TouchableOpacity
            style={styles.plusButton}
            onPress={() => navigate('newProduct')}
          >
            <Icon
              name="plus"
              type="material-community"
              color="#000"
            />
          </TouchableOpacity>

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
                    onPress={product => this.setState({ selectedProduct: product })}
                  />,
                );
                /* eslint-enable function-paren-newline  */
              }
              return accumulator;
            }, [])}
          </View>
        </ScrollView>
      </View>
    );
  }
}

PosScreen.propTypes = {
  products: PropTypes.PropTypes.shape({}).isRequired,
  cart: PropTypes.PropTypes.shape({}).isRequired,
  addToCart: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  categoryRow: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    marginLeft: 16,
    marginRight: 16,
  },
  category: {
    marginLeft: 16,
    marginRight: 32,
  },
  plusButton: {
    marginRight: 16,
  },
  itemList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badge: {
    backgroundColor: '#ef384e',
    padding: 5,
    left: 2,
    top: 1,
  },
});

export default (() => {
  const mapStateToProps = state => ({
    products: state.products,
    cart: state.cart,
  });

  /* eslint-disable global-require  */
  const {
    addToCart,
  } = require('../actions/cart_actions');
  /* eslint-enable global-require  */

  const mapDispatchToProps = {
    addToCart,
  };

  return connect(mapStateToProps, mapDispatchToProps)(PosScreen);
})();
