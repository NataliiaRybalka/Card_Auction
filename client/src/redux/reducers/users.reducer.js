import { GET_USERS } from "../types/users.types";

const initialState = {
  users: [],
  totalItem: null
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {...state, users: action.payload.users, totalItem: action.payload.totalItem};
  
    default:
      return state;
  }
};