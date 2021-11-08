import { LOGIN, LOGOUT, REGISTRATION, REGISTRATION_SUCCESS } from "../types/auth.types";

export const registration = (user) => {
  return {
    type: REGISTRATION,
    payload: user
  }
};

export const registration_success = (user) => {
  return {
    type: REGISTRATION_SUCCESS,
    payload: user
  }
};

export const login = (user, userTokens) => {
  return {
    type: LOGIN,
    payload: { user, userTokens }
  }
};

export const logout = () => {
  return {
    type: LOGOUT
  }
};