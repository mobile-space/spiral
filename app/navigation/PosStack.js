import { StackNavigator } from 'react-navigation';

import PosScreen from '../components/PosScreen';
import CartScreen from '../components/CartScreen';

export default StackNavigator({
  pos: {
    screen: PosScreen,
  },
  cart: {
    screen: CartScreen,
    navigationOptions: { tabBarVisible: false },
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});
