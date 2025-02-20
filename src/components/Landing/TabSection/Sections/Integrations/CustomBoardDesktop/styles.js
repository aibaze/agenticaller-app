import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
  display: 'none',
  gap: '25px',
  marginTop: '57px',

  [theme.breakpoints.up('md')]: {
    display: 'flex',
    gap: '40px',
  },

  [theme.breakpoints.up('lg')]: {
    gap: '57px',
  },
}));
