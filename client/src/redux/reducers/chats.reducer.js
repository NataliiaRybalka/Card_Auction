import { GET_CHATS, GET_CHAT } from "../types/chats.types";

const initialState = {
  chats: [],
  totalItem: null,
  chat: {}
};

export const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHATS:
      return {...state, chats: action.payload.chats, totalItem: action.payload.totalItem};

    case GET_CHAT:
      return {...state, chat: action.payload};
  
    default:
      return state;
  }
};