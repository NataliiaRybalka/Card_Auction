import { GET_USERS } from "../types/users.types";

const initialState = {
  users: [],
  roles: []
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {...state, users: state.users.concat([action.payload.users]), roles: state.roles.concat([action.payload.roles])};
  
    default:
      return state;
  }
};