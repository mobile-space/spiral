import { ADD_PRODUCT } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PRODUCT: {
      const { productId } = action.payload;
      return { ...state, [productId]: action.payload };
    }
    default:
      return state;
  }
};
