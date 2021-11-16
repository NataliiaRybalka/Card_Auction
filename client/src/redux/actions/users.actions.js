import { REQUEST_USERS, REQUEST_TOTAL_USERS } from "../types/users.types";

export const getUsers = filterData => {
  return {
    type: REQUEST_USERS,
    payload: filterData
  }
};

export const getTotalUsers = () => {
  return {
    type: REQUEST_TOTAL_USERS
  }
};