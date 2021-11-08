import { SHOW_ALERT } from '../types/alert.types';

const initialState = {
  alert: null
};

export const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {...state, alert: action.payload};
  
    default:
      return state;
  }
};