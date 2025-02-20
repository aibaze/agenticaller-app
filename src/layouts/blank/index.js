import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import Header from '../common/header-simple';

// ----------------------------------------------------------------------

export default function CompactLayout({ children }) {
  return (
    <>
      <Header />

      <Container component="main">
        <Stack
          sx={{
            minHeight: '100vh',
            mt: 10,
          }}
        >
          {children}
        </Stack>
      </Container>
    </>
  );
}

CompactLayout.propTypes = {
  children: PropTypes.node,
};
