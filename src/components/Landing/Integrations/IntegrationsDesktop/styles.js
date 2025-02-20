import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
  display: 'none',
  gap: '60px',
  flexWrap: 'wrap',
  justifyContent: 'center',

  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));
