import { SHOW_ALERT } from '../types/alert.types';

export function showAlert(msg) {
  return dispatch => {
    dispatch({
      type: SHOW_ALERT,
      payload: msg
    })
  }
}