import { put, call } from "redux-saga/effects";

import { LOCALHOST } from "../constants/contants";
import { OK, Unauthorized } from "../constants/responseCodes.enum";
import { WrongToken } from "../constants/errorMessages.enum";
import { GET_USERS } from '../redux/types/users.types';
import { SHOW_ALERT } from "../redux/types/alert.types";
import { httpHelper } from "../helpers/http.helper";
import { updateTokens } from "../services/token.service";

export function* getUsersWorker() {
  try {
    const payload = yield call(getUsers);
    if (payload.status === OK) {
      yield put({ type: GET_USERS, payload: payload.data });
    }
    if (payload.status === Unauthorized && payload.data === WrongToken) {
      yield put(updateTokens());
    }
  } catch (e) {
    yield put({ type: SHOW_ALERT, payload: e.data });
  }
};
export const getUsers = async () => {
  const { request } = httpHelper();
  return await request(`${LOCALHOST}users`, localStorage.getItem('accessToken'));
};