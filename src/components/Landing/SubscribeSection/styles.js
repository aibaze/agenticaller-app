import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
  margin: '50px 20px',

  [theme.breakpoints.up('md')]: {
    margin: '10px 90px 80px',
  },
}));
