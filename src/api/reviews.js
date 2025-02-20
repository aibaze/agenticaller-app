import { axiosInstanceCoachApi } from 'src/utils/axios';

export const sendReview = async (entity, entityId, body) =>
  await axiosInstanceCoachApi.put(`/${entity}/reviews/${entityId}`, body);
