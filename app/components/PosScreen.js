import React, { Component } from 'react';
import {
  Dimensions,
  FlatList,
  NativeModules,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import { PropTypes } from 'prop-types';

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

  state = {
    items: 'Food',
  };
  
  static navigationOptions = {
    drawUnderTabBar: false,
  };

  renderItemCard() {
    return (
      <ItemCard
        size={cardDimensions.size}
        spacing={cardDimensions.spacing}
      />
    );
  }

  render() {
    const { items } = this.state;
    const { navigation: { navigate } } = this.props;

    return (
      <SafeAreaView styles={styles.safeAreaView}>
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
            <CategoryButton
              style={styles.category}
              onPress={() => this.setState({ items: 'Food' })}
              title="FOOD"
            />
            <CategoryButton
              style={styles.category}
              onPress={() => this.setState({ items: 'Drink' })}
              title="DRINK"
            />
          </ScrollView>

          <CategoryButton
            style={styles.plusButton}
            onPress={() => this.setState({ items: 'Editing mode' })}
            title="+"
          />
        </View>

        <ScrollView
          style={{ flexDirection: 'column', marginBottom: 120 }}
        >
          <View style={styles.itemList}>
            {
              [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                <ItemCard
                  key={index}
                  size={cardDimensions.size}
                  spacing={cardDimensions.spacing}
                />
              ))
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: Platform.OS === 'ios' ? 0 : NativeModules.StatusBarManager.HEIGHT,
    backgroundColor: '#FFF',
  },
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

export default PosScreen;
