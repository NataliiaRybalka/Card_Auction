import { put, call } from "redux-saga/effects";
import axios from 'axios';

import { LOCALHOST } from "../constants/contants";
import { OK, Unauthorized, Created } from "../constants/responseCodes.enum";
import { WrongToken } from "../constants/errorMessages.enum";
import { GET_CARDS, CREATE_CARD_SUCCESS, GET_USER_CARDS_WITHOUT_FILTER } from '../redux/types/cards.types';
import { updateTokens } from "../services/token.service";
import { getTable } from './saga.fuctions';
import { httpHelper } from "../helpers/http.helper";
import { SHOW_ALERT } from "../redux/types/alert.types";
import { ACCESS_TOKEN, ID } from "../constants/localStorage.enum";

export function* getCardsWorker(data) {
  try {
    const payload = yield call(getTable, data.payload);
    if (payload.status === OK) {
      yield put({ type: GET_CARDS, payload: payload.data });
    } else {
      throw payload;
    }
  } catch (e) {
    if (e.status === Unauthorized && e.data === WrongToken) {
      yield put(updateTokens());
    }
  }
};

export function* getCardsWithoutFilterWorker() {
  try {
    const payload = yield call(getCardsWithoutFilter);
    if (payload.status === OK) {
      yield put({ type: GET_CARDS, payload: payload.data });
    } else {
      throw payload;
    }
  } catch (e) {
    if (e.status === Unauthorized && e.data === WrongToken) {
      yield put(updateTokens());
    }
  }
};
const getCardsWithoutFilter = async () => {
  const { request } = httpHelper();
  return await request(`${LOCALHOST}cards`, localStorage.getItem(ACCESS_TOKEN));
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
    } else {
      yield put({ type: SHOW_ALERT, payload: e.data });
    }
  }
};
const createCard = async (data) => {
  return await axios.post(`${LOCALHOST}cards`, data, {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=something',
      'Authorization': localStorage.getItem(ACCESS_TOKEN)
    }
  });
};

export function* getSoldUserCardsByIdWorker(data) {
  try {
    const payload = yield call(getTable, data.payload);
    if (payload.status === OK) {
      yield put({ type: GET_CARDS, payload: payload.data });
    } else {
      throw payload;
    }
  } catch (e) {
    if (e.status === Unauthorized && e.data === WrongToken) {
      yield put(updateTokens());
    }
  }
};

export function* getUserCardsWorker(data) {
  try {
    const payload = yield call(getUserCards, data.payload);
    if (payload.status === OK) {
      yield put({ type: GET_CARDS, payload: payload.data });
    } else {
      throw payload;
    }
  } catch (e) {
    if (e.status === Unauthorized && e.data === WrongToken) {
      yield put(updateTokens());
    }
  }
};
export const getUserCards = async (params) => {
  let query = '?';
  for (const filter in params) {
    if (params[filter] !== '' && filter !== 'url') {
      query += `${filter}=${params[filter]}&`;
    }
  }

  const { request } = httpHelper();
  return await request(`${LOCALHOST}cards/${localStorage.getItem(ID)}${query}`, localStorage.getItem(ACCESS_TOKEN));
};

export function* getUserCardsWithoutFilterWorker() {
  try {
    const payload = yield call(getUserCardsWithoutFilter);
    if (payload.status === OK) {
      yield put({ type: GET_USER_CARDS_WITHOUT_FILTER, payload: payload.data });
    } else {
      throw payload;
    }
  } catch (e) {
    if (e.status === Unauthorized && e.data === WrongToken) {
      yield put(updateTokens());
    }
  }
};
const getUserCardsWithoutFilter = async () => {
  const { request } = httpHelper();
  return await request(`${LOCALHOST}cards/${localStorage.getItem(ID)}`, localStorage.getItem(ACCESS_TOKEN));
};