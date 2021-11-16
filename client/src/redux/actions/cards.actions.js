import { REQUEST_CARDS, CREATE_CARD } from "../types/cards.types";

export const getCards = filterData => {
  return {
    type: REQUEST_CARDS,
    payload: filterData
  }
};

export const createCard = cardData => {
  return {
    type: CREATE_CARD,
    payload: cardData
  }
};