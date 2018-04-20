import { StackNavigator } from 'react-navigation';

import PaymentScreen from '../components/PaymentScreen';
import CartScreen from '../components/CartScreen';
import PosStack from './PosStack';

export default StackNavigator({
  payment: {
    screen: PaymentScreen,
  },

  cart: {
    screen: CartScreen
  },

},{
  initialRouteName: 'cart',
  headerMode: 'none'
})
