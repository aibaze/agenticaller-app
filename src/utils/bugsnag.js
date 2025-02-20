import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import { BUGSNAG_API_KEY } from 'src/config-global';

export const initBugsnag = () => {
  if (typeof window === 'undefined') return null;

  if (!Bugsnag.isStarted()) {
    Bugsnag.start({
      apiKey: BUGSNAG_API_KEY,
      plugins: [new BugsnagPluginReact()],
      // Configuration options
      releaseStage: window.location.href.includes("'https://app.allwyse.io")
        ? 'production'
        : 'staging',
      enabledReleaseStages: ['production', 'staging'],
      // Automatically track unhandled promise rejections
      onUnhandledRejection: true,
      // Add user and request context
      metadata: {
        // Add any default metadata you want
      },
    });
  }

  return Bugsnag;
};

// Helper for handled exceptions
export const notifyError = (error, metadata = {}) => {
  if (typeof window !== 'undefined') {
    Bugsnag.notify(error, (event) => {
      event.addMetadata('custom', metadata);
    });
  }
};

export const identifyBugsnagUser = (user) => {
  if (typeof window !== 'undefined' && user) {
    Bugsnag.setUser(user._id, user.email, `${user.firstName} ${user.lastName}`);
  }
};
