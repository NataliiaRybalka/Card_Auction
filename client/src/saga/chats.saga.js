import { put, call } from "redux-saga/effects";

import { OK, Unauthorized } from "../constants/responseCodes.enum";
import { WrongToken } from "../constants/errorMessages.enum";
import { GET_CHATS } from '../redux/types/chats.types';
import { updateTokens } from "../services/token.service";
import { getTable } from './saga.fuctions';

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