import { put, call } from "redux-saga/effects";

import { LOCALHOST } from "../constants/contants";
import { REGISTRATION, REGISTRATION_SUCCESS } from "../redux/types/auth.types";

export function* authSagaWorker(data) {
  const response = yield call(registration, data.payload);
  yield put({ type: REGISTRATION_SUCCESS, response }); 
}

const registration = async (data) => {
  const res = await fetch(`${LOCALHOST}auth/registration`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  return await res.json();
}