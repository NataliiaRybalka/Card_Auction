import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import { alertReducer } from "./alert.reducer";
import { usersReducer } from "./users.reducer";
import { cardsReducer } from "./cards.reducer";
import { setsReducer } from "./sets.reducer";

export const rootReducer = combineReducers({
  authReducer,
  alertReducer,
  usersReducer,
  cardsReducer,
  setsReducer
});