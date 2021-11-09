import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import { alertReducer } from "./alert.reducer";
import { usersReducer } from "./users.reducer";
import { cardsReducer } from "./cards.reducer";

export const rootReducer = combineReducers({
  authReducer,
  alertReducer,
  usersReducer,
  cardsReducer
});