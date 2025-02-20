import { paths } from 'src/routes/paths';

// API
// ----------------------------------------------------------------------
export const HOST_API = process.env.NEXT_PUBLIC_HOST_API;
export const COACH_API = process.env.NEXT_PUBLIC_COACH_API;
export const IMAGE_API_KEY = process.env.NEXT_PUBLIC_IMG_HOST_API_KEY;
export const ASSETS_API = process.env.NEXT_PUBLIC_ASSETS_API;
export const IMAGE_API_URL = process.env.NEXT_PUBLIC_IMG_HOST_API_URL;
export const BUGSNAG_API_KEY = process.env.NEXT_PUBLIC_BUGSNAG_API_KEY;
export const MIXPANEL_API_KEY = process.env.NEXT_PUBLIC_MIXPANEL_API_KEY;

export const FIREBASE_API = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const AMPLIFY_API = {
  userPoolId: process.env.NEXT_PUBLIC_AWS_AMPLIFY_USER_POOL_ID,
  userPoolWebClientId: process.env.NEXT_PUBLIC_AWS_AMPLIFY_USER_POOL_WEB_CLIENT_ID,
  region: process.env.NEXT_PUBLIC_AWS_AMPLIFY_REGION,
};

export const AUTH0_API = {
  clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
  callbackUrl: process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL,
};

export const MAPBOX_API = process.env.NEXT_PUBLIC_MAPBOX_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_SIGNUP = paths.auth.jwt.verify;
export const PATH_AFTER_SSO_SIGNUP = paths.onboarding.root;
export const PATH_AFTER_VERIFY = paths.onboarding.root;
export const PATH_AFTER_SIGNIN = paths.profile.root;
