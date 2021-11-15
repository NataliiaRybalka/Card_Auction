import { REQUEST_CARDS, CREATE_CARD, REQUEST__CARDS_WITHOUT_PAGINATION } from "../types/cards.types";

export const getCards = filterData => {
  return {
    type: REQUEST_CARDS,
    payload: filterData
  }
};

export const getCardsWithputPagination = () => {
  return {
    type: REQUEST__CARDS_WITHOUT_PAGINATION
  }
};

export const createCard = cardData => {
  return {
    type: CREATE_CARD,
    payload: cardData
  }
};