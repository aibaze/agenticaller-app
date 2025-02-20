'use client';

import PropTypes from 'prop-types';

import { GuestGuard } from 'src/auth/guard';
import BlankLayout from 'src/layouts/blank';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return <GuestGuard>{children}</GuestGuard>;
}

Layout.propTypes = {
  children: PropTypes.node,
};
