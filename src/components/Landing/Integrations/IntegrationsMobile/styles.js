import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';

export const Container = styled('div')(({ theme }) => ({
  width: '308px',
  margin: '0 auto',
  display: 'block',

  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

export const ImageContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '19px',
  marginBottom: '20px',
}));

export const Text = styled(Typography)(({ theme }) => ({
  fontFamily: 'Degular',
  fontWeight: 600,
  fontSize: '18px',
  marginBottom: '16px',
  color: theme.palette.common.black,
  maxWidth: '230px',
  padding: '10px',

  [theme.breakpoints.up('md')]: {
    fontSize: '27px',
  },
}));

export const CustomLink = styled(Link)(({ theme }) => ({
  color: theme.palette.landing.forestGreen,
  fontSize: '15px',
  fontWeight: 600,
  padding: '10px',

  [theme.breakpoints.up('md')]: {
    fontSize: '18px',
  },
}));
