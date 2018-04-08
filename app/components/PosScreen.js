import React, { Component } from 'react';
import {
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

class PosScreen extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    items: 'Food',
  };
  
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

        <Text>{ items }</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : NativeModules.StatusBarManager.HEIGHT,
    backgroundColor: '#FFF',
  },
  categoryRow: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
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
});

export default PosScreen;
