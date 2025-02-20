import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
  maxWidth: '500px',

  [theme.breakpoints.up('lg')]: {
    maxWidth: 'none',
  },
}));

export const FlexBox = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '22px',
}));

export const ImageContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '80px',
  height: '80px',
  marginBottom: '55px',
  minWidth: '80px',

  [theme.breakpoints.up('md')]: {
    width: '80px',
    height: '80px',
    marginBottom: '20px',
  },

  [theme.breakpoints.up('lg')]: {
    width: '100px',
    height: '100px',
    marginBottom: '35px',
  },
}));

export const TitleDesktop = styled(Typography)(({ theme }) => ({
  display: 'none',
  fontSize: '24px',
  fontWeight: 600,
  marginBottom: '20px',

  [theme.breakpoints.up('md')]: {
    fontSize: '26px',
  },

  [theme.breakpoints.up('lg')]: {
    display: 'block',
    fontSize: '28px',
  },
}));

export const TitleMobile = styled(Typography)(({ theme }) => ({
  display: 'block',
  fontSize: '30px',
  lineHeight: '48px',
  fontWeight: 600,
  marginBottom: '40px',
  marginRight: '10px',

  [theme.breakpoints.up('sm')]: {
    marginRight: '40px',
  },

  [theme.breakpoints.up('md')]: {
    fontSize: '30px',
  },

  [theme.breakpoints.up('lg')]: {
    display: 'none',
    fontSize: '35px',
  },
}));

export const Text = styled(Typography)(({ theme }) => ({
  fontSize: '15px',
  lineHeight: '25px',
  marginBottom: '15px',

  [theme.breakpoints.up('md')]: {
    fontSize: '18px',
    lineHeight: '35px',
    marginBottom: '15px',
  },

  [theme.breakpoints.up('xl')]: {
    fontSize: '20px',
    lineHeight: '38px',
  },
}));

export const SpanText = styled('span')(({ theme }) => ({
  fontSize: '17px',
  lineHeight: '25px',
  fontWeight: 600,

  [theme.breakpoints.up('md')]: {
    lineHeight: '35px',
    fontSize: '20px',
  },

  [theme.breakpoints.up('xl')]: {
    fontSize: '22px',
    lineHeight: '38px',
  },
}));
