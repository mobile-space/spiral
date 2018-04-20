import { StackNavigator } from 'react-navigation';

import PosScreen from '../components/PosScreen';
import NewProductScreen from '../components/NewProductScreen';
import CartScreen from '../components/CartScreen';
import CheckoutStack from './CheckoutStack';

export default StackNavigator({
  pos: {
    screen: PosScreen,
  },
  
  newProduct: {
    screen: NewProductScreen,
    navigationOptions: { tabBarVisible: false },
  },

  checkoutStack: {
    screen: CheckoutStack,
    navigationOptions: { tabBarVisible: false },
  }
}, {
  headerMode: 'none',
  mode: 'modal',
});
