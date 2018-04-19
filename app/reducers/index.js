import { combineReducers } from 'redux';

import ProductReducer from './products_reducer';
import CartReducer from './cart_reducer';

export default {
  products: ProductReducer,
  cart: CartReducer,
};
