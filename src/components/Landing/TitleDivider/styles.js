import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginBottom: '50px',
  padding: '0 25px',
}));

export const ImageContainer = styled('div')(({ theme, width, height }) => ({
  width: width * 0.5,
  aspectRatio: width / height,
  transform: 'rotate(0deg)',
  marginBottom: '16px',
  position: 'relative',

  [theme.breakpoints.up('md')]: {
    width: width * 0.66,
  },

  [theme.breakpoints.up('lg')]: {
    width: width,
  },
}));

export const Label = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '14px',
  color: theme.palette.landing.forestGreen,
  marginBottom: '10px',

  [theme.breakpoints.up('md')]: {
    marginBottom: '20px',
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontFamily: 'Degular',
  fontWeight: 600,
  fontSize: '40px',
  lineHeight: '50px',
  color: theme.palette.common.black,
  maxWidth: '90%',
  marginBottom: '18px',
  textAlign: 'center',

  [theme.breakpoints.up('sm')]: {
    maxWidth: '70%',
  },

  [theme.breakpoints.up('md')]: {
    fontSize: '60px',
    lineHeight: '65px',
    maxWidth: '900px',
    marginBottom: '37px',
  },

  [theme.breakpoints.up('lg')]: {
    fontSize: '70px',
    lineHeight: '80px',
  },
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: '18px',
  color: theme.palette.landing.slateGray,
  textAlign: 'center',
}));
