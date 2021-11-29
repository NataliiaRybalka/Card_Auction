import { REQUEST_CHATS, REQUEST_CHAT } from '../types/chats.types';

export const getChats = filterData => {
  return {
    type: REQUEST_CHATS,
    payload: filterData
  }
};

export const getChat = userId => {
  return {
    type: REQUEST_CHAT,
    payload: userId
  }
};