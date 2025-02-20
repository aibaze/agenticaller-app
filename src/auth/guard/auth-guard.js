import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { getOneCoach, checkCoachSSOSession } from 'src/api/coach';
import { getOneUser,checkUserSSOSession } from 'src/api/agenticaller/user';
import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from '../hooks';
import { getSession } from '../cognito/helpers';
import Cookies from 'js-cookie';

// ----------------------------------------------------------------------

const loginPaths = {
  jwt: paths.auth.jwt.login,
  home: paths.home.root,
};

// ----------------------------------------------------------------------

export default function AuthGuard({ children }) {
  const { loading } = useAuthContext();

  return <>{loading ? <SplashScreen /> : <Container> {children}</Container>}</>;
}

AuthGuard.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

function Container({ children }) {
  const router = useRouter();

  const { authenticated, login } = useAuthContext();
  const [checked, setChecked] = useState(false);

  console.log('authenticated', authenticated);

  const check = useCallback(async () => {
    if (!authenticated) {
      try {
        // Just call the endpoint - the httpOnly cookie will be sent automatically
        const response = await checkUserSSOSession();
        const isAuthenticatedInGoogle = response.data;
        console.log('isAuthenticatedInGoogle', isAuthenticatedInGoogle);
        console.log('response', response);
        if (isAuthenticatedInGoogle) {
          const { data: user } = await getOneUser(
            response.data.data.email,
            null, // Remove cookie parameter since it's sent automatically
            false,
            true
          );
          console.log('user', user);
          login({ ...user });
          return setChecked(true);
        }
      } catch (error) {
        console.log('Session check failed:', error);
        router.push(paths.auth.jwt.login);
      }
    } else {
      setChecked(true);
    }
    return () => {};
  }, [authenticated, router, login]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}

Container.propTypes = {
  children: PropTypes.node,
};
