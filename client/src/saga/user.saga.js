import { put, call } from "redux-saga/effects";
import axios from 'axios';

import { GET_USER } from "../redux/types/user.types";
import { LOCALHOST } from "../constants/contants";
import { OK, Unauthorized, Created } from "../constants/responseCodes.enum";
import { WrongToken } from "../constants/errorMessages.enum";
import { httpHelper } from "../helpers/http.helper";
import { updateTokens } from "../services/token.service";
import { getTable } from "./saga.fuctions";

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
  return await request(`${LOCALHOST}users/${localStorage.getItem('id')}`, localStorage.getItem('accessToken'));
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
  return await axios.put(`${LOCALHOST}users/${localStorage.getItem('id')}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=something',
      'Authorization': localStorage.getItem('accessToken')
    }
  });
};

export function* getSoldUserCardsByIdWorker(data) {
  try {
    const payload = yield call(getTable, data.payload);
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