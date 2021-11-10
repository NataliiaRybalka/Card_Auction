import { put, call } from "redux-saga/effects";

import { LOCALHOST } from "../constants/contants";
import { OK, Unauthorized } from "../constants/responseCodes.enum";
import { WrongToken } from "../constants/errorMessages.enum";
import { GET_CARDS } from '../redux/types/cards.types';
import { SHOW_ALERT } from "../redux/types/alert.types";
import { httpHelper } from "../helpers/http.helper";
import { updateTokens } from "../services/token.service";

export function* getCardsWorker() {
  try {
    const payload = yield call(getCards);
    if (payload.status === OK) {
      yield put({ type: GET_CARDS, payload: payload.data.cards });
    }
    if (payload.status === Unauthorized && payload.data === WrongToken) {
      yield put(updateTokens());
    }
  } catch (e) {
    yield put({ type: SHOW_ALERT, payload: e.data });
  }
};
const getCards = async () => {
  const { request } = httpHelper();
  return await request(`${LOCALHOST}cards`, localStorage.getItem('accessToken'));
};