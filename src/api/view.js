import { axiosInstanceCoachApi } from 'src/utils/axios';

export const sendRenderView = async (entity, entityId, body) =>
  await axiosInstanceCoachApi.put(`/${entity}/views/${entityId}`, body);
