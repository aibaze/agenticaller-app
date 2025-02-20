import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  marginTop: '60px',
  flexDirection: 'column',
  justifyItems: 'center',

  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: '70px',
  lineHeight: '60px',
  fontWeight: 700,
  marginBottom: '30px',
  zIndex: 50,
}));

export const Text = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  lineHeight: '24px',
  fontWeight: 500,
  zIndex: 50,
}));
