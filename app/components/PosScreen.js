import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import CategoryButton from './common/CategoryButton';
import ItemCard from './common/ItemCard';
import cardDimensions from '../utils/dimensions';
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
    
    const categories =
      Array.from(new Set(Object.keys(products).map(key => products[key].category)));

    this.state = {
      products,
      cart,
      categories,
      selectedCategory: categories.length > 0 ? categories[0] : null,
    };
  }

  // componentWillMount() {
  //   fakeData.forEach((product) => {
  //     this.props.addProduct(product);
  //   });
  // }

  componentWillReceiveProps(nextProps) {
    const { products, cart } = nextProps;
    this.setState({
      products,
      cart,
      categories: Array.from(new Set(Object.keys(products).map(key => products[key].category))),
    });
  }

  renderItemCard = () => (
    <ItemCard
      size={cardDimensions.size}
      spacing={cardDimensions.spacing}
    />
  )

  render() {
    const {
      products, cart, categories, selectedCategory,
    } = this.state;
    const {
      navigation: { navigate },
      addOneToCart,
      removeOneFromCart,
    } = this.props;
    
    return (
      <View style={{ flex: 1 }}>
        <Header
          outerContainerStyles={{
            marginTop: 24,
            marginBottom: 24,
          }}
          backgroundColor="rgba(0,0,0,0)"
          leftComponent={(
            <Icon
              name="menu"
              color="#000"
              onPress={() => {}}
            />
          )}
          rightComponent={(
            <Icon
              name="cart"
              type="material-community"
              color="#000"
              onPress={() => navigate('cart')}
            />
          )}
        />

        <View style={styles.categoryRow}>
          <ScrollView
            style={{ flex: 1 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {
              categories.map(category => (
                <CategoryButton
                  key={category}
                  style={styles.category}
                  onPress={() => this.setState({ selectedCategory: category })}
                  title={category}
                />
              ))
            }
          </ScrollView>

          <CategoryButton
            style={styles.plusButton}
            onPress={() => navigate('newProduct')}
            title="+"
          />
        </View>

        <ScrollView>
          <View style={styles.itemList}>
            {
              Object.keys(products).reduce((accumulator, key) => {
                if (products[key].category === selectedCategory) {
                  /* eslint-disable function-paren-newline  */
                  return accumulator.concat(
                    <ItemCard
                      key={products[key].productId}
                      size={cardDimensions.size}
                      spacing={cardDimensions.spacing}
                      product={products[key]}
                      quantity={(cart[key] && cart[key].quantity) || 0}
                      onMinusPressed={() => removeOneFromCart(products[key])}
                      onPlusPressed={() => addOneToCart(products[key])}
                    />,
                  );
                  /* eslint-enable function-paren-newline  */
                }
                return accumulator;
              }, [])
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

PosScreen.propTypes = {
  products: PropTypes.PropTypes.shape({}).isRequired,
  cart: PropTypes.PropTypes.shape({}).isRequired,
  addOneToCart: PropTypes.func.isRequired,
  removeOneFromCart: PropTypes.func.isRequired,
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
    marginLeft: 32,
  },
  itemList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default (() => {
  const mapStateToProps = state => ({
    products: state.products,
    cart: state.cart,
  });

  /* eslint-disable global-require  */
  const { addProduct } = require('../actions/products_actions');
  const {
    addOneToCart,
    removeOneFromCart,
  } = require('../actions/cart_actions');
  /* eslint-enable global-require  */

  const mapDispatchToProps = {
    addProduct,
    addOneToCart,
    removeOneFromCart,
  };

  return connect(mapStateToProps, mapDispatchToProps)(PosScreen);
})();

