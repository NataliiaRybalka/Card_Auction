import { GET_CARDS } from "../types/cards.types";

const initialState = {
  cards: []
};

export const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARDS:
      return {...state, cards: state.cards.concat([action.payload])};
  
    default:
      return state;
  }
};