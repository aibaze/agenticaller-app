import mixpanel from 'mixpanel-browser';
import { MIXPANEL_API_KEY } from 'src/config-global';

// Near entry of your product, init Mixpanel

export const initMixpanel = () => {
  if (typeof window === 'undefined') {
    return;
  }
  mixpanel.init(MIXPANEL_API_KEY, {
    debug: true,
    track_pageview: true,
    persistence: 'localStorage',
  });
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
  mixpanel.track(action, event);
};

export const identifyMixpanelUser = (coach) => {
  if (typeof window !== 'undefined') {
    if (window.location.href.includes('localhost')) {
      return;
    }

    mixpanel.identify(coach._id);
    mixpanel.people.set({
      $email: coach.email,
      $name: `${coach.firstName} ${coach.lastName}`,
      last_login: new Date().toISOString(),
    });
  }
};
