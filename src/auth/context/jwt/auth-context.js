'use client';

import { createContext } from 'react';

// ----------------------------------------------------------------------

export const AuthContext = createContext({
  currentCoach: {},
  authenticated: false,
});
