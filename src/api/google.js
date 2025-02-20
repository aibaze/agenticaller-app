import { axiosInstanceCoachApi } from 'src/utils/axios';

export const checkIfIsAuthorized = async (coachId, token) => {
  const response = await axiosInstanceCoachApi.get(`/event/google/authorized/${coachId}`);
  return response;
};

export const googleAuth = async (body) => {
  const response = await axiosInstanceCoachApi.post(`/event/google/auth`, body);
  return response;
};
