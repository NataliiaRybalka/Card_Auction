import { GET } from "../constants/httpMethods";

export const httpHelper = () => {
  const request = async (url = '', method = GET, body = null, headers = {}) => {
    if (body) {
      body = JSON.stringify(body);
      headers['Content-Type'] = 'application/json';
    }

    const res = await fetch(url, {method, body, headers});
    const data = await res.json();

    return data;
  }

  return { request };
};
