import { GET_CHATS} from "../types/chats.types";

const initialState = {
  chats: [],
  totalItem: null,
  chat: {}
};

export const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHATS:
      return {...state, chats: action.payload.chats, totalItem: action.payload.totalItem};
  
    default:
      return state;
  }
};