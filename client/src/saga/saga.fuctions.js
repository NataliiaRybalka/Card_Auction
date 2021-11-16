import { LOCALHOST } from "../constants/contants";
import { httpHelper } from "../helpers/http.helper";

export const getTable = async (params) => {
  let query = '?';
  for (const filter in params) {
    if (params[filter] !== '' && filter !== 'url') {
      query += `${filter}=${params[filter]}&`;
    }
  }

  const { request } = httpHelper();
  return await request(`${LOCALHOST}${params.url}${query}`, localStorage.getItem('accessToken'));
};