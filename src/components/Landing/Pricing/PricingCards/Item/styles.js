import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '15px',
  alignItems: 'center',
}));

export const Text = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '16px',
  color: theme.palette.landing.slateGray,
}));
