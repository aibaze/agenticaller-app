import { axiosInstanceCoachApi } from 'src/utils/axios';
import { COACH_API } from 'src/config-global';

const endpoint = '/internal-stat';

export const internalStat = async (event) => await axiosInstanceCoachApi.post(endpoint, event);

export const internalStatServer = async (event) =>
  await fetch(`${COACH_API}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
    cache: 'no-store',
  });
