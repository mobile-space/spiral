import {
  ADD_ONE_TO_CART,
  REMOVE_ONE_FROM_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART
} from "./types";

export const addOneToCart = product => ({
  type: ADD_ONE_TO_CART,
  payload: product
});

export const removeOneFromCart = product => ({
  type: REMOVE_ONE_FROM_CART,
  payload: product
});

export const addToCart = items => ({
  type: ADD_TO_CART,
  payload: items
});

export const removeFromCart = items => ({
  type: REMOVE_FROM_CART,
  payload: items
});

export const clearCart = () => ({
  type: CLEAR_CART
});
