// ----------------------------------------------------------------------
import { paramCase } from 'src/utils/change-case';
import { _id, _postTitles } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_TITLE = _postTitles[2];
const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  ONBOARDING: '/onboarding',
  PROFILE: '/profile',
  PRODUCT: '/product',
  SERVICE: '/services',
  INFO: '/info',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/login`,
      register: `${ROOTS.AUTH}/register`,
      verify: `${ROOTS.AUTH}/verify`,
    },
  },
  home: {
    root: '/home',
    product: '/product',
  },
  onboarding: {
    root: ROOTS.ONBOARDING,
    coach: `${ROOTS.ONBOARDING}/coach`,
  },
  profile: {
    root: ROOTS.PROFILE,
    settings: `${ROOTS.PROFILE}/?config=true`,
    calendar: `${ROOTS.PROFILE}/?tab=calendar`,
    services: `${ROOTS.PROFILE}/?tab=services`,
    blog: `${ROOTS.PROFILE}/?tab=blog`,
    fileManager: '/file-manager',
    invoicing: '/invoicing',
    overview: '/overview',
    requests: '/requests',
    messages: '/messages',
    kanban: '/kanban',
    clients: '/clients',
  },
  post: {
    root: `/post`,
    details: (title) => `/post/${paramCase(title)}`,
    demo: {
      details: `/post/${paramCase(MOCK_TITLE)}`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    one: `${ROOTS.DASHBOARD}/one`,
    two: `${ROOTS.DASHBOARD}/two`,
    three: `${ROOTS.DASHBOARD}/three`,
    group: {
      root: `${ROOTS.DASHBOARD}/group`,
      five: `${ROOTS.DASHBOARD}/group/five`,
      six: `${ROOTS.DASHBOARD}/group/six`,
    },
  },
  product: {
    root: ROOTS.PRODUCT,
  },
  service: {
    root: ROOTS.SERVICE,
  },
  info: {
    root: ROOTS.INFO,
  },
};
