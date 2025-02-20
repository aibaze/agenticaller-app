import { memo } from 'react';

import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

function MessageSent({ ...other }) {
  return (
    <Box
      component="svg"
      width="100%"
      height="100%"
      viewBox="0 0 480 360"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >

      <image href="/assets/illustrations/characters/characterMessage.png"  />

    </Box>
  );
}

export default memo(MessageSent);
