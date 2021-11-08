import { REGISTRATION, LOGIN, LOGOUT } from "../types/auth.types";

const initialState = {
  isLogin: false,
  user: {},
  userTokens: {}
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION:
      return {...state, isLogin: true, user: action.payload};

    case LOGIN:
      return {...state, isLogin: true, user: action.payload};

    case LOGOUT:
      return {...state, isLogin: false};
  
    default:
      return state;
  }
};