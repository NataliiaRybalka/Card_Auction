import { takeEvery } from "redux-saga/effects";

import { registrationSagaWorker, loginSagaWorker } from "./auth.saga";
import { getUsersWorker, getTotalUsersWorker } from './users.saga';
import { getCardsWorker, createCardWorker, getCardsWithoutFilterWorker } from "./cards.saga";
import { createSetWorker, getSetsWorker } from "./sets.saga";
import { createAuctionWorker, getAuctionsWorker, getTotalAuctionsWorker, createBetWorker } from "./auctions.saga";
import { getUserByIdWorker, editUserDataWorker, getSoldUserCardsByIdWorker } from "./user.saga";
import { LOGIN, REGISTRATION } from "../redux/types/auth.types";
import { REQUEST_USERS, REQUEST_TOTAL_USERS } from "../redux/types/users.types";
import { CREATE_CARD, REQUEST_CARDS, REQUEST_CARDS_WITHOUT_FILTER } from "../redux/types/cards.types";
import { CREATE_SET, REQUEST_SETS } from "../redux/types/sets.types";
import { CREATE_AUCTION, REQUEST_AUCTION, REQUEST_TOTAL_AUCTION, CREATE_BET } from "../redux/types/auctions.types";
import { REQUEST_USER, EDIT_USERDATA, REQUEST_SOLD_USER_CARDS } from "../redux/types/user.types";

export function* sagaWatcher() {
  yield takeEvery(REGISTRATION, registrationSagaWorker);
  yield takeEvery(LOGIN, loginSagaWorker);
  yield takeEvery(REQUEST_USERS, getUsersWorker);
  yield takeEvery(REQUEST_TOTAL_USERS, getTotalUsersWorker);
  yield takeEvery(REQUEST_CARDS, getCardsWorker);
  yield takeEvery(REQUEST_CARDS_WITHOUT_FILTER, getCardsWithoutFilterWorker);
  yield takeEvery(CREATE_CARD, createCardWorker);
  yield takeEvery(REQUEST_SETS, getSetsWorker);
  yield takeEvery(CREATE_SET, createSetWorker);
  yield takeEvery(CREATE_AUCTION, createAuctionWorker);
  yield takeEvery(REQUEST_AUCTION, getAuctionsWorker);
  yield takeEvery(REQUEST_TOTAL_AUCTION, getTotalAuctionsWorker);
  yield takeEvery(CREATE_BET, createBetWorker);
  yield takeEvery(REQUEST_USER, getUserByIdWorker);
  yield takeEvery(EDIT_USERDATA, editUserDataWorker);
  yield takeEvery(REQUEST_SOLD_USER_CARDS, getSoldUserCardsByIdWorker);
}