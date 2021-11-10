import { REQUEST_CARDS, CREATE_CARD } from "../types/cards.types";

export const getCards = () => {
  return {
    type: REQUEST_CARDS
  }
};

export const createCard = cardData => {
  return {
    type: CREATE_CARD,
    payload: cardData
  }
};