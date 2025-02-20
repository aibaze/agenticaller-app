import { axiosInstanceCoachApi } from 'src/utils/axios';

export const getVapiCalls = async () =>
  await axiosInstanceCoachApi.get(`/util/vapi/calls`);

export const getVapiAssistants = async () =>
    await axiosInstanceCoachApi.get(`/util/vapi/assistants`);
  