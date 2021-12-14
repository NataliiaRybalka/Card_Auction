import { put, call } from "redux-saga/effects";

import { LOCALHOST } from "../constants/contants";
import { POST, PUT } from "../constants/httpMethods";
import { Created, OK } from '../constants/responseCodes.enum';
import { LOGIN_SUCCESS, REGISTRATION_SUCCESS } from "../redux/types/auth.types";
import { httpHelper } from "../helpers/http.helper";
import { SHOW_ALERT } from "../redux/types/alert.types";
import { setTokenAndRoleServiceWherLogin } from "../services/token.service";

export function* registrationWorker(data) {
  try {
    const payload = yield call(registration, data.payload);
    if (payload.status === Created) {
      yield put({ type: REGISTRATION_SUCCESS, payload: payload.data });
    } else {
      throw payload;
    }
  } catch (e) {
    yield put({ type: SHOW_ALERT, payload: e.data });
  }
};
const registration = async (data) => {
  const { request } = httpHelper();
  return await request(`${LOCALHOST}auth/registration`, null, POST, data);
};

export function* loginWorker(data) {
  try {
    const payload = yield call(login, data.payload);
    if (payload.status === OK) {
      yield put({ type: LOGIN_SUCCESS, payload: payload.data });
      yield put(setTokenAndRoleServiceWherLogin(payload.data.user.id, payload.data.userTokens, payload.data.user.role_id));
    } else {
      throw payload;
    }
  } catch (e) {
    yield put({ type: SHOW_ALERT, payload: e.data });
  }
};
const login = async (data) => {
  const { request } = httpHelper();
  return await request(`${LOCALHOST}auth/login`, null, POST, data);
};

export function* loginGoogleWorker(data) {
  try {
    const payload = yield call(loginGoogle, data.payload);
    if (payload.status === OK) {
      yield put({ type: LOGIN_SUCCESS, payload: payload.data });
      yield put(setTokenAndRoleServiceWherLogin(payload.data.user.id, payload.data.userTokens, payload.data.user.role_id));
    } else {
      throw payload;
    }
  } catch (e) {
    yield put({ type: SHOW_ALERT, payload: e.data });
  }
};
const loginGoogle = async (data) => {
  const { request } = httpHelper();
  return await request(`${LOCALHOST}auth/login-google`, null, POST, data);
};

export function* confirmEmailWorker(data) {
  try {
    const payload = yield call(confirmEmail, data.payload);
    if (payload.status !== Created) {
      throw payload; 
    }
  } catch (e) {
    yield put({ type: SHOW_ALERT, payload: e.data });
  }
};
const confirmEmail = async (data) => {
  const { request } = httpHelper();
  return await request(`${LOCALHOST}auth/verify/${data}`);
};

export function* accountRecoveryWorker(data) {
  try {
    const payload = yield call(accountRecovery, data.payload);
    if (payload.status !== Created) {
      throw payload; 
    }
  } catch (e) {
    yield put({ type: SHOW_ALERT, payload: e.data });
  }
};
const accountRecovery = async (data) => {
  const { request } = httpHelper();
  return await request(`${LOCALHOST}auth/account-recovery`, null, POST, data);
};

export function* refreshPasswordWorker(data) {
  try {
    const payload = yield call(refreshPassword, data.payload);
    if (payload.status !== Created) {
      throw payload; 
    }
  } catch (e) {
    yield put({ type: SHOW_ALERT, payload: e.data });
  }
};
const refreshPassword = async (data) => {
  const { request } = httpHelper();
  return await request(`${LOCALHOST}auth/refresh-password/${data.userId}`, null, PUT, data);
};