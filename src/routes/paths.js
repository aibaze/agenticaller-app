// ----------------------------------------------------------------------
import { paramCase } from 'src/utils/change-case';

// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  ONBOARDING: '/onboarding',
  PROFILE: '/calls',
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
  user:{
    settings: "/user-settings"
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
    phoneNumbers: '/phone-numbers',
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
