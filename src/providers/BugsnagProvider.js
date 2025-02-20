'use client';

import { useEffect } from 'react';
import { initBugsnag } from 'src/utils/bugsnag';

export default function BugsnagProvider({ children }) {
  useEffect(() => {
    initBugsnag();
  }, []);

  // If Bugsnag hasn't started yet, render children without error boundary
  if (typeof window === 'undefined') {
    return <>{children}</>;
  }

  const ErrorBoundary = initBugsnag()?.getPlugin('react')?.createErrorBoundary();

  return ErrorBoundary ? <ErrorBoundary>{children}</ErrorBoundary> : children;
}
