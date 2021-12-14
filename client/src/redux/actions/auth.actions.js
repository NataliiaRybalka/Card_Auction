import { LOGIN, LOGOUT, REGISTRATION, LOGIN_GOOGLE, CONFIRM_EMAIL } from "../types/auth.types";

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

export const confirmEmail = userId => {
  return {
    type: CONFIRM_EMAIL,
    payload: userId
  }
};