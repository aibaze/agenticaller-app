import axios from 'axios';

import { HOST_API, COACH_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

export const axiosInstanceCoachApi = axios.create({
  baseURL: `${COACH_API}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
});
axiosInstanceCoachApi.defaults.withCredentials = true;

axiosInstanceCoachApi.interceptors.response.use(
  (res) => res,
  (error) => {
    const shouldLogOut =
      error.response?.status === 401 && error.response?.data?.message === 'Invalid token';
    if (shouldLogOut && !window?.location.pathname.includes('/info/')) {
      window.location.reload();
    }
    return Promise.reject(error.response?.data || 'Something went wrong');
  }
);

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstanceCoachApi.get(url, { ...config });

  return res.data;
};

export const standardfetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    login: '/api/auth/login',
    register: '/api/auth/register',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
};
