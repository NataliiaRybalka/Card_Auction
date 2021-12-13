import { REQUEST_USER, EDIT_USERDATA, REQUEST_BALANCE, CHANGE_BALANCE, DELETE_USER } from "../types/user.types";

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

export const changeBalance = sum => {
  return {
    type: CHANGE_BALANCE,
    payload: sum
  }
};

export const deleteUser = () => {
  return {
    type: DELETE_USER
  }
};