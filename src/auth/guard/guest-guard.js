import PropTypes from 'prop-types';
import { useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from '../hooks';
import { getSession } from '../cognito/helpers';
import { getOneCoach } from 'src/api/coach';

// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
  const { loading } = useAuthContext();

  return <>{loading ? <SplashScreen /> : <Container> {children}</Container>}</>;
}

GuestGuard.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

function Container({ children }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo') || paths.profile.root;
  const { authenticated, login } = useAuthContext();
  const check = useCallback(async () => {
    const isLogin =
      window.location.pathname === '/auth/login/' || window.location.pathname === '/auth/login';

    // get session, if theres a user, log in
    let user = null;
    try {
      user = await getSession();
    } catch (error) {
      user = null;
    }
    if (user) {
      const { data: coach } = await getOneCoach(user.idToken.payload.email, user.idToken.jwtToken);
      login({ ...coach });
    }

    if (authenticated && isLogin) {
      router.replace(returnTo);
    }
  }, [authenticated, returnTo, router]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}

Container.propTypes = {
  children: PropTypes.node,
};
