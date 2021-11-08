import { LOGIN, LOGOUT, REGISTRATION } from "../types/auth.types";

export const registration = userData => {
  return {
    type: REGISTRATION,
    payload: userData
  }
};

export const login = userData => {
  return {
    type: LOGIN,
    payload: userData
  }
};

export const logout = () => {
  return {
    type: LOGOUT
  }
};