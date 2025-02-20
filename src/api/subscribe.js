import { axiosInstanceCoachApi } from 'src/utils/axios';

export const subscribeUser = async (event) => await axiosInstanceCoachApi.post('/lead', event);
