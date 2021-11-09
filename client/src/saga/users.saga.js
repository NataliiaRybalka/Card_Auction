import { put, call } from "redux-saga/effects";

import { LOCALHOST } from "../constants/contants";
import { GET_USERS } from '../redux/types/users.types';
import { httpHelper } from "../helpers/http.helper";

export function* getUsersWorker() {
  try {
    const payload = yield call(getUsers);
    if (payload.status === 200) {
      yield put({ type: GET_USERS, payload: payload.data });
    }
  } catch (e) {

  }
};
const getUsers = async () => {
  const { request } = httpHelper();
  return await request(`${LOCALHOST}users`, localStorage.getItem('accessToken'));
};