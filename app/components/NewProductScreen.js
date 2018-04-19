import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Header,
  Icon,
  Input,
  ListItem,
} from 'react-native-elements';
import { connect } from 'react-redux';

class NewProductScreen extends Component {
  constructor(props) {
    super(props);

    const { products } = this.props;
    const categories =
      Array.from(new Set(Object.keys(products).map(key => products[key].category)));

    this.state = {
      name: '',
      categories,
      categoryIndex: null,
      newCategory: '',
      image: '',
      price: null,
    };
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
      name, categories, categoryIndex, newCategory, image, price,
    } = this.state;

    if (categoryIndex === null && newCategory === '') return;
    const category = categoryIndex !== null ? categories[categoryIndex] : newCategory;

    const newProduct = {
      productId,
      name,
      category,
      image,
      price: {
        local_currency: price,
      },
    };
    addProduct(newProduct);

    goBack();
  };

  render() {
    const {
      name, categories, categoryIndex, newCategory, image, price,
    } = this.state;
    const {
      navigation: { goBack },
      addProduct,
    } = this.props;

    return (
      <View style={{ flex: 1 }}>
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
            text: 'New Product',
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
          <Input
            style={{ height: 40, marginBottom: 16 }}
            placeholder="name"
            value={name}
            onChangeText={text => this.setState({ name: text })}
          />

          {
            categories.map((category, index) => (
              <ListItem
                key={category}
                title={category}
                checkmark={categoryIndex === index}
                onPress={() => this.setState({ categoryIndex: index, newCategory: '' })}
              />
            ))
          }

          <Input
            style={{ height: 40, marginBottom: 16 }}
            placeholder="New Category"
            value={newCategory}
            onChangeText={(text) => {
              this.setState({
                categoryIndex: (text ? null : categoryIndex),
                newCategory: text,
              });
            }}
          />

          <Input
            style={{ height: 40, marginBottom: 16 }}
            placeholder="image"
            value={image}
            onChangeText={text => this.setState({ image: text })}
          />

          <Input
            style={{ height: 40, marginBottom: 16 }}
            placeholder="price"
            value={`${price || 0}`}
            onChangeText={text => this.setState({ price: parseFloat(text) })}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});

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

