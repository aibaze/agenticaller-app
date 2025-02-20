import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
  position: 'relative',
}));

export const Headline = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  marginBottom: '14px',

  [theme.breakpoints.up('md')]: {
    marginBottom: '25px',
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontFamily: 'Degular',
  fontWeight: 600,
  fontSize: '50px',
  lineHeight: 1,
  marginBottom: '20px',

  [theme.breakpoints.up('md')]: {
    fontSize: '90px',
    marginBottom: '40px',
  },
}));

export const Description = styled(Typography)(({ theme }) => ({
  fontSize: '15px',
  maxWidth: '500px',

  [theme.breakpoints.up('md')]: {
    fontSize: '20px',
  },

  [theme.breakpoints.up('lg')]: {
    maxWidth: '630px',
  },
}));
