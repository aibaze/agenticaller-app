'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import mixpanel from 'mixpanel-browser';
import { initMixpanel } from 'src/utils/mixpanel';

export default function MixpanelProvider({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only initialize Mixpanel on the client side
    if (typeof window !== 'undefined') {
      initMixpanel();
    }
  }, []);

  useEffect(() => {
    // Ensure we're on client side and Mixpanel is properly initialized
    if (typeof window === 'undefined' || !mixpanel.config) {
      return;
    }

    try {
      // Clean the pathname
      const fullPath = searchParams.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname;

      let cleanPath = fullPath;

      if (pathname.startsWith('/info/')) {
        const segments = pathname.split('/').filter(Boolean);

        if (segments[2] === 'services') {
          cleanPath = '/info/[username]/services/[serviceId]';
        } else {
          cleanPath = '/info/[username]';
        }
      }

      mixpanel.track('Page View', {
        url: window.location.href,
        path: cleanPath,
      });
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }, [pathname, searchParams]);

  return children;
}
