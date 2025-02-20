import { memo } from 'react';

import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

function VerifyMailIlustration({ ...other }) {

  return (
    <Box component="img" src="/assets/illustrations/verify-email.png" />
  );
}

export default memo(VerifyMailIlustration);
