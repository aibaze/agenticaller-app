'use client';

import PropTypes from 'prop-types';

import { PublicGuard } from 'src/auth/guard';
import BlankLayout from 'src/layouts/blank';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <PublicGuard fetchByUrl>
      <BlankLayout>{children}</BlankLayout>
    </PublicGuard>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
