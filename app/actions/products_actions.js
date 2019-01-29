import { ADD_PRODUCT } from "./types";

/* eslint-disable import/prefer-default-export  */
export const addProduct = product => ({
  type: ADD_PRODUCT,
  payload: product,
});
/* eslint-enable import/prefer-default-export  */
