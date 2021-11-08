import { takeEvery } from "redux-saga/effects";

import { authSagaWorker } from "./auth.saga";
import { REGISTRATION } from "../redux/types/auth.types";

export function* sagaWatcher() {
  yield takeEvery(REGISTRATION, authSagaWorker)
}