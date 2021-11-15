import { put, call } from "redux-saga/effects";

import { LOCALHOST } from "../constants/contants";
import { OK, Unauthorized, Created } from "../constants/responseCodes.enum";
import { WrongToken } from "../constants/errorMessages.enum";
import { httpHelper } from "../helpers/http.helper";
import { updateTokens } from "../services/token.service";
import { POST } from "../constants/httpMethods";
import { CREATE_AUCTION_SUCCESS, GET_AUCTION } from "../redux/types/auctions.types";
import { getTable } from './saga.fuctions';

export function* createAuctionWorker(data) {
  try {
    const payload = yield call(createAuction, data.payload);
    if (payload.status === Created) {
      yield put({ type: CREATE_AUCTION_SUCCESS, payload: payload.data });
    } else {
      throw payload;
    }
  } catch (e) {
    if (e.status === Unauthorized && e.data === WrongToken) {
      yield put(updateTokens());
    }
  }
};
const createAuction = async (data) => {
  const { request } = httpHelper();
  return await request(`${LOCALHOST}auctions`, localStorage.getItem('accessToken'), POST, data);
};

export function* getAuctionsWorker(data) {
  try {
    const payload = yield call(getTable, data.payload);
    if (payload.status === OK) {
      yield put({ type: GET_AUCTION, payload: payload.data });
    } else {
      throw payload;
    }
  } catch (e) {
    if (e.status === Unauthorized && e.data === WrongToken) {
      yield put(updateTokens());
    }
  }
};

