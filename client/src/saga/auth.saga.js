import { put, call } from "redux-saga/effects";

import { LOCALHOST } from "../constants/contants";
import { POST } from "../constants/httpMethods";
import { LOGIN_SUCCESS, REGISTRATION_SUCCESS } from "../redux/types/auth.types";
import { httpHelper } from "../helpers/http.helper";
import { SHOW_ALERT } from "../redux/types/alert.types";

export function* registrationSagaWorker(data) {
  try {
    const payload = yield call(registration, data.payload);
    if (payload.status === 200) {
      yield put({ type: REGISTRATION_SUCCESS, payload }); 
    } else {
      throw payload
    }
  } catch (e) {
    yield put({ type: SHOW_ALERT, payload: e.data });
  }
};
const registration = async (data) => {
  const { request } = httpHelper();
  return await request(`${LOCALHOST}auth/registration`, POST, data);
};

export function* loginSagaWorker(data) {
  try {
    const payload = yield call(login, data.payload);
    if (payload.status === 200) {
      yield put({ type: LOGIN_SUCCESS, payload: payload.data }); 
    } else {
      throw payload
    }
  } catch (e) {
    yield put({ type: SHOW_ALERT, payload: e.data });
  }
};
const login = async (data) => {
  const { request } = httpHelper();
  return await request(`${LOCALHOST}auth/login`, POST, data);
};