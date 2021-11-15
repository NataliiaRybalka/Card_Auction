import { takeEvery } from "redux-saga/effects";

import { registrationSagaWorker, loginSagaWorker } from "./auth.saga";
import { getUsersWorker } from './users.saga';
import { getCardsWorker, createCardWorker } from "./cards.saga";
import { createSetWorker, getSetsWorker } from "./sets.saga";
import { createAuctionWorker, getAuctionsWorker, getFilterAuctionsWorker } from "./auctions.saga";
import { LOGIN, REGISTRATION } from "../redux/types/auth.types";
import { REQUEST_USERS } from "../redux/types/users.types";
import { CREATE_CARD, REQUEST_CARDS } from "../redux/types/cards.types";
import { CREATE_SET, REQUEST_SETS } from "../redux/types/sets.types";
import { CREATE_AUCTION, REQUEST_AUCTION, REQUEST_FILTER_AUCTION } from "../redux/types/auctions.types";

export function* sagaWatcher() {
  yield takeEvery(REGISTRATION, registrationSagaWorker);
  yield takeEvery(LOGIN, loginSagaWorker);
  yield takeEvery(REQUEST_USERS, getUsersWorker);
  yield takeEvery(REQUEST_CARDS, getCardsWorker);
  yield takeEvery(CREATE_CARD, createCardWorker);
  yield takeEvery(REQUEST_SETS, getSetsWorker);
  yield takeEvery(CREATE_SET, createSetWorker);
  yield takeEvery(CREATE_AUCTION, createAuctionWorker);
  yield takeEvery(REQUEST_AUCTION, getAuctionsWorker);
  yield takeEvery(REQUEST_FILTER_AUCTION, getFilterAuctionsWorker);
}