import { axiosInstanceCoachApi } from 'src/utils/axios';

export const getCoachRequests = async (coachId) =>
  await axiosInstanceCoachApi.get(`/request/coach/${coachId}`);

export const updateRequest = async (requestId, body) =>
  await axiosInstanceCoachApi.put(`/request/update/${requestId}`, body);

export const answerRequest = async (requestId, body) => {
  await axiosInstanceCoachApi.post(`/request/answer/${requestId}`, body);
};

export const sendRequest = async (body) => {
  await axiosInstanceCoachApi.post(`/request`, body);
};

export const deleteRequest = async (requestId) => {
  await axiosInstanceCoachApi.delete(`/request/${requestId}`);
};

export const getRequest = async (requestId) => {
  const response = await axiosInstanceCoachApi.get(`/request/${requestId}`);
  return response.data;
};

export const getRequestsByServiceId = async (serviceId) => {
  const response = await axiosInstanceCoachApi.get(`/request/service/${serviceId}`);
  return response.data;
};

export const confirmSession = async (requestId, body) => {
  await axiosInstanceCoachApi.put(`/request/confirm/${requestId}`, body);
};

export const sendClientRequest = async (requestId, body) => {
  await axiosInstanceCoachApi.post(`/request/client-answer/${requestId}`, body);
};
