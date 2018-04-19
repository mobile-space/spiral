import {
  ADD_ONE_TO_CART,
  REMOVE_ONE_FROM_CART,
} from './types';

export const addOneToCart = product => ({
  type: ADD_ONE_TO_CART,
  payload: product,
});

export const removeOneToCart = product => ({
  type: REMOVE_ONE_FROM_CART,
  payload: product,
});
