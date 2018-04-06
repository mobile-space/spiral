import {TabNavigator} from 'react-navigation';
import MarketScreen from '../components/MarketScreen';
import PosScreen from '../components/PosScreen';

export default TabNavigator({
  PosScreen: {
    screen: PosScreen
  },
  
  MarketScreen: {
    screen: MarketScreen
  },
},{
  initialRouteName: 'PosScreen'
}
);
