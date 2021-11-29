import { REQUEST_CHATS, CREATE_CHAT } from '../types/chats.types';

export const getChats = filterData => {
  return {
    type: REQUEST_CHATS,
    payload: filterData
  }
};

export const createChat = userId => {
  return {
    type: CREATE_CHAT,
    payload: userId
  }
};