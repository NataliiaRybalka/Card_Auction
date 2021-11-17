import { GET_USERS, GET_TOTAL_USERS } from "../types/users.types";

const initialState = {
  users: [],
  totalItem: null,
  totalUsers: []
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {...state, users: action.payload.users, totalItem: action.payload.totalItem};
      
    case GET_TOTAL_USERS:
      return {...state, totalUsers: action.payload};
  
    default:
      return state;
  }
};