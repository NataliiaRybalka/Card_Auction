import { REQUEST_USER, EDIT_USERDATA, REQUEST_BALANCE } from "../types/user.types";

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

export const getBalance = () => {
  return {
    type: REQUEST_BALANCE
  }
};