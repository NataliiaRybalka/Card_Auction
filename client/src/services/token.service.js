import { httpHelper } from "../helpers/http.helper";
import { LOCALHOST } from "../constants/contants";
import { POST } from "../constants/httpMethods";

export const setTokenAndRoleServiceWherRegistration = (id, tokens, role) => {
  localStorage.setItem('id', id);
  localStorage.setItem('accessToken', tokens[0].access_token);
  localStorage.setItem('refreshToken', tokens[0].refresh_token);
  localStorage.setItem('role', role);
};

export const setTokenAndRoleServiceWherLogin = (id, tokens, role) => {
  localStorage.setItem('id', id);
  localStorage.setItem('accessToken', tokens.access_token);
  localStorage.setItem('refreshToken', tokens.refresh_token);
  localStorage.setItem('role', role);
};

export const updateTokens = async () => {
  const { request } = httpHelper();
  const res = await request(`${LOCALHOST}auth/create-tokens`, null, POST, null, {}, localStorage.getItem('refreshToken'));

  localStorage.setItem('accessToken', res.data.userTokens.access_token);
  localStorage.setItem('refreshToken', res.data.userTokens.refresh_token);
  window.location.reload(); 
  return res;
};