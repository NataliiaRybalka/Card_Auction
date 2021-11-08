import { put, call } from "redux-saga/effects";

import { LOCALHOST } from "../constants/contants";
import { POST } from "../constants/httpMethods";
import { LOGIN_SUCCESS, REGISTRATION_SUCCESS } from "../redux/types/auth.types";
import { httpHelper } from "../helpers/http.helper";

export function* registrationSagaWorker(data) {
  const payload = yield call(registration, data.payload);
  yield put({ type: REGISTRATION_SUCCESS, payload }); 
};
const registration = async (data) => {
  const { request } = httpHelper();
  return await request(`${LOCALHOST}auth/registration`, POST, data);
};

export function* loginSagaWorker(data) {
  const payload = yield call(login, data.payload);
  yield put({ type: LOGIN_SUCCESS, payload }); 
};
const login = async (data) => {
  const { request } = httpHelper();
  return await request(`${LOCALHOST}auth/login`, POST, data);
};