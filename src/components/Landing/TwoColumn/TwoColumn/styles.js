import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

export const GridTextButton = styled(Grid)(({ theme }) => ({
  display: 'none',
  marginBottom: '40px',

  [theme.breakpoints.up('lg')]: {
    display: 'inherit',
  },
}));

export const GridContainerButton = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '30px',
  marginBottom: '40px',

  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
}));

export const GridImage = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const GridContainer = styled(Grid)(({ theme }) => ({
  padding: '70px 25px 40px 25px',

  [theme.breakpoints.up('sm')]: {
    padding: '40px 28px',
  },

  [theme.breakpoints.up('md')]: {
    padding: '60px 90px',
  },
}));
