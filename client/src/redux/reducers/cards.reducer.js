import { GET_CARDS, CREATE_CARD_SUCCESS, GET_USER_CARDS_WITHOUT_FILTER } from "../types/cards.types";

const initialState = {
  cards: [],
  totalItem: null,
  card: {},
  userCards: []
};

export const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARDS:
      return {...state, cards: action.payload.cards, totalItem: action.payload.totalItem};
      
    case CREATE_CARD_SUCCESS:
      return {...state, card: action.payload};

    case GET_USER_CARDS_WITHOUT_FILTER:
      return {...state, userCards: action.payload.cards};
  
    default:
      return state;
  }
};