import React, { Component } from 'react';
import {
  Button,
  NativeModules,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Header } from 'react-native-elements';
import { PropTypes } from 'prop-types';

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
          leftComponent={{ icon: 'menu', color: '#000' }}
          rightComponent={(
            <Button
              onPress={() => navigate('cart')}
              title="Cart"
              color="#000"
            />
          )}
        />

        <View style={styles.categoryRow}>
          <ScrollView
            style={{ flex: 1 }}
            horizontal
          >
            <Button
              style={styles.category}
              onPress={() => this.setState({ items: 'Food' })}
              title="FOOD"
            />
            <Button
              style={styles.category}
              onPress={() => this.setState({ items: 'Drink' })}
              title="DRINK"
            />
          </ScrollView>

          <Button
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
