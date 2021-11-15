import { REQUEST_USERS } from "../types/users.types";

export const getUsers = filterData => {
  return {
    type: REQUEST_USERS,
    payload: filterData
  }
};