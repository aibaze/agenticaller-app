import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';

export const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '313px',
  boxShadow: 'none',
  color: theme.palette.common.black,
  margin: 0,
  padding: '15px 25px 15px',

  [theme.breakpoints.up('md')]: {
    maxWidth: '421px',
    boxShadow: '0px 4px 40px 0px #0000001A',
    padding: '27px 30px 32px',
  },

  [theme.breakpoints.up('lg')]: {
    padding: '41px 38px 49px',
  },
}));

export const FlexCenter = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
}));

export const ImageContainer = styled('div')(({ theme, width, height }) => ({
  width: '100%',
  maxWidth: width,
  aspectRatio: width / height,
  marginBottom: '16px',
  position: 'relative',

  [theme.breakpoints.up('md')]: {
    marginBottom: '50px',
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: '25px',
  fontWeight: 600,
  marginBottom: '17px',
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 400,
  marginBottom: '33px',
}));

export const CustomLink = styled(Link)(({ theme }) => ({
  color: theme.palette.landing.forestGreen,
  fontSize: '15px',
  fontWeight: 600,

  [theme.breakpoints.up('md')]: {
    fontSize: '18px',
  },
}));
