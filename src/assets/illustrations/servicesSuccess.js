import { memo } from 'react';

import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

function ServiceSuccess({ ...other }) {
  return (
    <Box
      component="svg"
      width="100%"
      height="100%"
      viewBox="0 0 480 360"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      {...other}
    >
      <image
        href="/assets/illustrations/characters/serviceSuccess.png"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
      />
    </Box>
  );
}

export default memo(ServiceSuccess);