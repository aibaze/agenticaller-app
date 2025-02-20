import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  marginBottom: 2,
}));

export const Label = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 600,
  fontFamily: 'Degular',
  color: theme.palette.common.black,
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: 50,
  fontWeight: 600,
  lineHeight: 1,
  margin: '20px 0 40px',
  letterSpacing: '-4px',
  color: theme.palette.common.black,

  [theme.breakpoints.up('sm')]: {
    fontSize: 65,
    lineHeight: 0.9,
  },

  [theme.breakpoints.up('md')]: {
    fontSize: 70,
  },

  [theme.breakpoints.up('xl')]: {
    fontSize: 90,
  },
}));

export const BlackLineDivider = styled('div')(({ theme }) => ({
  width: 100,
  height: 5,
  borderRadius: 5,
  backgroundColor: theme.palette.common.black,
  marginBottom: '20px',
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
  margin: '20px 0 25px',
  fontSize: '20px',
}));
