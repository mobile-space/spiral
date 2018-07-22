import ProductReducer from "./products_reducer";
import CartReducer from "./cart_reducer";
import PaymentReducer from "./payment_reducer";

export default {
  products: ProductReducer,
  cart: CartReducer,
  payment: PaymentReducer
};
