import { createStackNavigator } from "react-navigation";

import PosScreen from "../components/PosScreen";
import NewProductScreen from "../components/NewProductScreen";

import PaymentScreen from "../components/PaymentScreen";
import CartScreen from "../components/CartScreen";
import DismissableStackNavigator from "./DismissableStackNavigator";

const checkoutModal = DismissableStackNavigator({
  cart: {
    screen: CartScreen,
    navigationOptions: { tabBarVisible: false }
  },
  payment: {
    screen: PaymentScreen,
    navigationOptions: { tabBarVisible: false }
  }
},
{
  headerMode: "none"
});

export default createStackNavigator({
  pos: {
    screen: PosScreen
  },
  newProduct: {
    screen: NewProductScreen,
    navigationOptions: { tabBarVisible: false }
  },
  checkout: {
    screen: checkoutModal
  }
},
{
  headerMode: "none",
  mode: "modal"
});
