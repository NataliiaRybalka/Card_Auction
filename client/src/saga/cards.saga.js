import { put, call } from "redux-saga/effects";
import axios from 'axios';

import { LOCALHOST } from "../constants/contants";
import { OK, Unauthorized } from "../constants/responseCodes.enum";
import { WrongToken } from "../constants/errorMessages.enum";
import { GET_CARDS, CREATE_CARD_SUCCESS } from '../redux/types/cards.types';
import { SHOW_ALERT } from "../redux/types/alert.types";
import { httpHelper } from "../helpers/http.helper";
import { updateTokens } from "../services/token.service";

export function* getCardsWorker() {
  try {
    const payload = yield call(getCards);
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
const getCards = async () => {
  const { request } = httpHelper();
  return await request(`${LOCALHOST}cards`, localStorage.getItem('accessToken'));
};

export function* createCardWorker(data) {
  try {
    const payload = yield call(createCard, data.payload);
    if (payload.status === 200) {
      yield put({ type: CREATE_CARD_SUCCESS, payload });
    } else {
      throw payload;
    }
  } catch (e) {
    yield put({ type: SHOW_ALERT, payload: e.data });
  }
};
const createCard = async (data) => {
  return await axios.post(`${LOCALHOST}cards`, data, {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=something',
      'Authorization': localStorage.getItem('accessToken')
    }
  });
  // const { request } = httpHelper();
  // return await request(`${LOCALHOST}cards`, localStorage.getItem('accessToken'), 'POST', data);
};