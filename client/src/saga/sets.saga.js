import { put, call } from "redux-saga/effects";

import { LOCALHOST } from "../constants/contants";
import { OK, Unauthorized, Created } from "../constants/responseCodes.enum";
import { WrongToken } from "../constants/errorMessages.enum";
import { CREATE_SET_SUCCESS, GET_SETS } from "../redux/types/sets.types";
import { httpHelper } from "../helpers/http.helper";
import { updateTokens } from "../services/token.service";
import { POST } from "../constants/httpMethods";

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
  return await request(`${LOCALHOST}card-sets`, localStorage.getItem('accessToken'));
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
    }
  }
};
const createSet = async (data) => {
  const { request } = httpHelper();
  return await request(`${LOCALHOST}card-sets`, localStorage.getItem('accessToken'), POST, data);
};