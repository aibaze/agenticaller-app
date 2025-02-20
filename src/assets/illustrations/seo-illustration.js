import { memo } from 'react';
import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

function SeoIllustration({ maxWidth, ...other }) {
  return (
    <Box
      component="img"
      src="https://i.ibb.co/vwxQFqX/dashboard.png"
      sx={{
        width: '100%',
        maxWidth: maxWidth || 250,
        height: 'auto',
      }}
      {...other}
    />
  );
}

export default memo(SeoIllustration);
