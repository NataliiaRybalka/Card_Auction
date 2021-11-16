import { put, call } from "redux-saga/effects";
import axios from 'axios';

import { LOCALHOST } from "../constants/contants";
import { OK, Unauthorized, Created } from "../constants/responseCodes.enum";
import { WrongToken } from "../constants/errorMessages.enum";
import { GET_CARDS, CREATE_CARD_SUCCESS } from '../redux/types/cards.types';
import { updateTokens } from "../services/token.service";
import { getTable } from './saga.fuctions';

export function* getCardsWorker(data) {
  try {
    const payload = yield call(getTable, data.payload);
    if (payload.status === OK) {
      yield put({ type: GET_CARDS, payload: payload.data.cards });
    } else {
      throw payload;
    }
  } catch (e) {
    if (e.status === Unauthorized && e.data === WrongToken) {
      yield put(updateTokens());
    }
  }
};

export function* createCardWorker(data) {
  try {
    const payload = yield call(createCard, data.payload);
    if (payload.status === Created) {
      yield put({ type: CREATE_CARD_SUCCESS, payload: payload.data });
    } else {
      throw payload;
    }
  } catch (e) {
    if (e.status === Unauthorized && e.data === WrongToken) {
      yield put(updateTokens());
    }
  }
};
const createCard = async (data) => {
  return await axios.post(`${LOCALHOST}cards`, data, {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=something',
      'Authorization': localStorage.getItem('accessToken')
    }
  });
};