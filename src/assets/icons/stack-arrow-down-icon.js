import { memo } from 'react';

import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

function StackArrowDownIcon({ sx, ...other }) {

  return (
    <Box {...other} sx={sx}>
      <svg width="64" height="56" viewBox="0 0 64 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="stack">
          <path id="Message" d="M38.8945 12.2656C36.8011 11.054 34.3108 10.7335 31.9788 11.3583L14.7993 15.9616C9.92839 17.2667 7.05307 22.2495 8.35311 27.1013L12.0342 40.8393C13.3342 45.6911 18.3331 48.564 23.1866 47.2635L40.3662 42.6602C45.2197 41.3597 48.1141 36.3719 46.8141 31.5201L43.133 17.782C42.5086 15.4518 40.9888 13.4733 38.8945 12.2656Z" fill="url(#paint0_linear_1232_13633)" />
          <path id="Message_2" opacity="0.32" d="M38.8945 12.2656C36.8011 11.054 34.3108 10.7335 31.9788 11.3583L14.7993 15.9616C9.92839 17.2667 7.05307 22.2495 8.35311 27.1013L12.0342 40.8393C13.3342 45.6911 18.3331 48.564 23.1866 47.2635L40.3662 42.6602C45.2197 41.3597 48.1141 36.3719 46.8141 31.5201L43.133 17.782C42.5086 15.4518 40.9888 13.4733 38.8945 12.2656Z" fill="url(#paint1_linear_1232_13633)" />
          <g id="Message_3" filter="url(#filter0_f_1232_13633)">
            <path d="M34.1361 16.7838C32.8153 15.974 31.2532 15.744 29.7979 16.1339L19.0768 19.0066C16.037 19.8211 14.2769 23.0584 15.1304 26.244L17.5473 35.2639C18.4009 38.4494 21.5547 40.37 24.5836 39.5584L35.3047 36.6857C38.3336 35.8741 40.1057 32.6336 39.2522 29.4481L36.8353 20.4282C36.4253 18.8982 35.4575 17.5911 34.1361 16.7838Z" fill="#FFAC82" />
          </g>
          <g id="Path" filter="url(#filter1_b_1232_13633)">
            <path d="M55.0238 21.3261C53.1168 19.4151 50.5246 18.3501 47.8299 18.3501H27.9784C22.3499 18.3501 17.8105 22.8915 17.8105 28.4979V44.3727C17.8105 49.9791 22.37 54.5204 27.9784 54.5204H47.8299C53.4383 54.5204 57.9998 49.9791 57.9998 44.3727V28.4979C57.9998 25.8052 56.9328 23.2331 55.0238 21.3261Z" fill="#FF5630" fillOpacity="0.24" />
          </g>
          <g id="Path_2" filter="url(#filter2_bd_1232_13633)">
            <path d="M51.1879 31.3313L51.0271 31.492L41.9624 38.7462C40.8391 39.6304 39.4506 40.1126 38.0259 40.1126C36.5971 40.1126 35.2327 39.6304 34.1074 38.7462L24.9643 31.6126L24.7011 31.3514C24.2409 30.7485 24.3012 29.8845 24.8438 29.3419C25.3642 28.7994 26.2283 28.7391 26.8532 29.2012L35.8958 36.4353C37.0794 37.4019 38.7493 37.4019 39.9148 36.4353L48.9754 29.2012C49.2789 28.9199 49.6808 28.7772 50.1027 28.7994C50.5026 28.8395 50.8864 29.0224 51.1657 29.3218C51.6681 29.9046 51.6681 30.7485 51.1879 31.3313Z" fill="url(#paint2_linear_1232_13633)" />
          </g>
        </g>
        <defs>
          <filter id="filter0_f_1232_13633" x="-1.08496" y="-0.0512695" width="56.5518" height="55.7957" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="8" result="effect1_foregroundBlur_1232_13633" />
          </filter>
          <filter id="filter1_b_1232_13633" x="2.81055" y="3.3501" width="70.1895" height="66.1704" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="7.5" />
            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1232_13633" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_1232_13633" result="shape" />
          </filter>
          <filter id="filter2_bd_1232_13633" x="9.39258" y="13.7971" width="57.1528" height="41.3154" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="7.5" />
            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1232_13633" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dx="5" dy="5" />
            <feGaussianBlur stdDeviation="5" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.337255 0 0 0 0 0.188235 0 0 0 0.5 0" />
            <feBlend mode="normal" in2="effect1_backgroundBlur_1232_13633" result="effect2_dropShadow_1232_13633" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1232_13633" result="shape" />
          </filter>
          <linearGradient id="paint0_linear_1232_13633" x1="6" y1="18.3193" x2="46.3967" y2="44.5661" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FFAC82" />
            <stop offset="1" stop-color="#FF5630" />
          </linearGradient>
          <linearGradient id="paint1_linear_1232_13633" x1="6" y1="18.3193" x2="46.3967" y2="44.5661" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FF5630" />
            <stop offset="1" stop-color="#B71D18" />
          </linearGradient>
          <linearGradient id="paint2_linear_1232_13633" x1="49.6202" y1="30.8405" x2="19.5267" y2="33.1949" gradientUnits="userSpaceOnUse">
            <stop stop-color="white" />
            <stop offset="1" stop-color="white" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

    </Box>
  );
}

export default memo(StackArrowDownIcon);
