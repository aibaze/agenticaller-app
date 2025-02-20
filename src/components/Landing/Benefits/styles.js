import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
  position: 'relative',
  marginTop: '50px',

  [theme.breakpoints.up('md')]: {
    marginTop: '80px',
  },
}));

export const GridContainer = styled('div')(({ theme }) => ({
  margin: '20px',
  padding: '0px 20px',
  position: 'relative',

  [theme.breakpoints.up('lg')]: {
    margin: '50px',
  },

  [theme.breakpoints.up('xl')]: {
    margin: '60px 160px',
  },
}));

export const Column = styled('div')(({ theme }) => ({
  marginRight: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',

  [theme.breakpoints.up('lg')]: {
    marginRight: '28px',
  },
}));
