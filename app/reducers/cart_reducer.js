import {
  ADD_ONE_TO_CART,
  REMOVE_ONE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  REMOVE_FROM_CART,
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ONE_TO_CART: {
      const { productId } = action.payload;
      if (state[productId]) {
        // Increase quantity by 1
        return {
          ...state,
          [productId]: Object.assign(state[productId], {
            quantity: state[productId].quantity + 1,
          }),
        };
      }

      // New item to cart
      return {
        ...state,
        [productId]: Object.assign(action.payload, { quntity: 1 }),
      };
    }

    case REMOVE_ONE_FROM_CART: {
      const { productId } = action.payload;

      if (state[productId]) {
        if (state[productId].quantity === 1) {
          // Remove last item to cart
          return {
            ...state,
            [productId]: undefined,
          };
        }

        // Decrease quantity by 1
        return {
          ...state,
          [productId]: Object.assign(state[productId], {
            quantity: state[productId].quantity - 1,
          }),
        };
      }

      return state;
    }

    case INCREASE_QUANTITY: {
      const { productId } = action.payload;
      return {
        ...state,
        [productId]: Object.assign(state[productId], {
          quantity: state[productId].quantity + 1,
        }),
      };
    }

    case DECREASE_QUANTITY: {
      const { productId } = action.payload;
      return {
        ...state,
        [productId]: Object.assign(state[productId], {
          quantity: state[productId].quantity - 1,
        }),
      };
    }

    case REMOVE_FROM_CART: {
      const { productId } = action.payload;
      return {
        ...state,
        [productId]: undefined,
      };
    }

    default:
      return state;
  }
};
