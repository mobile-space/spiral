import {
  ADD_ONE_TO_CART,
  REMOVE_ONE_FROM_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART
} from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ONE_TO_CART: {
      console.log(action.payload);
      const { productId } = action.payload;
      if (state[productId]) {
        // Increase quantity by 1
        return {
          ...state,
          [productId]: Object.assign(state[productId], {
            quantity: state[productId].quantity + 1
          })
        };
      }

      // New item to cart
      return {
        ...state,
        [productId]: Object.assign(action.payload, { quantity: 1 })
      };
    }

    case REMOVE_ONE_FROM_CART: {
      console.log(state);
      const { productId } = action.payload;
      
      if (state[productId]) {
        if (state[productId].quantity === 1) {
          // Remove last item to cart
          const clone = Object.assign({}, state);
          delete clone[productId];
          return clone;
        }

        // Decrease quantity by 1
        return {
          ...state,
          [productId]: Object.assign(state[productId], {
            quantity: state[productId].quantity - 1
          })
        };
      }

      return state;
    }

    case ADD_TO_CART: {
      console.log(state);
      const {
        product,
        product: { productId },
        quantity
      } = action.payload;

      const originalQuantity =
        state[productId] && state[productId].quantity
          ? state[productId].quantity
          : 0;

      return {
        ...state,
        [productId]: Object.assign(state[productId] || product, {
          quantity: originalQuantity + quantity
        })
      };
    }

    case REMOVE_FROM_CART: {
      console.log(state);
      const { productId } = action.payload;

      const clone = Object.assign({}, state);
      delete clone[productId];
      return clone;
    }

    case CLEAR_CART:
      return INITIAL_STATE;

    default:
      return state;
  }
};
