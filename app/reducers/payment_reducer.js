import { GO_TO_PAYMENT } from "../actions/types";

const INITIAL_STATE = {
  amount: 0,
  currency: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GO_TO_PAYMENT: {
      const {
        payload: { amount, currency }
      } = action;
      return { ...state, amount, currency };
    }
    default:
      return state;
  }
};
