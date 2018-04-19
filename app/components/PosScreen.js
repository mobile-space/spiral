import React, { Component } from 'react';
import {
  Dimensions,
  NativeModules,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import CategoryButton from './common/CategoryButton';
import ItemCard from './common/ItemCard';

const MIN_ROW_COUNT = 2;
const MAX_ROW_COUNT = 5;
const DEFAULT_ITEM_SIZE = 180;

const screen = Dimensions.get('window');
const width = Math.min(screen.height, screen.width);

const cardDimensions = (() => {
  const itemSpace = Math.max(16, 0.04 * width);
  
  /* eslint-disable no-mixed-operators  */
  if (width < MIN_ROW_COUNT * DEFAULT_ITEM_SIZE + MIN_ROW_COUNT * itemSpace) {
    return {
      size: (width - MIN_ROW_COUNT * itemSpace) / MIN_ROW_COUNT,
      spacing: itemSpace,
    };
  } else if (width < MAX_ROW_COUNT * DEFAULT_ITEM_SIZE + MAX_ROW_COUNT * itemSpace) {
    return {
      size: (width - MAX_ROW_COUNT * itemSpace) / MAX_ROW_COUNT,
      spacing: itemSpace,
    };
  }

  // Derive from: DEFAULT_ITEM_SIZE * count + itemSpace * count = width
  const count = Math.floor((width - itemSpace) / (DEFAULT_ITEM_SIZE + itemSpace));
  const expandedSpace = (width - DEFAULT_ITEM_SIZE * count) / count;
  return {
    size: DEFAULT_ITEM_SIZE,
    spacing: expandedSpace,
  };
  /* eslint-enable no-mixed-operators  */
})();

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
      products: Object.assign(products, cart),
      categories,
      selectedCategory: categories.length > 0 ? categories[0] : null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { products, cart } = nextProps;
    this.setState({
      products: Object.assign(products, cart),
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
    const { products, categories, selectedCategory } = this.state;
    const { navigation: { navigate } } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <Header
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
            onPress={() => {}}
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
                      title={products[key].name}
                      image={products[key].image}
                      quantity={products[key].quantity || 0}
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
  /* eslint-enable global-require  */

  const mapDispatchToProps = {
    addProduct,
  };

  return connect(mapStateToProps, mapDispatchToProps)(PosScreen);
})();

