import { axiosInstanceCoachApi } from 'src/utils/axios';
import Cookies from 'js-cookie';

export const createCoach = async (coach, token) => {
  const coachResponse = await axiosInstanceCoachApi.post('/coach/create-coach', coach, {
    headers: coach.SSO
      ? {
          x_auth_token_sso: token,
        }
      : {
          x_auth_token: token,
        },
  });
  return coachResponse;
};

export const getOneCoach = async (identifier, token, isLogin, isSSO) => {
  let url = `/coach/${identifier}`;
  if (isLogin) {
    url = `/coach/${identifier}?isLogin=true`;
  }
  const coachResponse = await axiosInstanceCoachApi.get(url, {
    headers: isSSO
      ? {
          x_auth_token_sso: token,
        }
      : {
          x_auth_token: `Bearer ${token}`,
        },
  });

  if (!coachResponse.data.SSO) {
    axiosInstanceCoachApi.defaults.headers.common.x_auth_token = `Bearer ${token}`;
  } else {
    axiosInstanceCoachApi.defaults.headers.common.x_auth_token_sso = token;
  }

  return coachResponse;
};

export const userExists = async (email) => {
  try {
    const response = await axiosInstanceCoachApi.get(`/coach/user-exists/${email}`);
    return response.data;
  } catch (error) {
    return { exists: false };
  }
};

export const checkCoachSSOSession = async () => {
  const response = await axiosInstanceCoachApi.post('/coach/check-sso-auth', {
    x_auth_token_sso: Cookies.get('x_auth_token_sso'),
  });

  return response;
};

export const getOneCoachBySlug = async (slug) => {
  const coachResponse = await axiosInstanceCoachApi.get(`/coach/${slug}/slug`);
  return coachResponse;
};

export const updateCoach = async (coach, identifier, token) => {
  const coachResponse = await axiosInstanceCoachApi.put(`/coach/update-coach/${identifier}`, coach);
  return {
    ...coachResponse,
    data: {
      ...coachResponse.data,
      token,
    },
  };
};

export const createCoachService = async (coachId, service, token) => {
  const response = await axiosInstanceCoachApi(`/service/create-service/coach/${coachId}`, {
    method: 'POST',
    data: service,
    withCredentials: true,
  });
  return response;
};

export const updateService = async (serviceId, service, token) => {
  const response = await axiosInstanceCoachApi.put(`/service/${serviceId}`, service);
  return response;
};

export const getServicesById = async (serviceId, token) => {
  const response = await axiosInstanceCoachApi.get(`/service/${serviceId}`);
  return response;
};

export const getServicesByCoach = async (coachId, token) => {
  const response = await axiosInstanceCoachApi.get(`/service/coach/${coachId}`);
  return response;
};

export const deleteCoachService = async (coachId, serviceId, token) => {
  const response = await axiosInstanceCoachApi.delete(`/service/${serviceId}/coach/${coachId}`);
  return response;
};

export const getCoachStats = async (coachId) => {
  const response = await axiosInstanceCoachApi.get(`/coach/stats/${coachId}`);
  return response;
};

export const getContactMessages = async (coachId) => {
  const response = await axiosInstanceCoachApi.get(`/request/coach/${coachId}`);
  return response;
};
