'use client';

import PropTypes from 'prop-types';
import { useMemo, /*  useEffect, */ useReducer, useCallback } from 'react';

import Cookies from 'js-cookie';
import { logoutFromCognito } from 'src/auth/cognito/helpers';

import { AuthContext } from './auth-context';
import { setSession /*  isValidToken  */ } from './utils';
import { identifyMixpanelUser } from 'src/utils/mixpanel';
import { identifyBugsnagUser } from 'src/utils/bugsnag';
// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
  currentCoach: null,
  user: null,
  authenticated: false,
  publicLoading: 'loading',
};

const reducer = (state, action) => {
  if (action.type === 'LOGIN') {
    return {
      ...state,
      currentCoach: action.payload,
      user: null,
      authenticated: true,
    };
  }
  if (action.type === 'UPDATE_USER') {
    return {
      ...state,
      currentCoach: action.payload,
      user: null,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      publicLoading: action.payload,
      isPublicUser: true,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      authenticated: false,
    };
  }

  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // LOGIN
  const login = useCallback((coach) => {
    setTimeout(() => {
      identifyMixpanelUser(coach);
      identifyBugsnagUser(coach);
    }, 4000);

    dispatch({
      type: 'LOGIN',
      payload: coach,
    });
  }, []);

  const updateUser = useCallback((coach) => {
    dispatch({
      type: 'UPDATE_USER',
      payload: coach,
    });
  }, []);

  const setLoading = useCallback((boolean) => {
    dispatch({
      type: 'SET_LOADING',
      payload: boolean,
    });
  }, []);

  // REGISTER
  const register = useCallback(async (email, password) => {
    const data = {
      email,
      password,
    };

    dispatch({
      type: 'REGISTER',
      payload: data,
    });
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    await logoutFromCognito();
    Cookies.remove('x_auth_token_sso');
    Cookies.remove('x_auth_token');
    dispatch({
      type: 'LOGOUT',
    });
    window.href = '/auth/login';
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated =
    state.currentCoach && !state.isPublicUser ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;
  const memoizedValue = useMemo(
    () => ({
      ...state,
      loading: status === 'loading',
      publicLoading: state.publicLoading === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      register,
      logout,
      updateUser,
      setLoading,
    }),
    [login, logout, register, status, updateUser, setLoading, state, state.loading]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
