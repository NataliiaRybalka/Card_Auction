import { GET_CHATS, GET_CHAT, SEND_MESSAGE_SUCCESS } from "../types/chats.types";

const initialState = {
  chats: [],
  totalItem: null,
  chat: {},
  message: null
};

export const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHATS:
      return {...state, chats: action.payload.chats, totalItem: action.payload.totalItem};

    case GET_CHAT:
      return {...state, chat: action.payload};

    case SEND_MESSAGE_SUCCESS:
      return {...state, message: action.payload};
  
    default:
      return state;
  }
};