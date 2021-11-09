import { REQUEST_CARDS } from "../types/cards.types";

export const getCards = () => {
  return {
    type: REQUEST_CARDS
  }
};