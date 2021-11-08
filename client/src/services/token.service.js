export const tokenService = (tokens) => {
  localStorage.setItem('accessToken', tokens.access_token);
  localStorage.setItem('refreshToken', tokens.refresh_token);
};