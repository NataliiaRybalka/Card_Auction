import { put, call } from "redux-saga/effects";

import { LOCALHOST } from "../constants/contants";
import { OK, Unauthorized, Created } from "../constants/responseCodes.enum";
import { WrongToken } from "../constants/errorMessages.enum";
import { CREATE_SET_SUCCESS, GET_SETS } from "../redux/types/sets.types";
import { httpHelper } from "../helpers/http.helper";
import { updateTokens } from "../services/token.service";

export function* getSetsWorker() {
  try {
    const payload = yield call(getSets);
    if (payload.status === OK) {
      yield put({ type: GET_SETS, payload: payload.data });
    } else {
      throw payload;
    }
  } catch (e) {
    if (e.status === Unauthorized && e.data === WrongToken) {
      yield put(updateTokens());
    }
  }
};
const getSets = async () => {
  const { request } = httpHelper();
  return await request(`${LOCALHOST}card-sets`, localStorage.getItem('accessToken'));
};

// export function* createSetWorker(data) {
//   try {
//     const payload = yield call(createCard, data.payload);
//     if (payload.status === Created) {
//       yield put({ type: CREATE_CARD_SUCCESS, payload: payload.data });
//     } else {
//       throw payload;
//     }
//   } catch (e) {
//     if (e.status === Unauthorized && e.data === WrongToken) {
//       yield put(updateTokens());
//     }
//   }
// };
// const createSet = async (data) => {
//   return await axios.post(`${LOCALHOST}cards`, data, {
//     headers: {
//       'Content-Type': 'multipart/form-data; boundary=something',
//       'Authorization': localStorage.getItem('accessToken')
//     }
//   });
// };