import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';

export const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '380px',
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

export const Text = styled(Typography)(({ theme }) => ({
  fontFamily: 'Degular',
  fontWeight: 600,
  fontSize: '18px',
  marginBottom: '16px',
  color: theme.palette.common.black,

  [theme.breakpoints.up('md')]: {
    fontSize: '27px',
  },
}));

export const CustomLink = styled(Link)(({ theme }) => ({
  color: theme.palette.landing.midnightBlue,
  fontSize: '15px',
  fontWeight: 600,

  [theme.breakpoints.up('md')]: {
    fontSize: '18px',
  },
}));
