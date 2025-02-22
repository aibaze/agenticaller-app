import { axiosInstanceCoachApi } from 'src/utils/axios';

export const loginUser = async (user, ) => {
  const userResponse = await axiosInstanceCoachApi.post('/auth/google/login', user);
  return userResponse;
};

export const checkUserSSOSession = async () => {
  const response = await axiosInstanceCoachApi.post('/auth/check-sso-token');

  return response;
};

export const getOneUser = async (identifier, token) => {
  const url = `/users/${identifier}`;
  const userResponse = await axiosInstanceCoachApi.get(url);
  axiosInstanceCoachApi.defaults.headers.common.x_auth_token_sso = token;
  return userResponse;
};

export const updateUser = async (userId, userData) => {
  const url = `/users/${userId}`;
  const response = await axiosInstanceCoachApi.put(url, userData);
  return response;
};