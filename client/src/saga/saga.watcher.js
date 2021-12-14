import { takeEvery } from "redux-saga/effects";

import { registrationWorker, loginWorker, loginGoogleWorker, confirmEmailWorker, accountRecoveryWorker, refreshPasswordWorker } from "./auth.saga";
import { getUsersWorker, getTotalUsersWorker, getUsersWithoutPaginationWorker } from './users.saga';
import { getCardsWorker, createCardWorker, getCardsWithoutFilterWorker, getSoldUserCardsByIdWorker, getUserCardsWorker } from "./cards.saga";
import { createSetWorker, getSetsWorker } from "./sets.saga";
import { createAuctionWorker, getAuctionsWorker, getTotalAuctionsWorker, createBetWorker } from "./auctions.saga";
import { getUserByIdWorker, editUserDataWorker, getBalanceWorker, changeBalanceWorker, deleteUserWorker } from "./user.saga";
import { getChatsWorker, getChatWorker } from "./chats.saga";
import { LOGIN, REGISTRATION, LOGIN_GOOGLE, CONFIRM_EMAIL, REFRESH_PASSWORD, ACCOUNT_RECOVERY } from "../redux/types/auth.types";
import { REQUEST_USERS, REQUEST_TOTAL_USERS, REQUEST_USERS_WITHOUT_FILTER } from "../redux/types/users.types";
import { CREATE_CARD, REQUEST_CARDS, REQUEST_CARDS_WITHOUT_FILTER, REQUEST_SOLD_USER_CARDS, REQUEST_USER_CARDS } from "../redux/types/cards.types";
import { CREATE_SET, REQUEST_SETS } from "../redux/types/sets.types";
import { CREATE_AUCTION, REQUEST_AUCTION, REQUEST_TOTAL_AUCTION, CREATE_BET } from "../redux/types/auctions.types";
import { REQUEST_USER, EDIT_USERDATA, REQUEST_BALANCE, CHANGE_BALANCE, DELETE_USER } from "../redux/types/user.types";
import { REQUEST_CHATS, REQUEST_CHAT } from "../redux/types/chats.types";

export function* sagaWatcher() {
  yield takeEvery(REGISTRATION, registrationWorker);
  yield takeEvery(LOGIN, loginWorker);
  yield takeEvery(LOGIN_GOOGLE, loginGoogleWorker);
  yield takeEvery(CONFIRM_EMAIL, confirmEmailWorker);
  yield takeEvery(ACCOUNT_RECOVERY, accountRecoveryWorker);
  yield takeEvery(REFRESH_PASSWORD, refreshPasswordWorker);
  yield takeEvery(REQUEST_USERS, getUsersWorker);
  yield takeEvery(REQUEST_TOTAL_USERS, getTotalUsersWorker);
  yield takeEvery(REQUEST_USERS_WITHOUT_FILTER, getUsersWithoutPaginationWorker);
  yield takeEvery(REQUEST_CARDS, getCardsWorker);
  yield takeEvery(REQUEST_CARDS_WITHOUT_FILTER, getCardsWithoutFilterWorker);
  yield takeEvery(CREATE_CARD, createCardWorker);
  yield takeEvery(REQUEST_SOLD_USER_CARDS, getSoldUserCardsByIdWorker);
  yield takeEvery(REQUEST_USER_CARDS, getUserCardsWorker);
  yield takeEvery(REQUEST_SETS, getSetsWorker);
  yield takeEvery(DELETE_USER, deleteUserWorker);
  yield takeEvery(CREATE_SET, createSetWorker);
  yield takeEvery(CREATE_AUCTION, createAuctionWorker);
  yield takeEvery(REQUEST_AUCTION, getAuctionsWorker);
  yield takeEvery(REQUEST_TOTAL_AUCTION, getTotalAuctionsWorker);
  yield takeEvery(CREATE_BET, createBetWorker);
  yield takeEvery(REQUEST_USER, getUserByIdWorker);
  yield takeEvery(EDIT_USERDATA, editUserDataWorker);
  yield takeEvery(REQUEST_BALANCE, getBalanceWorker);
  yield takeEvery(CHANGE_BALANCE, changeBalanceWorker);
  yield takeEvery(REQUEST_CHATS, getChatsWorker);
  yield takeEvery(REQUEST_CHAT, getChatWorker);
}