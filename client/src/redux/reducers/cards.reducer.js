import { GET_CARDS, CREATE_CARD_SUCCESS } from "../types/cards.types";

const initialState = {
  cards: [],
  totalItem: null,
  card: {}
};

export const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARDS:
      return {...state, cards: action.payload.cards, totalItem: action.payload.totalItem};
    case CREATE_CARD_SUCCESS:
      return {...state, card: action.payload};
  
    default:
      return state;
  }
};