import { put, call } from "redux-saga/effects";

import { LOCALHOST } from "../constants/contants";
import { POST } from "../constants/httpMethods";
import { Created, OK } from '../constants/responseCodes.enum';
import { LOGIN_SUCCESS, REGISTRATION_SUCCESS } from "../redux/types/auth.types";
import { httpHelper } from "../helpers/http.helper";
import { SHOW_ALERT } from "../redux/types/alert.types";
import { setTokenAndRoleService } from "../services/token.service";

export function* registrationSagaWorker(data) {
  try {
    const payload = yield call(registration, data.payload);
    if (payload.status === Created) {
      yield put({ type: REGISTRATION_SUCCESS, payload: payload.data }); 
      yield put(setTokenAndRoleService(payload.data.userTokens));
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

export function* loginSagaWorker(data) {
  try {
    const payload = yield call(login, data.payload);
    if (payload.status === OK) {
      yield put({ type: LOGIN_SUCCESS, payload: payload.data });
      yield put(setTokenAndRoleService(payload.data.userTokens, payload.data.user.role_id));
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