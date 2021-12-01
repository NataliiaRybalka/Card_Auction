import { httpHelper } from "../helpers/http.helper";
import { LOCALHOST } from "../constants/contants";
import { POST } from "../constants/httpMethods";
import { ID, ACCESS_TOKEN, REFRESH_TOKEN, ROLE } from "../constants/localStorage.enum";

export const setTokenAndRoleServiceWherRegistration = (id, tokens, role) => {
  localStorage.setItem(ID, id);
  localStorage.setItem(ACCESS_TOKEN, tokens[0].access_token);
  localStorage.setItem(REFRESH_TOKEN, tokens[0].refresh_token);
  localStorage.setItem(ROLE, role);
};

export const setTokenAndRoleServiceWherLogin = (id, tokens, role) => {
  localStorage.setItem(ID, id);
  localStorage.setItem(ACCESS_TOKEN, tokens.access_token);
  localStorage.setItem(REFRESH_TOKEN, tokens.refresh_token);
  localStorage.setItem(ROLE, role);
};

export const updateTokens = async () => {
  const { request } = httpHelper();
  const res = await request(`${LOCALHOST}auth/create-tokens`, null, POST, null, {}, localStorage.getItem(REFRESH_TOKEN));

  localStorage.setItem(ACCESS_TOKEN, res.data.userTokens.access_token);
  localStorage.setItem(REFRESH_TOKEN, res.data.userTokens.refresh_token);
  window.location.reload(); 
  return res;
};