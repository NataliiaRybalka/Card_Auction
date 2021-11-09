import { GET_USERS } from "../types/users.types";

const initialState = {
  users: []
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {...state, users: state.users.concat([action.payload])};
  
    default:
      return state;
  }
};