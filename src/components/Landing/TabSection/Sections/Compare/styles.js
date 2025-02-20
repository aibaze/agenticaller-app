import { styled } from '@mui/material/styles';
import { Typography, Grid } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
  color: theme.palette.common.black,
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontFamily: 'Degular',
  fontWeight: 700,
  lineHeight: '30px',
  fontSize: '36px',
  marginBottom: '20px',

  [theme.breakpoints.up('md')]: {
    fontSize: '34px',
    marginBottom: '10px',
  },

  [theme.breakpoints.up('xl')]: {
    fontSize: '36px',
    marginBottom: '20px',
  },
}));

export const GridContainer = styled(Grid)(({ theme }) => ({
  gap: 0,
  justifyContent: 'space-between',

  [theme.breakpoints.up('md')]: {
    gap: '60px',
  },
}));

export const GridHideMobile = styled(Grid)(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('lg')]: {
    display: 'inherit',
  },
}));
