import { GET_SETS, CREATE_SET_SUCCESS } from "../types/sets.types";

const initialState = {
  sets: [],
  set: {}
};

export const setsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SETS:
      return {...state, sets: action.payload};
      
    case CREATE_SET_SUCCESS:
      return {...state, set: action.payload};
  
    default:
      return state;
  }
};