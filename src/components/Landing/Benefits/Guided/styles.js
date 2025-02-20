import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
  flex: 1,
  padding: 0,
  maxWidth: '420px',
  minWidth: '300px',

  [theme.breakpoints.up('md')]: {
    maxWidth: '780px',
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 'none',
  },
}));

export const ItemContainer = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  minHeight: '539px',
  width: '100%',
  borderRadius: '9px',
  overflow: 'hidden',
  display: 'flex',
  boxShadow: '0px 4px 40px 0px #0000001A',
  color: 'black',
}));

export const ImageContainer = styled('div')(({ theme }) => ({
  width: '33%',
  minHeight: '539px',
  maxWidth: 268,
  aspectRatio: 268 / 539,
  display: 'none',
  position: 'relative',

  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}));

export const ContentContainer = styled('div')(({ theme }) => ({
  padding: '28px',
  height: 'auto',

  [theme.breakpoints.up('md')]: {
    padding: '38px',
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontFamily: 'Degular',
  fontSize: '50px',
  fontWeight: '600',
  lineHeight: '68px',
  letterSpacing: '-0.5px',
  textAlign: 'left',
  color: theme.palette.landing.darkSlateGray,
  marginTop: '10px',

  [theme.breakpoints.up('md')]: {
    fontSize: '70px',
    marginTop: '30px',
  },
}));

export const Description = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: '15px',
  lineHeight: '25px',
  color: theme.palette.landing.steelBlue,
  marginTop: '20px',

  [theme.breakpoints.up('md')]: {
    fontSize: '20px',
    marginTop: '25px',
  },
}));

export const Items = styled('div')(({ theme }) => ({
  marginTop: '37px',
  display: 'flex',
  flexDirection: 'column',
  gap: '27px',
}));
