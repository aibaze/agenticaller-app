import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const Desktop = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}));

export const Footer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'start',
  padding: '25px 35px',
  justifyContent: 'space-between',

  [theme.breakpoints.up('lg')]: {
    padding: '40px 100px',
  },
}));

export const Column1 = styled('div')(({ theme }) => ({
  zIndex: 2,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginRight: '25px',
}));

export const LogoContainer = styled('div')(({ theme }) => ({
  width: '191px',
  maxWidth: '191px',
  aspectRatio: 191 / 41,
  marginBottom: '16px',
  position: 'relative',

  [theme.breakpoints.up('md')]: {
    marginBottom: '50px',
  },
}));

export const ImageContainer = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '272px',
  aspectRatio: 272 / 272,
  marginBottom: '16px',
  position: 'relative',

  [theme.breakpoints.up('md')]: {
    marginBottom: '50px',
  },
}));

export const Column2 = styled('div')(({ theme }) => ({
  zIndex: 2,
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
  margin: '0 25px',
  maxWidth: '600px',
}));

export const ListLinks = styled('div')(({ theme }) => ({
  color: theme.palette.common.black,
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
}));

export const ListTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
}));

export const ListLink = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
  '&:hover': { textDecoration: 'underline' },
}));

export const Column3 = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'end',
  height: '360px',
  zIndex: 2,
}));
