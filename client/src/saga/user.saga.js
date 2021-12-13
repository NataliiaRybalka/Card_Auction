import { put, call } from "redux-saga/effects";
import axios from 'axios';

import { GET_USER, GET_BALANCE } from "../redux/types/user.types";
import { LOCALHOST } from "../constants/contants";
import { OK, Unauthorized, Created, NoContent } from "../constants/responseCodes.enum";
import { WrongToken } from "../constants/errorMessages.enum";
import { httpHelper } from "../helpers/http.helper";
import { updateTokens } from "../services/token.service";
import { DELETE, POST } from "../constants/httpMethods";
import { ACCESS_TOKEN, ID } from "../constants/localStorage.enum";

export function* getUserByIdWorker() {
  try {
    const payload = yield call(getUserById);
    if (payload.status === OK) {
      yield put({ type: GET_USER, payload: payload.data });
    } else {
      throw payload;
    }
  } catch (e) {
    if (e.status === Unauthorized && e.data === WrongToken) {
      yield put(updateTokens());
    }
  }
};
const getUserById = async () => {
  const { request } = httpHelper();
  return await request(`${LOCALHOST}users/${localStorage.getItem(ID)}`, localStorage.getItem(ACCESS_TOKEN));
};

export function* editUserDataWorker(data) {
  try {
    const payload = yield call(editUserData, data.payload);
    if (payload.status === Created) {
      yield put({ type: GET_USER, payload: payload.data });
    } else {
      throw payload;
    }
  } catch (e) {
    if (e.status === Unauthorized && e.data === WrongToken) {
      yield put(updateTokens());
    }
  }
};
const editUserData = async (data) => {
  return await axios.put(`${LOCALHOST}users/${localStorage.getItem(ID)}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=something',
      'Authorization': localStorage.getItem(ACCESS_TOKEN)
    }
  });
};

export function* getBalanceWorker() {
  try {
    const payload = yield call(getBalance);
    if (payload.status === OK) {
      yield put({ type: GET_BALANCE, payload: payload.data });
    } else {
      throw payload;
    }
  } catch (e) {
    if (e.status === Unauthorized && e.data === WrongToken) {
      yield put(updateTokens());
    }
  }
};
const getBalance = async () => {
  const { request } = httpHelper();
  return await request(`${LOCALHOST}balance`, localStorage.getItem(ACCESS_TOKEN));
};

export function* changeBalanceWorker(data) {
  try {
    const payload = yield call(changeBalance, data.payload);
    if (payload.status === Created) {
      yield put({ type: GET_USER, payload: payload.data });
    } else {
      throw payload;
    }
  } catch (e) {
    if (e.status === Unauthorized && e.data === WrongToken) {
      yield put(updateTokens());
    }
  }
};
const changeBalance = async (data) => {
  const { request } = httpHelper();
  return await request(`${LOCALHOST}balance`, localStorage.getItem(ACCESS_TOKEN), POST, data);
};

export function* deleteUserWorker() {
  try {
    const payload = yield call(deleteUser);
    if (payload.status !== NoContent) {
      throw payload;
    }
  } catch (e) {
    if (e.status === Unauthorized && e.data === WrongToken) {
      yield put(updateTokens());
    }
  }
};
const deleteUser = async () => {
  const { request } = httpHelper();
  return await request(`${LOCALHOST}users/${localStorage.getItem(ID)}`, localStorage.getItem(ACCESS_TOKEN), DELETE);
};