import { takeEvery } from "redux-saga/effects";

import { registrationSagaWorker, loginSagaWorker } from "./auth.saga";
import { getUsersWorker } from './users.saga';
import { LOGIN, REGISTRATION } from "../redux/types/auth.types";
import { REQUEST_USERS } from "../redux/types/users.types";

export function* sagaWatcher() {
  yield takeEvery(REGISTRATION, registrationSagaWorker);
  yield takeEvery(LOGIN, loginSagaWorker);
  yield takeEvery(REQUEST_USERS, getUsersWorker);
}