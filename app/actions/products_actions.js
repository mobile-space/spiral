import { ADD_PRODUCT } from './types';

export const addProduct = product => ({
  type: ADD_PRODUCT,
  payload: product,
});
