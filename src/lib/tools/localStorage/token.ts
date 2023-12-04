const accessTokenKey = "access-token";
const refreshTokenKey = "refresh-token";

export const getAccessToken = () => localStorage.getItem(accessTokenKey);
export const setAccessToken = (token: string) =>
  localStorage.setItem(accessTokenKey, token);
export const getRefreshToken = () => localStorage.getItem(refreshTokenKey);
export const setRefreshToken = (token: string) =>
  localStorage.setItem(refreshTokenKey, token);
export const clearLocalStorage = () => {
  localStorage.removeItem(accessTokenKey);
  localStorage.removeItem(refreshTokenKey);
  localStorage.removeItem("email");
  localStorage.removeItem("notificationData");
  localStorage.removeItem("prevPath");
  localStorage.removeItem("ally-supports-cache");
};
