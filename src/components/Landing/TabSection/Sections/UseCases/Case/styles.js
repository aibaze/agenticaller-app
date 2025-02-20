import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const Container = styled('div')(({ theme, idx }) => ({
  width: '100%',
  maxWidth: '380px',
  minHeight: 'inherit',
  boxShadow: '0px 4px 19px 0px #00000040',
  backgroundColor: idx % 2 ? theme.palette.landing.mintIce : theme.palette.landing.lavenderMist,
  border: `3px solid ${theme.palette.common.black}`,
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  alignItems: 'center',
  position: 'relative',
  justifyContent: 'start',
  padding: '18px',
  marginRight: '10px',

  [theme.breakpoints.up('md')]: {
    minHeight: '370px',
    width: '380px',
  },

  [theme.breakpoints.up('xl')]: {
    padding: '20px',
  },
}));

export const ImageContainer = styled('div')(({ theme }) => ({
  minWidth: '60px',
  height: '60px',
  position: 'relative',
  alignSelf: 'start',
}));

export const BlackLine = styled('div')(({ theme }) => ({
  borderTop: `3px solid ${theme.palette.common.black}`,
  width: '100%',
  left: 0,
  top: '68px',
  position: 'absolute',
}));

export const Title = styled(Typography)(({ theme }) => ({
  maxWidth: '1050px',
  fontWeight: 600,
  fontSize: '24px',
  lineHeight: '40px',
  marginBottom: '10px',

  [theme.breakpoints.up('xl')]: {
    fontSize: '30px',
  },
}));

export const Text = styled(Typography)(({ theme }) => ({
  maxWidth: '1050px',
  fontSize: '15px',
  lineHeight: '20px',
  marginBottom: '10px',

  [theme.breakpoints.up('md')]: {
    fontSize: '18px',
    lineHeight: '24px',
  },

  [theme.breakpoints.up('xl')]: {
    fontSize: '20px',
    lineHeight: '25px',
  },
}));

export const ButtonContainer = styled('div')(({ theme }) => ({
  marginTop: '45px',
  display: 'block',

  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));
