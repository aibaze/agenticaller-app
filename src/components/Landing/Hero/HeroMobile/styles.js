import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
  height: '75vh',
  maxWidth: '360px',
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',

  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

export const TextLine1 = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
  fontFamily: 'Degular',
  fontWeight: 500,
  textAlign: 'center',
  letterSpacing: '-2px',
  fontSize: '60px',
  lineHeight: '50px',
  marginTop: '20px',
}));

export const TextLine2 = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
  fontFamily: 'Degular',
  fontWeight: 500,
  textAlign: 'center',
  letterSpacing: '-2px',
  fontSize: '60px',
  lineHeight: '53px',
}));

export const Clients = styled(Typography)(({ theme }) => ({
  color: theme.palette.landing.forestGreen,
  textShadow: '-1px -1px 0 black,1px -1px 0 black,-1px 1px 0 black,1px 1px 0 black',
  fontWeight: 500,
  textDecoration: 'underline',
  textUnderlineOffset: 10,
  textDecorationThickness: '0.25rem',
  fontSize: '55px',
}));

export const CheckContainer = styled('div')(({ theme }) => ({
  transform: 'rotate(0deg)',
  width: '28.58px',
  height: '35px',
  position: 'absolute',
  marginTop: '-58px',
  marginLeft: '-45px',
  position: 'relative',
}));

export const ClientsLine = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  marginBottom: '40px',
}));

export const ButtonSection = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '15px',
  flexDirection: 'column',
  alignItems: 'center',
  zIndex: 50,
}));

export const WomanProgramming = styled('div')(({ theme }) => ({
  transform: 'rotate(0deg)',
  width: '214px',
  height: '193px',
  bottom: 0,
  position: 'absolute',
  marginBottom: '-40px',
  marginRight: '15px',
  right: 0,
}));
