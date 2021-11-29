import { REQUEST_CHATS, REQUEST_CHAT, SEND_MESSAGE } from '../types/chats.types';

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

export const sendMessage = messageData => {
  return {
    type: SEND_MESSAGE,
    payload: messageData
  }
};