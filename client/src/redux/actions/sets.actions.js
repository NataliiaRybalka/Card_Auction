import { REQUEST_SETS, CREATE_SET } from "../types/sets.types";

export const getSets = () => {
  return {
    type: REQUEST_SETS
  }
};

export const createSet = setData => {
  return {
    type: CREATE_SET,
    payload: setData
  }
};