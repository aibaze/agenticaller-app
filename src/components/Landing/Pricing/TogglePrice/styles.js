import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: theme.palette.landing.pearlGray,
  width: '264px',
  borderRadius: '25px',
  margin: '0 auto',
  marginBottom: '40px',

  [theme.breakpoints.up('lg')]: {
    marginBottom: '98px',
  },
}));
