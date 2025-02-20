import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '320px',
  padding: '30px',
}));

export const TextContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column-reverse',
  alignItems: 'center',
  marginBottom: 0,

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    marginBottom: '30px',
  },
}));

export const Text = styled(Typography)(({ theme }) => ({
  fontSize: '50px',
  fontFamily: 'Degular',
  color: theme.palette.common.black,
  textAlign: 'center',
  fontWeight: 600,
  maxWidth: '1370px',
  lineHeight: 1,
  position: 'relative',

  [theme.breakpoints.up('md')]: {
    fontSize: '52px',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '55px',
  },
  [theme.breakpoints.up('xl')]: {
    fontSize: '60px',
  },
}));

export const ImageTopContainer = styled('div')(({ theme }) => ({
  width: '55px',
  aspectRatio: 1 / 1,
  position: 'relative',
}));

export const ImageBottomContainer = styled('div')(({ theme }) => ({
  width: '176px',
  aspectRatio: 176 / 196,
  position: 'relative',
}));
