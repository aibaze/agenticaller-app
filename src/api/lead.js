import { axiosInstanceCoachApi } from 'src/utils/axios';

export const createLead = async (event) => await axiosInstanceCoachApi.post('/lead', event);
export const createSuggestion = async (event) =>
  await axiosInstanceCoachApi.post('/suggestion', event);
