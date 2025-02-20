'use client';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider as MUILocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function LocalizationProvider({ children }) {
  return <MUILocalizationProvider dateAdapter={AdapterDayjs}>{children}</MUILocalizationProvider>;
}
