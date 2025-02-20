import PropTypes from 'prop-types';
import { useEffect, useCallback, useState } from 'react';
import { getOneCoachBySlug } from 'src/api/coach';
import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams, useParams } from 'src/routes/hooks';

import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

export default function PublicGuard({ children, fetchByUrl }) {
  const { publicLoading, setLoading, updateUser } = useAuthContext();
  const params = useParams();
  const getCoach = async () => {
    setLoading('loading');
    const { data } = await getOneCoachBySlug(params.id);
    updateUser(data);
    setLoading(false);
  };
  useEffect(() => {
    if (fetchByUrl) {
      getCoach();
    }
  }, []);

  return <>{publicLoading ? <SplashScreen /> : <Container> {children}</Container>}</>;
}

PublicGuard.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

function Container({ children }) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || paths.profile.root;
  const { authenticated } = useAuthContext();
  const check = useCallback(() => {
    const isLogin =
      window.location.pathname === '/auth/login/' || window.location.pathname === '/auth/login';
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
