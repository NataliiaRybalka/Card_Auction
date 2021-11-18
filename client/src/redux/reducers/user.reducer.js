import { GET_USER, GET_SOLD_USER_CARDS } from "../types/user.types";

const initialState = {
  user: {},
  cards: []
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {...state, user: action.payload};

    case GET_SOLD_USER_CARDS:
      return {...state, cards: action.payload};

    default:
      return state;
  }
};