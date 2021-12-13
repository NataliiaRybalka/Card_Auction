import { LOGIN, LOGOUT, REGISTRATION, LOGIN_GOOGLE } from "../types/auth.types";

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

export const loginGoogle = userData => {
  return {
    type: LOGIN_GOOGLE,
    payload: userData
  }
};