import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const Desktop = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}));

export const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '40px',
  marginBottom: '40px',
}));

export const SummaryContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '18px',
  alignItems: 'center',
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: '26px',
  fontHeight: '38x',
  fontWeight: 600,
  marginBottom: '20px',
}));

export const Description = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontHeight: '34px',

  [theme.breakpoints.up('lg')]: {
    fontSize: '24px',
  },
}));
