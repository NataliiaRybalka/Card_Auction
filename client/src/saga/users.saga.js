import { put, call } from "redux-saga/effects";

import { LOCALHOST } from "../constants/contants";
import { OK, Unauthorized } from "../constants/responseCodes.enum";
import { WrongToken } from "../constants/errorMessages.enum";
import { GET_USERS, GET_TOTAL_USERS } from '../redux/types/users.types';
import { updateTokens } from "../services/token.service";
import { getTable } from './saga.fuctions';
import { httpHelper } from "../helpers/http.helper";

export function* getUsersWorker(data) {
  try {
    const payload = yield call(getTable, data.payload);
    if (payload.status === OK) {
      yield put({ type: GET_USERS, payload: payload.data });
    } else {
      throw payload;
    }
  } catch (e) {
    if (e.status === Unauthorized && e.data === WrongToken) {
      yield put(updateTokens());
    }
  }
};

export function* getTotalUsersWorker() {
  try {
    const payload = yield call(getTotalUsers);
    if (payload.status === OK) {
      yield put({ type: GET_TOTAL_USERS, payload: payload.data });
    } else {
      throw payload;
    }
  } catch (e) {
    if (e.status === Unauthorized && e.data === WrongToken) {
      yield put(updateTokens());
    }
  }
};
const getTotalUsers = async () => {
  const { request } = httpHelper();
  return await request(`${LOCALHOST}users/total`, localStorage.getItem('accessToken'));
};

export function* getUsersWithoutPaginationWorker() {
  try {
    const payload = yield call(getUsersWithoutPagination);
    if (payload.status === OK) {
      yield put({ type: GET_USERS, payload: payload.data });
    } else {
      throw payload;
    }
  } catch (e) {
    if (e.status === Unauthorized && e.data === WrongToken) {
      yield put(updateTokens());
    }
  }
};
const getUsersWithoutPagination = async () => {
  const { request } = httpHelper();
  return await request(`${LOCALHOST}users`, localStorage.getItem('accessToken'));
};