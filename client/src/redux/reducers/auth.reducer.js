import { REGISTRATION_SUCCESS, LOGIN_SUCCESS, LOGOUT } from "../types/auth.types";

const initialState = {
  isLogin: false,
  user: {},
  userTokens: {}
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_SUCCESS:
      return {...state, isLogin: true, user: action.payload.user, userTokens: action.payload.userTokens};

    case LOGIN_SUCCESS:
      console.log(action.payload);
      return {...state, isLogin: true, user: action.payload.user, userTokens: action.payload.userTokens};

    case LOGOUT:
      return {...state, isLogin: false};
  
    default:
      return state;
  }
};