import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
  marginTop: '105px',
  marginBottom: '60px',
  padding: '0 20px',

  [theme.breakpoints.up('md')]: {
    marginTop: '140px',
    marginBottom: '100px',
    padding: '0 35px',
  },

  [theme.breakpoints.up('lg')]: {
    marginTop: '100px',
  },
}));
