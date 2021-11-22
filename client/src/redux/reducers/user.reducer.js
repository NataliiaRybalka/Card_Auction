import { GET_USER, GET_BALANCE } from "../types/user.types";

const initialState = {
  user: {},
  balance: null,
  transactions: []
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {...state, user: action.payload};

    case GET_BALANCE:
      return {...state, balance: action.payload.balance, transactions: action.payload.transactions};

    default:
      return state;
  }
};