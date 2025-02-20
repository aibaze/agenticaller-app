import { axiosInstanceCoachApi } from 'src/utils/axios';

export const bugReport = async (event) => await axiosInstanceCoachApi.post('/bug-report', event);
