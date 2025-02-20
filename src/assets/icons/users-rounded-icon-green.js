import { memo } from 'react';

import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

function UsersRoundedIcon({ sx, ...other }) {

  return (
    <Box {...other} sx={sx}>
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="72" viewBox="0 0 64 72" fill="none">
        <g id="icons/duotone/ic-user-group">
          <g id="secondary-shape" opacity="0.32">
            <path d="M33.5586 23.3465C34.2696 21.7436 34.6694 19.9364 34.6694 18.0245C34.6694 16.1126 34.2696 14.3054 33.5586 12.7025C35.0154 10.4879 37.3582 9.05151 40.0002 9.05151C44.4185 9.05151 48.0002 13.0689 48.0002 18.0245C48.0002 22.9801 44.4185 26.9975 40.0002 26.9975C37.3582 26.9975 35.0154 25.561 33.5586 23.3465Z" fill="url(#paint0_linear_1241_17923)" />
            <path d="M37.4928 59.1977C39.0837 59.6489 40.832 59.8984 42.6668 59.8984C50.0306 59.8984 56.0002 55.881 56.0002 50.9254C56.0002 45.9698 50.0306 41.9524 42.6668 41.9524C40.8296 41.9524 39.0791 42.2025 37.4865 42.6548C40.697 44.8036 42.6694 47.7184 42.6694 50.9284C42.6694 54.1363 40.6995 57.0494 37.4928 59.1977Z" fill="url(#paint1_linear_1241_17923)" />
          </g>
          <g id="primary-shape">
            <path d="M24.0026 29.9885C29.8936 29.9885 34.6693 24.632 34.6693 18.0245C34.6693 11.417 29.8936 6.06055 24.0026 6.06055C18.1116 6.06055 13.3359 11.417 13.3359 18.0245C13.3359 24.632 18.1116 29.9885 24.0026 29.9885Z" fill="url(#paint2_linear_1241_17923)" />
            <path d="M24.0026 62.8924C34.3119 62.8924 42.6693 57.5359 42.6693 50.9284C42.6693 44.3209 34.3119 38.9644 24.0026 38.9644C13.6933 38.9644 5.33594 44.3209 5.33594 50.9284C5.33594 57.5359 13.6933 62.8924 24.0026 62.8924Z" fill="url(#paint3_linear_1241_17923)" />
          </g>
        </g>
        <defs>
          <linearGradient id="paint0_linear_1241_17923" x1="33.5586" y1="9.05151" x2="71.1242" y2="25.6313" gradientUnits="userSpaceOnUse">
            <stop stop-color="#5BE49B" />
            <stop offset="1" stop-color="#00A76F" />
          </linearGradient>
          <linearGradient id="paint1_linear_1241_17923" x1="33.5586" y1="9.05151" x2="71.1242" y2="25.6313" gradientUnits="userSpaceOnUse">
            <stop stop-color="#5BE49B" />
            <stop offset="1" stop-color="#00A76F" />
          </linearGradient>
          <linearGradient id="paint2_linear_1241_17923" x1="5.33594" y1="6.06055" x2="57.4946" y2="40.324" gradientUnits="userSpaceOnUse">
            <stop stop-color="#5BE49B" />
            <stop offset="1" stop-color="#00A76F" />
          </linearGradient>
          <linearGradient id="paint3_linear_1241_17923" x1="5.33594" y1="6.06055" x2="57.4946" y2="40.324" gradientUnits="userSpaceOnUse">
            <stop stop-color="#5BE49B" />
            <stop offset="1" stop-color="#00A76F" />
          </linearGradient>
        </defs>
      </svg>

    </Box>
  );
}

export default memo(UsersRoundedIcon);
