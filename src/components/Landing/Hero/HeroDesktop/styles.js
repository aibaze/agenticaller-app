import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
  margin: '0 30px',
  display: 'none',

  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}));

export const TitleContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'end',
  textAlign: 'center',
}));

export const Title = styled(Typography)(({ theme }) => ({
  letterSpacing: '-2px',
  color: theme.palette.common.black,

  [theme.breakpoints.up('md')]: {
    letterSpacing: '-4px',
  },
}));

export const Title2 = styled(Typography)(({ theme }) => ({
  letterSpacing: '-2px',
  marginTop: '16px',
  textAlign: 'center',

  [theme.breakpoints.up('md')]: {
    letterSpacing: '-4px',
    marginTop: 0,
  },
}));

export const ImageContainer = styled('div')(({ theme }) => ({
  marginBottom: '8px',
  marginLeft: '-15px',
  width: 80.5,
  height: 108.5,
  display: 'none',
  position: 'relative',

  [theme.breakpoints.up('md')]: {
    display: 'block',
  },

  [theme.breakpoints.up('lg')]: {
    marginLeft: '-30px',
    width: 115,
    height: 155,
  },
}));

export const SecondRowText = styled('div')(({ theme }) => ({
  marginRight: 0,
  marginTop: '-24px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'end',

  [theme.breakpoints.up('md')]: {
    alignItems: 'center',
    marginRight: '48px',
  },
}));

export const BulbContainer = styled('div')(({ theme }) => ({
  width: 39.9,
  height: 49.7,
  display: 'none',
  position: 'relative',

  [theme.breakpoints.up('md')]: {
    display: 'block',
  },

  [theme.breakpoints.up('lg')]: {
    width: 57,
    height: 71,
  },
}));

export const WomanContainer = styled('div')(({ theme }) => ({
  width: 32,
  height: 37,
  marginLeft: '16px',
  display: 'none',
  position: 'relative',

  [theme.breakpoints.up('md')]: {
    display: 'block',
  },

  [theme.breakpoints.up('lg')]: {
    width: 46,
    height: 54,
  },
}));

export const Clients = styled(Typography)(({ theme }) => ({
  textShadow: '-1px -1px 0 black,1px -1px 0 black,-1px 1px 0 black,1px 1px 0 black',
  fontWeight: 500,
  textDecoration: 'underline',
  textUnderlineOffset: 10,
  textDecorationThickness: '0.25rem',
  marginLeft: '8px',
  letterSpacing: '0px',
  color: theme.palette.landing.forestGreen,

  [theme.breakpoints.up('md')]: {
    marginLeft: '16px',
    letterSpacing: '-4px',
  },
}));

export const ButtonSection = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '32px',
  marginTop: '32px',
}));

export const WomanProgrammingContainer = styled('div')(({ theme }) => ({
  width: 120,
  height: 110,
  display: 'none',
  marginRight: '-25px',
  position: 'relative',

  [theme.breakpoints.up('md')]: {
    display: 'block',
  },

  [theme.breakpoints.up('lg')]: {
    width: 180,
    height: 165,
  },
}));

export const ButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 20px',

  [theme.breakpoints.up('md')]: {
    gap: '32px',
  },
}));
