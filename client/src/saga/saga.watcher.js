import { takeEvery } from "redux-saga/effects";

import { registrationSagaWorker, loginSagaWorker } from "./auth.saga";
import { LOGIN, REGISTRATION } from "../redux/types/auth.types";

export function* sagaWatcher() {
  yield takeEvery(REGISTRATION, registrationSagaWorker);
  yield takeEvery(LOGIN, loginSagaWorker);
}