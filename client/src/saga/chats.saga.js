import { put, call } from "redux-saga/effects";

import { Created, OK, Unauthorized } from "../constants/responseCodes.enum";
import { WrongToken } from "../constants/errorMessages.enum";
import { GET_CHATS, GET_CHAT, SEND_MESSAGE_SUCCESS } from '../redux/types/chats.types';
import { updateTokens } from "../services/token.service";
import { getTable } from './saga.fuctions';
import { httpHelper } from "../helpers/http.helper";
import { LOCALHOST } from "../constants/contants";
import { POST } from "../constants/httpMethods";

export function* getChatsWorker(data) {
  try {
    const payload = yield call(getTable, data.payload);
    if (payload.status === OK) {
      yield put({ type: GET_CHATS, payload: payload.data });
    } else {
      throw payload;
    }
  } catch (e) {
    if (e.status === Unauthorized && e.data === WrongToken) {
      yield put(updateTokens());
    }
  }
};

export function* getChatWorker(data) {
  try {
    const payload = yield call(getChat, data.payload);
    if (payload.status === OK) {
      yield put({ type: GET_CHAT, payload: payload.data });
    } else {
      throw payload;
    }
  } catch (e) {
    if (e.status === Unauthorized && e.data === WrongToken) {
      yield put(updateTokens());
    }
  }
};
const getChat = async (data) => {
  const { request } = httpHelper();
  return await request(`${LOCALHOST}chats/${data}`, localStorage.getItem('accessToken'));
};

export function* sendMessageWorker(data) {
  try {
    const payload = yield call(sendMessage, data.payload);
    if (payload.status === Created) {
      yield put({ type: SEND_MESSAGE_SUCCESS, payload: payload.data });
    } else {
      throw payload;
    }
  } catch (e) {
    if (e.status === Unauthorized && e.data === WrongToken) {
      yield put(updateTokens());
    }
  }
};
const sendMessage = async (data) => {
  const { request } = httpHelper();
  return await request(`${LOCALHOST}chats/${data.chatId}`, localStorage.getItem('accessToken'), POST, data.message);
};