import { axiosInstanceCoachApi } from 'src/utils/axios';

export const getVapiCalls = async () =>
  await axiosInstanceCoachApi.get(`/v1/vapi/calls`);

export const getVapiAssistants = async () =>
    await axiosInstanceCoachApi.get(`/v1/vapi/assistants`);

export async function getVapiPhoneNumbers() {
  try {
    const response = await axiosInstanceCoachApi.get('/v1/vapi/phone-numbers');
    return response;
  } catch (error) {
    console.error('Error fetching phone numbers:', error);
    throw error;
  }
}
  