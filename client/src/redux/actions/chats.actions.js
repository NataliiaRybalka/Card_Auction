import { REQUEST_CHATS } from '../types/chats.types';

export const getChats = filterData => {
  return {
    type: REQUEST_CHATS,
    payload: filterData
  }
};