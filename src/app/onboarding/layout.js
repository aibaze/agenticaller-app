'use client';

import PropTypes from 'prop-types';

import { AuthGuard } from 'src/auth/guard';
import BlankLayout from 'src/layouts/blank';
// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <AuthGuard>
     {children}
    </AuthGuard>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
