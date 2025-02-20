import { trackMixPanelEvent, MIXPANEL_ACTION } from './mixpanel';

export const getUserEmailParam = (emailParam) => {
  if (!emailParam) return null;
  let emailFromUrl = emailParam;
  if (emailFromUrl.includes(' ')) {
    emailFromUrl = emailFromUrl.replace(/\s/g, '+');
  }
  return emailFromUrl || '';
};

export const handlePublicViewClick = (currentCoachSlug, endpoint, resource) => {
  trackMixPanelEvent(MIXPANEL_ACTION.USER_CLICKED, {
    widget_name: 'see_public_view',
    resource,
  });
  window.open(
    `${window.location.protocol}//${window.location.host}/info/${currentCoachSlug}${endpoint}`
  );
};
