import mixpanel from 'mixpanel-browser';
import { MIXPANEL_API_KEY } from 'src/config-global';

// Near entry of your product, init Mixpanel
export const initMixpanel = () => {
  // Guard against server-side execution
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    // Check if Mixpanel is already initialized
    if (mixpanel.config) {
      return mixpanel;
    }

    mixpanel.init(MIXPANEL_API_KEY, {
      debug: process.env.NODE_ENV === 'development',
      track_pageview: true,
      persistence: 'localStorage',
      ignore_dnt: true, // Ensures tracking works regardless of Do Not Track settings
      api_host: 'https://api-js.mixpanel.com', // Explicitly set API host
      batch_requests: true, // Enable request batching for better performance
      loaded: (mixpanel) => {
          console.log('Mixpanel initialized successfully');
      },
    });

    return mixpanel;
  } catch (error) {
    console.error('Failed to initialize Mixpanel:', error);
    return null;
  }
};

export const MIXPANEL_ACTION = {
  USER_CLICKED: 'user_clicked',
  USER_SHARED: 'user_shared',
};

export const trackMixPanelEvent = (action = MIXPANEL_ACTION.USER_CLICKED, event) => {
  if (typeof window === 'undefined') {
    return;
  }
  if (window.location.href.includes('localhost')) {
    return;
  }
  try {
    mixpanel.track(action, event);
  } catch (error) {
    console.error('Failed to track Mixpanel event:', error);
  }
};

export const identifyMixpanelUser = (coach) => {
  if (typeof window === 'undefined' || window.location.href.includes('localhost')) {
    return;
  }

  try {
    if (coach && coach._id) {
      mixpanel.identify(coach._id);
      mixpanel.people.set({
        $email: coach.email,
        $name: `${coach.firstName} ${coach.lastName}`,
        last_login: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error('Failed to identify Mixpanel user:', error);
  }
};
