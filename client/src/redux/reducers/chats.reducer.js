import { GET_CHATS, CREATE_CHAT_SUCCESS } from "../types/chats.types";

const initialState = {
  chats: [],
  totalItem: null,
  chat: {}
};

export const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHATS:
      return {...state, chats: action.payload.chats, totalItem: action.payload.totalItem};

    case CREATE_CHAT_SUCCESS:
      return {...state, chat: action.payload};
  
    default:
      return state;
  }
};