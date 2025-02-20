import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const Container = styled('div')(({ theme, backgroundColor }) => ({
  width: '100%',
  boxShadow: '0px 4px 19px 0px #00000040',
  backgroundColor: backgroundColor,
  padding: '25px 40px 48px 44px',
  border: `3px solid ${theme.palette.common.black}`,
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center',
  zIndex: 50,
  position: 'relative',
  justifyContent: 'space-around',

  [theme.breakpoints.up('md')]: {
    padding: '32px',
    gap: '30px',
  },

  [theme.breakpoints.up('lg')]: {
    flexDirection: 'row',
  },

  [theme.breakpoints.up('xl')]: {
    padding: '38px 94px 38px 69px',
    gap: '40px',
  },
}));

export const Text = styled(Typography)(({ theme, backgroundColor }) => ({
  fontSize: '20px',
  lineHeight: '25px',
  textAlign: 'left',
  maxWidth: '750px',

  [theme.breakpoints.up('md')]: {
    fontSize: '35px',
    lineHeight: '50px',
    textAlign: 'center',
  },
}));

export const OnMobile = styled('div')(({ theme }) => ({
  display: 'block',

  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));
