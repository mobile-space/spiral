import { GO_TO_PAYMENT } from "./types";

/* eslint-disable import/prefer-default-export */
export const goToPayment = paymentInfo => ({
  type: GO_TO_PAYMENT,
  payload: paymentInfo
});
/* eslint-enable import/prefer-default-export */
