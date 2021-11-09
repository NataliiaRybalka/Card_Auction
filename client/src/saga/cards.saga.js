import { put, call } from "redux-saga/effects";

import { LOCALHOST } from "../constants/contants";
import { GET_CARDS } from '../redux/types/cards.types';
import { SHOW_ALERT } from "../redux/types/alert.types";
import { httpHelper } from "../helpers/http.helper";

export function* getCardsWorker() {
  try {
    const payload = yield call(getCards);
    if (payload.status === 200) {
      yield put({ type: GET_CARDS, payload: payload.data.cards });
    }
  } catch (e) {
    yield put({ type: SHOW_ALERT, payload: e.data });
  }
};
const getCards = async () => {
  const { request } = httpHelper();
  return await request(`${LOCALHOST}cards`, localStorage.getItem('accessToken'));
};