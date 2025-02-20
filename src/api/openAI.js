import { axiosInstanceCoachApi } from 'src/utils/axios';

export const executePrompt = async (payload) =>
  await axiosInstanceCoachApi.post('/util/execute-prompt', payload);
