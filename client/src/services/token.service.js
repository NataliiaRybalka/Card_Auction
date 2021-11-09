export const tokenService = (tokens, role) => {
  localStorage.setItem('accessToken', tokens.access_token);
  localStorage.setItem('refreshToken', tokens.refresh_token);
  localStorage.setItem('role', role);
};