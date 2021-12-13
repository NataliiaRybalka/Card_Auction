import { put, call } from "redux-saga/effects";

import { LOCALHOST } from "../constants/contants";
import { OK, Unauthorized, Created } from "../constants/responseCodes.enum";
import { WrongToken } from "../constants/errorMessages.enum";
import { CREATE_SET_SUCCESS, GET_SETS } from "../redux/types/sets.types";
import { httpHelper } from "../helpers/http.helper";
import { updateTokens } from "../services/token.service";
import { POST } from "../constants/httpMethods";
import { SHOW_ALERT } from "../redux/types/alert.types";
import { ACCESS_TOKEN } from "../constants/localStorage.enum";

export function* getSetsWorker() {
  try {
    const payload = yield call(getSets);
    if (payload.status === OK) {
      yield put({ type: GET_SETS, payload: payload.data });
    } else {
      throw payload;
    }
  } catch (e) {
    if (e.status === Unauthorized && e.data === WrongToken) {
      yield put(updateTokens());
    }
  }
};
export const getSets = async () => {
  const { request } = httpHelper();
  return await request(`${LOCALHOST}card-sets`, localStorage.getItem(ACCESS_TOKEN));
};

export function* createSetWorker(data) {
  try {
    const payload = yield call(createSet, data.payload);
    if (payload.status === Created) {
      yield put({ type: CREATE_SET_SUCCESS, payload: payload.data });
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
const createSet = async (data) => {
  const { request } = httpHelper();
  return await request(`${LOCALHOST}card-sets`, localStorage.getItem(ACCESS_TOKEN), POST, data);
};