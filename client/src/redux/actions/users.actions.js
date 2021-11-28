import { REQUEST_USERS, REQUEST_TOTAL_USERS, REQUEST_USERS_WITHOUT_FILTER } from "../types/users.types";

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

export const getUsersWithoutPagination = () => {
  return {
    type: REQUEST_USERS_WITHOUT_FILTER
  }
};