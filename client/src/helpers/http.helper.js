import { GET } from "../constants/httpMethods";

export const httpHelper = () => {
  const request = async (url = '', accessToken = null, method = GET, body = null, headers = {}, refreshToken = null) => {
    if (body) {
      body = JSON.stringify(body);
      headers['Content-Type'] = 'application/json';
    }
    
    if (accessToken) {
      headers['Authorization'] = accessToken;
    }
    if (refreshToken) {
      headers['refresh_token'] = refreshToken;
    }

    const res = await fetch(url, {method, body, headers});
    const data = await res.json();
    
    return {
      data,
      status: res.status,
      statusText: res.statusText
    };
  }

  return { request };
};
