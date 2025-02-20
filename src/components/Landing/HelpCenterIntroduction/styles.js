import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { navHeight } from '../NavHeader/NavHeader';

export const Container = styled('div')(({ theme }) => ({
  margin: '20px 30px 35px 30px',

  [theme.breakpoints.up('md')]: {
    margin: '10px 115px',
  },
}));

export const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: `calc(100% - ${navHeight.mobile}px)`,
  marginBottom: '25px',

  [theme.breakpoints.up('md')]: {
    Height: `calc(100% - ${navHeight.desktop}px)`,
  },
}));

export const ImageContainer = styled('div')(({ theme }) => ({
  aspectRatio: 306 / 278,
  width: '183px',
  position: 'relative',

  [theme.breakpoints.up('md')]: {
    width: '220px',
  },
}));

export const Text = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
  fontFamily: 'Degular',
  fontSize: '23px',
  maxWidth: '768px',
  marginBottom: '25px',
  textAlign: 'center',

  [theme.breakpoints.up('md')]: {
    fontSize: '28px',
    marginBottom: '50px',
  },
}));
