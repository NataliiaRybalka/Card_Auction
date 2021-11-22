import { REQUEST_CARDS, CREATE_CARD, REQUEST_CARDS_WITHOUT_FILTER, REQUEST_SOLD_USER_CARDS, REQUEST_USER_CARDS } from "../types/cards.types";

export const getCards = filterData => {
  return {
    type: REQUEST_CARDS,
    payload: filterData
  }
};

export const getCardsWithoutFilter = () => {
  return {
    type: REQUEST_CARDS_WITHOUT_FILTER
  }
};

export const createCard = cardData => {
  return {
    type: CREATE_CARD,
    payload: cardData
  }
};

export const getSoldUserCards = filterData => {
  return {
    type: REQUEST_SOLD_USER_CARDS,
    payload: filterData
  }
};

export const getUserCards = filterData => {
  return {
    type: REQUEST_USER_CARDS,
    payload: filterData
  }
};