import { REQUEST_USER, EDIT_USERDATA, REQUEST_SOLD_USER_CARDS } from "../types/user.types";

export const getUserById = id => {
  return {
    type: REQUEST_USER,
    payload: id
  }
};

export const editUserData = userData => {
  return {
    type: EDIT_USERDATA,
    payload: userData
  }
};

export const getSoldUserCards = filterData => {
  return {
    type: REQUEST_SOLD_USER_CARDS,
    payload: filterData
  }
};