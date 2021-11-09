import { REQUEST_USERS } from "../types/users.types";

export const getUsers = () => {
  return {
    type: REQUEST_USERS
  }
};