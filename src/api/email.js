import { axiosInstanceCoachApi } from 'src/utils/axios';

export const sendEmail = async (payload) =>
  await axiosInstanceCoachApi.post('/util/send-email', payload);
