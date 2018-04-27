import React, { Component } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Header,
  Icon,
} from 'react-native-elements';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import NewCategoryModal from './common/NewCategoryModal';

class NewProductScreen extends Component {
  constructor(props) {
    super(props);

    const { products } = this.props;
    const categories =
      Array.from(new Set(Object.keys(products).map(key => products[key].category)));

    this.state = {
      name: '',
      categories,
      selectedCategory: '',
      isNewCategoryVisible: false,
      newCategory: '',
      price: null,
    };
  }

  componentWillMount() {
    StatusBar.setBarStyle('dark-content', true);
  }

  componentWillUnmount() {
    StatusBar.setBarStyle('light-content', true);
  }

  onSaveButtonPressed = () => {
    const {
      navigation: { goBack },
      products,
      addProduct,
    } = this.props;
    const ids = Object.keys(products).map(key => products[key].productId);
    const productId = Math.max(...ids) + 1;

    const {
      name, selectedCategory, newCategory, price,
    } = this.state;

    if (!selectedCategory && newCategory === '') return;
    const category = selectedCategory || newCategory;

    const newProduct = {
      productId,
      name,
      category,
      price: {
        local_currency: price,
      },
    };
    addProduct(newProduct);

    goBack();
  };

  showCategories = () => {
    const {
      categories, selectedCategory, newCategory,
    } = this.state;

    return (
      newCategory ? [newCategory, ...categories] : categories
    )
      .map(category => (
        <TouchableOpacity
          key={category}
          style={styles.category}
          onPress={() => this.setState({
            selectedCategory: category,
            newCategory: '',
          })}
          activeOpacity={1}
        >
        <View style = {[styles.selectedCategory, (newCategory || selectedCategory) === category && { borderWidth: 2, borderBottomColor: '#000', borderRadius: 15}]}>
          <Text style={[
              styles.categoryText,
              (newCategory || selectedCategory) === category && { fontWeight: 'bold'},
            ]}
          >
            {category}
          </Text>
        </View>
        </TouchableOpacity>
      ));
  }

  render() {
    const {
      name, isNewCategoryVisible, newCategory, price,
    } = this.state;
    const { navigation: { goBack } } = this.props;

    return (
      <View style={styles.container}>
        {isNewCategoryVisible &&
          <NewCategoryModal
            category={newCategory}
            onRequestClose={(category) => {
              this.setState({
                  isNewCategoryVisible: false,
                  newCategory: category,
              });
            }}
            visible={isNewCategoryVisible}
          />
        }

        <Header
          outerContainerStyles={{
            marginTop: 24,
            marginBottom: 24,
          }}
          backgroundColor="#rgba(0, 0, 0, 0)"
          leftComponent={
            <TouchableOpacity onPress={() => goBack()}>
              <Icon
                color="#000"
                name="close"
                type="material-community"
              />
            </TouchableOpacity>
          }
          centerComponent={{
            text: 'New Item',
            style: {
              color: '#000',
              fontSize: 24,
              fontWeight: 'bold',
            },
          }}
          rightComponent={
            <TouchableOpacity onPress={this.onSaveButtonPressed}>
              <Icon
                color="#000"
                name="content-save"
                type="material-community"
              />
            </TouchableOpacity>
          }
        />

        <ScrollView>
          <TextInput
            style={styles.field}
            placeholder="Name"
            value={name}
            onChangeText={text => this.setState({ name: text })}
            underlineColorAndroid="rgba(0,0,0,0)"
          />

          <View style={styles.categoryRow}>
            <Icon
              color="#000"
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

          <TextInput
            style={styles.field}
            placeholder="Price in USD"
            value={`${price || ''}`}
            onChangeText={text => this.setState({ price: parseFloat(text) })}
            underlineColorAndroid="rgba(0,0,0,0)"
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
  },
  field: {
    borderBottomWidth: 1,
    borderColor: '#CCC',
    height: 40,
    marginBottom: 16,
  },
  categoryRow: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  category: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 24,
  },
  categoryText: {
    fontSize: 16,
  },

  selectedCategory: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

NewProductScreen.propTypes = {
  products: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  addProduct: PropTypes.func.isRequired,
};

export default (() => {
  const mapStateToProps = state => ({
    products: state.products,
  });

  /* eslint-disable global-require  */
  const { addProduct } = require('../actions/products_actions');
  /* eslint-enable global-require  */

  const mapDispatchToProps = {
    addProduct,
  };

  return connect(mapStateToProps, mapDispatchToProps)(NewProductScreen);
})();

