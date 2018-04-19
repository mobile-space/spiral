import { StackNavigator } from 'react-navigation';

import PosScreen from '../components/PosScreen';
import NewProductScreen from '../components/NewProductScreen';
import CartScreen from '../components/CartScreen';

export default StackNavigator({
  pos: {
    screen: PosScreen,
  },
  newProduct: {
    screen: NewProductScreen,
    navigationOptions: { tabBarVisible: false },
  },
  cart: {
    screen: CartScreen,
    navigationOptions: { tabBarVisible: false },
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});
