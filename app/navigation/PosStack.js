import { StackNavigator } from 'react-navigation';

import PosScreen from '../components/PosScreen';
import NewProductScreen from '../components/NewProductScreen';
import CheckoutStack from './CheckoutStack';

import PaymentScreen from '../components/PaymentScreen';
import CartScreen from '../components/CartScreen';

export default StackNavigator({
  pos: {
    screen: PosScreen,
  },
  newProduct: {
    screen: NewProductScreen,
    navigationOptions: { tabBarVisible: false },
  },
  payment: {
    screen: PaymentScreen,
    navigationOptions: { tabBarVisible: false },
  },
  cart: {
    screen: CartScreen,
    navigationOptions: { tabBarVisible: false },
  },
}, {
  headerMode: 'none',
  mode: 'modal',
});
